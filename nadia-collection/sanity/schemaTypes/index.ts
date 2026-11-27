import type { SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { ventureType } from "./venture";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  ventureType,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
