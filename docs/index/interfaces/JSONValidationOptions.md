[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / JSONValidationOptions

# Interface: JSONValidationOptions

Defined in: [src/features/validation.ts:51](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/validation.ts#L51)

## Properties

### formatError?

> `optional` **formatError?**: (`error`) => `string` \| `undefined`

Defined in: [src/features/validation.ts:56](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/validation.ts#L56)

Customize the message of a validation error. Return `undefined` to use the default message.

#### Parameters

##### error

`JsonError`

#### Returns

`string` \| `undefined`

---

### jsonParser?

> `optional` **jsonParser?**: [`DocumentParser`](../type-aliases/DocumentParser.md)

Defined in: [src/features/validation.ts:57](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/validation.ts#L57)

---

### mode?

> `optional` **mode?**: `JSONMode`

Defined in: [src/features/validation.ts:52](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/validation.ts#L52)
