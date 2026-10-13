import { type EditorState, StateEffect, StateField } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import type { JSONSchema7 } from "json-schema";
import { compileSchema, type SchemaNode } from "json-schema-library";
const schemaEffect = StateEffect.define<JSONSchema7 | undefined>();

export const schemaStateField = StateField.define<JSONSchema7 | void>({
  create() {},
  update(schema, tr) {
    for (const e of tr.effects) {
      if (e.is(schemaEffect)) {
        return e.value;
      }
    }

    return schema;
  },
});

export const updateSchema = (view: EditorView, schema?: JSONSchema7) => {
  view.dispatch({
    effects: schemaEffect.of(schema),
  });
};

export const getJSONSchema = (state: EditorState) => {
  return state.field(schemaStateField);
};

export const stateExtensions = (schema?: JSONSchema7) => [
  schemaStateField.init(() => schema),
];

const compiledSchemas = new WeakMap<object, SchemaNode>();

/**
 * Compile a JSON schema with json-schema-library, caching the result per schema object.
 * Compilation walks the whole schema, so it is only done once for every (potentially huge)
 * schema instance instead of on every validation, hover or completion request.
 *
 * The draft is selected from the schema's `$schema`; schemas without one are treated
 * as draft-2020-12, json-schema-library's default.
 * @group Utilities
 */
export const compileSchemaCached = (schema: JSONSchema7): SchemaNode => {
  let node = compiledSchemas.get(schema);
  if (!node) {
    node = compileSchema(schema);
    compiledSchemas.set(schema, node);
  }
  return node;
};

/**
 * Returns the compiled json-schema-library node for the schema in the editor state, if any
 * @group Utilities
 */
export const getCompiledSchema = (
  state: EditorState,
): SchemaNode | undefined => {
  const schema = getJSONSchema(state);
  return schema ? compileSchemaCached(schema) : undefined;
};
