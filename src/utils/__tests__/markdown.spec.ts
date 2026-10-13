import { describe, it, expect } from "vitest";
import { renderMarkdown, preloadMarkdownHighlighter } from "../markdown";

describe("renderMarkdown", () => {
  it("renders inline markdown", () => {
    expect(renderMarkdown("some `code` here")).toBe(
      "some <code>code</code> here",
    );
  });

  it("renders block markdown", () => {
    expect(renderMarkdown("# title\n\ntext", false)).toContain(
      "<h1>title</h1>",
    );
  });

  it("highlights fenced code blocks once the highlighter has loaded", async () => {
    const block = '```json\n{ "a": 1 }\n```';
    // the first render kicks off the lazy load
    renderMarkdown(block, false);
    await preloadMarkdownHighlighter();
    const html = renderMarkdown(block, false);
    expect(html).toContain('class="shiki');
    expect(html).toContain("<span");
  });

  it("falls back to plain text for unknown languages", async () => {
    await preloadMarkdownHighlighter();
    const html = renderMarkdown("```brainfuck\n+++\n```", false);
    expect(html).toContain("<pre");
    expect(html).toContain("+++");
  });
});
