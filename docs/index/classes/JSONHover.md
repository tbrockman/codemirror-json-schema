[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / JSONHover

# Class: JSONHover

Defined in: [src/features/hover.ts:81](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L81)

## Constructors

### Constructor

> **new JSONHover**(`opts?`): `JSONHover`

Defined in: [src/features/hover.ts:84](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L84)

#### Parameters

##### opts?

[`HoverOptions`](../type-aliases/HoverOptions.md)

#### Returns

`JSONHover`

## Methods

### doHover()

> **doHover**(`view`, `pos`, `side`): `Promise`\<`Tooltip` \| `null`\>

Defined in: [src/features/hover.ts:203](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L203)

#### Parameters

##### view

`EditorView`

##### pos

`number`

##### side

`Side`

#### Returns

`Promise`\<`Tooltip` \| `null`\>

---

### getDataForCursor()

> **getDataForCursor**(`view`, `pos`, `side`): [`CursorData`](../type-aliases/CursorData.md) \| `null`

Defined in: [src/features/hover.ts:91](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L91)

#### Parameters

##### view

`EditorView`

##### pos

`number`

##### side

`Side`

#### Returns

[`CursorData`](../type-aliases/CursorData.md) \| `null`

---

### getHoverTexts()

> **getHoverTexts**(`data`, `root`): `HoverTexts`

Defined in: [src/features/hover.ts:158](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/hover.ts#L158)

#### Parameters

##### data

[`FoundCursorData`](../type-aliases/FoundCursorData.md)

##### root

`SchemaNode`

#### Returns

`HoverTexts`
