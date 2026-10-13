// json5
export { json5SchemaLinter } from "./validation";
export { json5SchemaHover } from "./hover";
export { json5Completion } from "./completion";

/**
 * @group Bundled Codemirror Extensions
 */
export { json5Schema } from "./bundled";

export * from "../parsers/json5-parser";

// make the json5 parser the default for `mode: "json5"` once this entry point is imported
import { registerParser } from "../parsers";
import { parseJSON5DocumentState } from "../parsers/json5-parser";
import { MODES } from "../constants";
registerParser(MODES.JSON5, parseJSON5DocumentState);
