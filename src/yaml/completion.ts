import { CompletionContext } from "@codemirror/autocomplete";
import { MODES } from "../constants";
import { JSONCompletion, JSONCompletionOptions } from "../features/completion";
import { parseYAMLDocumentState } from "../parsers/yaml-parser";

/**
 * provides a JSON schema enabled autocomplete extension for codemirror and yaml
 * @group Codemirror Extensions
 */
export function yamlCompletion(opts: Omit<JSONCompletionOptions, "mode"> = {}) {
  const completion = new JSONCompletion({
    jsonParser: parseYAMLDocumentState,
    ...opts,
    mode: MODES.YAML,
  });
  return function jsonDoCompletion(ctx: CompletionContext) {
    return completion.doComplete(ctx);
  };
}
