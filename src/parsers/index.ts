import { JSONMode, JSONPointersMap } from "../types";
import { MODES } from "../constants";
import { EditorState } from "@codemirror/state";
import { parseJSONDocumentState } from "./json-parser";

export type DocumentParser = (state: EditorState) => {
  data: unknown;
  pointers: JSONPointersMap;
};

// The json5 and yaml parsers are registered by their entry points
// (`codemirror-json-schema/json5` and `codemirror-json-schema/yaml`) rather than imported
// here, so that bundles only using the json mode don't pay for `yaml`, `json5` and
// `codemirror-json5`.
const parsers: Partial<Record<JSONMode, DocumentParser>> = {
  [MODES.JSON]: parseJSONDocumentState,
};

const entryPoints: Record<JSONMode, string> = {
  [MODES.JSON]: "codemirror-json-schema",
  [MODES.JSON5]: "codemirror-json-schema/json5",
  [MODES.YAML]: "codemirror-json-schema/yaml",
};

/**
 * Register the default document parser for a mode
 * @group Utilities
 */
export const registerParser = (mode: JSONMode, parser: DocumentParser) => {
  parsers[mode] = parser;
};

export const getDefaultParser = (mode: JSONMode): DocumentParser => {
  const parser = parsers[mode];
  if (!parser) {
    throw new Error(
      `No document parser is registered for the "${mode}" mode. ` +
        `Import from "${entryPoints[mode]}" or pass a \`jsonParser\` option.`,
    );
  }
  return parser;
};
