---
"codemirror-json-schema": minor
---

Sync with upstream 0.8.1 and modernise the fork:

- json-schema-library 11: full draft-04 … 2020-12 support (`$defs`, `prefixItems`, `dependentRequired`, `unevaluatedProperties`, formats), draft selected by `$schema`
- pointers for array items and the document root; vscode-style error ranges for required / additional / pattern property errors
- `deprecated` properties reported as warnings and marked in completion and hover; `markdownDescription`, `enumDescriptions` and `markdownEnumDescriptions` supported; `formatError` option now works
- completion only appends a value when the property has none and adds a `,` separator when another property follows
- yaml / json5 parsers no longer bundled into the main entry; shiki highlighting is lazy-loaded and no longer needs WASM; `preloadMarkdownHighlighter()` export
- toolchain: pnpm 10, TypeScript 6, vitest 5, vite 8, shiki 4, markdown-it 15; CommonJS build is loadable in node again
