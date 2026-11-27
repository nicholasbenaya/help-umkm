import type { StructureResolver } from "sanity/structure";

export const SITE_SETTINGS_DOCUMENT_ID = "siteSettings";
export const SINGLETON_TYPES = new Set<string>(["siteSettings"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nadia Collection CMS")
    .items([
      S.listItem()
        .title("Site Settings")
        .id(SITE_SETTINGS_DOCUMENT_ID)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_DOCUMENT_ID)
            .title("Site Settings"),
        ),
      S.divider(),
      S.listItem()
        .title("Ventures")
        .schemaType("venture")
        .child(
          S.documentTypeList("venture")
            .title("Ventures")
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "name", direction: "asc" },
            ]),
        ),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return id !== "siteSettings" && id !== "venture";
      }),
    ]);
