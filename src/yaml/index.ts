// yaml
export { yamlSchemaLinter } from "./validation";
export { yamlSchemaHover } from "./hover";
export { yamlCompletion } from "./completion";

/**
 * @group Bundled Codemirror Extensions
 */
export { yamlSchema } from "./bundled";

export * from "../parsers/yaml-parser";

// make the yaml parser the default for `mode: "yaml"` once this entry point is imported
import { registerParser } from "../parsers";
import { parseYAMLDocumentState } from "../parsers/yaml-parser";
import { MODES } from "../constants";
registerParser(MODES.YAML, parseYAMLDocumentState);
