[**codemirror-json-schema**](../../README.md)

---

[codemirror-json-schema](../../README.md) / [index](../README.md) / compileSchemaCached

# Function: compileSchemaCached()

> **compileSchemaCached**(`schema`): `SchemaNode`

Defined in: [src/features/state.ts:45](https://github.com/tbrockman/codemirror-json-schema/blob/d3bb5a447f92c7283d8fc3935c4a356fe7033547/src/features/state.ts#L45)

Compile a JSON schema with json-schema-library, caching the result per schema object.
Compilation walks the whole schema, so it is only done once for every (potentially huge)
schema instance instead of on every validation, hover or completion request.

The draft is selected from the schema's `$schema`; schemas without one are treated
as draft-2020-12, json-schema-library's default.

## Parameters

### schema

`JSONSchema7`

## Returns

`SchemaNode`
