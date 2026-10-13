import type { JSONSchema7 } from "json-schema";

/**
 * Non-standard but widely used (vscode) annotation keywords, plus `deprecated` from draft 2019-09
 */
export type JSONSchemaAnnotations = {
  markdownDescription?: string;
  enumDescriptions?: string[];
  markdownEnumDescriptions?: string[];
  deprecationMessage?: string;
  deprecated?: boolean;
};

export type AnnotatedJSONSchema = JSONSchema7 & JSONSchemaAnnotations;

/**
 * The (markdown) description of a schema, preferring vscode's `markdownDescription`
 */
export const getSchemaDescription = (schema: AnnotatedJSONSchema): string => {
  return schema.markdownDescription ?? schema.description ?? "";
};

/**
 * The description of the enum value at `index`, preferring vscode's
 * `markdownEnumDescriptions` / `enumDescriptions` over the schema description
 */
export const getEnumValueDescription = (
  schema: AnnotatedJSONSchema,
  index: number,
): string => {
  return (
    schema.markdownEnumDescriptions?.[index] ??
    schema.enumDescriptions?.[index] ??
    getSchemaDescription(schema)
  );
};

export const isDeprecated = (schema: AnnotatedJSONSchema): boolean => {
  return schema.deprecated === true;
};
