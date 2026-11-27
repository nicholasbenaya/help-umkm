import { defineArrayMember, defineField, defineType } from "sanity";

export const ventureType = defineType({
  name: "venture",
  title: "Venture",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Venture Name",
      type: "string",
      description: "Nama lini usaha (contoh: Afisa Bouquet, Nadia Artistry).",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Identifier URL/anchor, klik Generate dari nama usaha.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Urutan tampilan di website (1, 2, 3, ...).",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description:
        "Matikan toggle ini jika ingin menyembunyikan lini usaha sementara tanpa menghapus data.",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Venture Logo",
      type: "image",
      description:
        "Opsional. Upload logo khusus lini usaha ini untuk menggantikan placeholder default.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Label kategori singkat (contoh: Florist & Custom Bouquet).",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Ringkasan 1 sampai 2 kalimat untuk tampilan Hub.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      rows: 5,
      description: "Cerita atau penjelasan lebih lengkap untuk halaman showcase.",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
      description:
        "Opsional. Contoh: Samarinda, Kalimantan Timur. Kosongkan jika area layanan belum ditentukan.",
    }),
    defineField({
      name: "whatsappNumberOverride",
      title: "WhatsApp Number Override",
      type: "string",
      description:
        "Opsional. Hanya diisi jika usaha ini memakai nomor admin berbeda dari default Site Settings (angka saja, misalnya 6282154309113).",
      validation: (rule) =>
        rule
          .regex(/^\d{8,15}$/, {
            name: "digits-only phone number",
          })
          .error("Gunakan angka saja dengan kode negara, misalnya 6282154309113."),
    }),
    defineField({
      name: "whatsappMessageTemplate",
      title: "WhatsApp Message Template",
      type: "string",
      description:
        "Pesan otomatis saat pengunjung menekan tombol WhatsApp pada lini usaha ini.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "Service Highlights",
      type: "array",
      description:
        "Opsional. Daftar layanan utama, jenis produk, atau kisaran harga mulai.",
      of: [
        defineArrayMember({
          type: "object",
          name: "ventureHighlight",
          title: "Highlight",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "priceHint",
              title: "Price Hint",
              type: "string",
              description: "Opsional (contoh: Mulai Rp 75.000).",
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Catatan singkat tambahan.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "priceHint",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Showcase Gallery",
      type: "array",
      description: "Foto karya pilihan yang akan tampil pada galeri lightbox.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryItem",
          title: "Gallery Item",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternative Text",
                  type: "string",
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "tag",
              title: "Tag",
              type: "string",
              description: "Opsional (contoh: Buket Wisuda, Makeup Lamaran).",
            }),
          ],
          preview: {
            select: {
              title: "caption",
              subtitle: "tag",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Foto Showcase",
                subtitle,
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "externalActionLabel",
      title: "External Action Label",
      type: "string",
      description:
        "Opsional. Label tombol tautan eksternal di masa depan (disembunyikan jika URL kosong).",
    }),
    defineField({
      name: "externalActionUrl",
      title: "External Action URL",
      type: "url",
      description:
        "Opsional. Tautan ke tool eksternal di masa depan. Disembunyikan jika kosong.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "coverImage",
      isActive: "isActive",
      order: "order",
    },
    prepare({ title, subtitle, media, isActive, order }) {
      const statusLabel = isActive === false ? "Hidden" : "Active";
      return {
        title: `${order ? `${order}. ` : ""}${title || "Untitled Venture"}`,
        subtitle: `${subtitle || ""} (${statusLabel})`.trim(),
        media,
      };
    },
  },
});
