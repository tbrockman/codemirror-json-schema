[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / preloadMarkdownHighlighter

# Function: preloadMarkdownHighlighter()

> **preloadMarkdownHighlighter**(): `Promise`\<`void`\>

Defined in: [src/utils/markdown.ts:73](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/utils/markdown.ts#L73)

Starts loading the syntax highlighter used for fenced code blocks in markdown
descriptions. Calling this is optional: the highlighter is loaded automatically
the first time a code block is rendered, but preloading avoids an unhighlighted
first render.

## Returns

`Promise`\<`void`\>
