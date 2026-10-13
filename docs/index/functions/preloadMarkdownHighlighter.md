[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / preloadMarkdownHighlighter

# Function: preloadMarkdownHighlighter()

> **preloadMarkdownHighlighter**(): `Promise`\<`void`\>

Defined in: [src/utils/markdown.ts:72](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/utils/markdown.ts#L72)

Starts loading the syntax highlighter used for fenced code blocks in markdown
descriptions. Calling this is optional: the highlighter is loaded automatically
the first time a code block is rendered, but preloading avoids an unhighlighted
first render.

## Returns

`Promise`\<`void`\>
