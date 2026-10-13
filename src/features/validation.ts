import type { EditorView, ViewUpdate } from "@codemirror/view";
import { type Diagnostic } from "@codemirror/lint";
import { type JsonError, type SchemaNode } from "json-schema-library";

import { getCompiledSchema, schemaStateField } from "./state";
import { joinWithOr } from "../utils/formatting";
import { JSONMode, JSONPointerData, RequiredPick } from "../types";
import { el } from "../utils/dom";
import { renderMarkdown } from "../utils/markdown";
import { MODES } from "../constants";
import { debug } from "../utils/debug";
import { DocumentParser, getDefaultParser } from "../parsers";

// return an object path that matches with the json-source-map pointer
const getErrorPath = (error: JsonError): string => {
  const rawPointer = error?.data?.pointer;
  // strip the leading # from the json-schema-library pointer
  const pointer =
    typeof rawPointer === "string" && rawPointer !== "#"
      ? rawPointer.replace(/^#/, "")
      : "";

  // these errors are reported at the parent object, with the offending key in the error data,
  // so extend the pointer to be able to highlight the key itself
  if (
    ["invalid-property-name-error", "forbidden-property-error"].includes(
      error.code as string,
    ) &&
    error?.data?.property
  ) {
    return `${pointer}/${error.data.property}`;
  }
  if (error.code === "pattern-properties-error" && error?.data?.key) {
    return `${pointer}/${error.data.key}`;
  }
  if (pointer) {
    return pointer;
  }
  // return plain data.property if present
  if (error?.data?.property) {
    return `/${error.data.property}`;
  }
  // else, return the empty pointer to represent the whole document
  return "";
};

export interface JSONValidationOptions {
  mode?: JSONMode;
  formatError?: (error: JsonError) => string;
  jsonParser?: DocumentParser;
}

type JSONValidationSettings = RequiredPick<JSONValidationOptions, "jsonParser">;

export const handleRefresh = (vu: ViewUpdate) => {
  return (
    vu.startState.field(schemaStateField) !== vu.state.field(schemaStateField)
  );
};

/**
 * Helper for simpler class instantiaton
 * @group Codemirror Extensions
 */
export function jsonSchemaLinter(options?: JSONValidationOptions) {
  const validation = new JSONValidation(options);
  return (view: EditorView) => {
    return validation.doValidation(view);
  };
}

// all the error types that apply to a specific key rather than its value
const positionalErrors = [
  "no-additional-properties-error",
  "unevaluated-property-error",
  "required-property-error",
  "invalid-property-name-error",
  "forbidden-property-error",
  "undefined-value-error",
  "pattern-properties-error",
];

export class JSONValidation {
  private schema: SchemaNode | null = null;

  private mode: JSONMode = MODES.JSON;
  private parser: DocumentParser;
  public constructor(private options?: JSONValidationOptions) {
    this.mode = this.options?.mode ?? MODES.JSON;
    this.parser = this.options?.jsonParser ?? getDefaultParser(this.mode);
  }
  private get schemaTitle() {
    return this.schema?.schema?.title ?? "json-schema";
  }

  // rewrite the error message to be more human readable
  private rewriteError = (error: JsonError): string => {
    const errorData = error?.data;
    const errors = errorData?.errors as JsonError[];
    if (error.code === "one-of-error" && errors?.length) {
      return `Expected one of ${joinWithOr(
        errors,
        (data) => data.data.expected,
      )}`;
    }
    if (
      error.code === "no-additional-properties-error" ||
      error.code === "unevaluated-property-error"
    ) {
      // these errors point at the offending property itself, so name its parent instead
      const pointer: string =
        typeof errorData?.pointer === "string" ? errorData.pointer : "";
      const segments = pointer.replace(/^#\/?/, "").split("/").filter(Boolean);
      const last = segments.pop();
      const property = errorData?.property ?? errorData?.key ?? last;
      const parent = segments.join(".");
      return parent
        ? `Additional property \`${property}\` in \`${parent}\` is not allowed`
        : `Additional property \`${property}\` is not allowed`;
    }
    if (
      error.code === "missing-dependency-error" &&
      errorData?.missingProperty
    ) {
      return `The required property \`${errorData.missingProperty}\` is missing`;
    }
    if (error.code === "type-error") {
      return `Expected \`${
        error?.data?.expected && Array.isArray(error?.data?.expected)
          ? joinWithOr(error?.data?.expected)
          : error?.data?.expected
      }\` but received \`${error?.data?.received}\``;
    }
    const message = error.message
      // don't mention root object
      .replaceAll("in `#` ", "")
      .replaceAll("at `#`", "")
      .replaceAll("/", ".")
      .replaceAll("#.", "");
    return message;
  };

  // validate using view as the linter extension signature requires
  public doValidation(view: EditorView) {
    const schema = getCompiledSchema(view.state);
    if (!schema) {
      return [];
    }
    this.schema = schema;

    const text = view.state.doc.toString();

    // ignore blank json strings
    if (!text?.length) return [];

    const json = this.parser(view.state);
    // skip validation if parsing fails
    if (json.data == null) return [];

    let errors: JsonError[] = [];
    try {
      errors = this.schema.validate(json.data).errors;
    } catch (err) {
      debug.log("xxx", "validation threw", err);
    }
    debug.log("xxx", "validation errors", errors, json.data);
    if (!errors.length) return [];
    // reduce() because we want to filter out errors that don't have a pointer
    return errors.reduce<Diagnostic[]>((acc, error) => {
      const pushRoot = () => {
        const errorString = this.rewriteError(error);
        acc.push({
          from: 0,
          to: 0,
          message: errorString,
          severity: "error",
          source: this.schemaTitle,
          renderMessage: () => {
            const dom = el("div", {});
            dom.innerHTML = renderMarkdown(errorString);
            return dom;
          },
        });
      };
      const errorPath = getErrorPath(error);
      const pointer = json.pointers.get(errorPath) as JSONPointerData;

      if (
        error.code === "max-properties-error" ||
        error.code === "min-properties-error" ||
        errorPath === "" // root level type errors
      ) {
        pushRoot();
      } else if (pointer) {
        // if the error is a property error, use the key position
        const isKeyError = positionalErrors.includes(error.code as string);
        const errorString = this.rewriteError(error);
        const from =
          isKeyError && pointer.keyFrom ? pointer.keyFrom : pointer.valueFrom;
        const to =
          isKeyError && pointer.keyTo ? pointer.keyTo : pointer.valueTo;
        // skip error if no from/to value is found
        if (to !== undefined && from !== undefined) {
          acc.push({
            from,
            to,
            message: errorString,
            renderMessage: () => {
              const dom = el("div", {});
              dom.innerHTML = renderMarkdown(errorString);
              return dom;
            },
            severity: "error",
            source: this.schemaTitle,
          });
        }
      } else {
        pushRoot();
      }
      return acc;
    }, []);
  }
}
