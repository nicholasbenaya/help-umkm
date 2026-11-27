import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { SINGLETON_TYPES, structure } from "./sanity/structure";

const SINGLETON_ALLOWED_ACTIONS = new Set([
  "publish",
  "discardChanges",
  "restore",
]);

export default defineConfig({
  name: "nadia-collection-studio",
  title: "Nadia Collection Studio",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) => action && SINGLETON_ALLOWED_ACTIONS.has(action),
          )
        : input,
  },
  plugins: [structureTool({ structure })],
});
