import md from "markdown-it";
import { debug } from "./debug";

const renderer = md({
  linkify: true,
  typographer: true,
});

let highlighterSetup: Promise<void> | undefined;

/**
 * Wires shiki into the markdown renderer.
 *
 * This is only done the first time a fenced code block is rendered, and everything
 * is loaded through dynamic imports so that bundlers can split the highlighter,
 * its grammars and themes into a separate chunk that is never fetched for schemas
 * without code blocks in their descriptions. If loading fails (e.g. in a CommonJS
 * environment that cannot load ESM-only shiki), markdown still renders, just
 * without syntax highlighting.
 */
function setupHighlighter() {
  if (!highlighterSetup) {
    highlighterSetup = (async () => {
      try {
        const [
          { fromHighlighter },
          { createHighlighterCore },
          { createJavaScriptRegexEngine },
        ] = await Promise.all([
          import("@shikijs/markdown-it/core"),
          import("shiki/core"),
          import("shiki/engine/javascript"),
        ]);
        const highlighter = await createHighlighterCore({
          themes: [
            import("shiki/themes/vitesse-light.mjs"),
            import("shiki/themes/vitesse-dark.mjs"),
          ],
          langs: [
            import("shiki/langs/json.mjs"),
            import("shiki/langs/yaml.mjs"),
            import("shiki/langs/javascript.mjs"),
            import("shiki/langs/typescript.mjs"),
            import("shiki/langs/shellscript.mjs"),
          ],
          engine: createJavaScriptRegexEngine({ forgiving: true }),
        });
        renderer.use(
          fromHighlighter(highlighter, {
            themes: {
              light: "vitesse-light",
              dark: "vitesse-dark",
            },
            // "text" is a built-in plain language in shiki, but it is missing from the type
            fallbackLanguage: "text" as any,
          }),
        );
      } catch (err) {
        debug.log("failed to load syntax highlighting for code blocks", err);
      }
    })();
  }
  return highlighterSetup;
}

/**
 * Starts loading the syntax highlighter used for fenced code blocks in markdown
 * descriptions. Calling this is optional: the highlighter is loaded automatically
 * the first time a code block is rendered, but preloading avoids an unhighlighted
 * first render.
 * @group Utilities
 */
export function preloadMarkdownHighlighter() {
  return setupHighlighter();
}

export function renderMarkdown(markdown: string, inline: boolean = true) {
  if (inline) return renderer.renderInline(markdown);
  if (markdown.includes("```")) {
    // the first render of a code block may be unhighlighted while shiki loads
    void setupHighlighter();
  }
  return renderer.render(markdown);
}
