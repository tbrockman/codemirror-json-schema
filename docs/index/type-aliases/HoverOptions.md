[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / HoverOptions

# Type Alias: HoverOptions

> **HoverOptions** = `object`

Defined in: [src/features/hover.ts:21](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L21)

## Properties

### formatHover?

> `optional` **formatHover?**: (`data`) => `HTMLElement`

Defined in: [src/features/hover.ts:30](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L30)

Generate the hover tooltip HTML

#### Parameters

##### data

`HoverTexts`

#### Returns

`HTMLElement`

---

### getHoverTexts?

> `optional` **getHoverTexts?**: (`data`) => `HoverTexts`

Defined in: [src/features/hover.ts:26](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L26)

Generate the text to display in the hover tooltip

#### Parameters

##### data

[`FoundCursorData`](FoundCursorData.md)

#### Returns

`HoverTexts`

---

### mode?

> `optional` **mode?**: `JSONMode`

Defined in: [src/features/hover.ts:22](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L22)

---

### parser?

> `optional` **parser?**: (`text`) => `any`

Defined in: [src/features/hover.ts:35](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L35)

Provide a custom parser for the document

#### Parameters

##### text

`string`

#### Returns

`any`

#### Default

```ts
JSON.parse;
```
