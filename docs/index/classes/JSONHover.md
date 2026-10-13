[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / JSONHover

# Class: JSONHover

Defined in: [src/features/hover.ts:85](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/features/hover.ts#L85)

## Constructors

### Constructor

> **new JSONHover**(`opts?`): `JSONHover`

Defined in: [src/features/hover.ts:88](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/features/hover.ts#L88)

#### Parameters

##### opts?

[`HoverOptions`](../type-aliases/HoverOptions.md)

#### Returns

`JSONHover`

## Methods

### doHover()

> **doHover**(`view`, `pos`, `side`): `Promise`\<`Tooltip` \| `null`\>

Defined in: [src/features/hover.ts:203](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/features/hover.ts#L203)

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

Defined in: [src/features/hover.ts:95](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/features/hover.ts#L95)

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

> **getHoverTexts**(`data`, `draft`): `HoverTexts`

Defined in: [src/features/hover.ts:162](https://github.com/tbrockman/codemirror-json-schema/blob/64d4e382f9142306cacceb1459bc9b63a127521b/src/features/hover.ts#L162)

#### Parameters

##### data

[`FoundCursorData`](../type-aliases/FoundCursorData.md)

##### draft

`Draft`

#### Returns

`HoverTexts`
