import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      description:
        "Nama utama personal brand yang tampil di header, footer, dan metadata.",
      initialValue: "Nadia Collection",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "brandLogo",
      title: "Brand Logo",
      type: "image",
      description:
        "Upload logo (SVG/PNG/WebP). Jika kosong, website menggunakan logo placeholder default.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Headline singkat personal brand Nadia.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "founderName",
      title: "Founder Name",
      type: "string",
      initialValue: "Nadia",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "founderBio",
      title: "Founder Bio",
      type: "text",
      rows: 4,
      description: "Perkenalan singkat mengenai Nadia dan lini usahanya.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "founderPhoto",
      title: "Founder Photo",
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
      name: "defaultWhatsappNumber",
      title: "Default WhatsApp Number",
      type: "string",
      description:
        "Nomor WhatsApp hanya angka dengan kode negara, tanpa spasi atau tanda + (contoh: 6282154309113).",
      initialValue: "6282154309113",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\d{8,15}$/, {
            name: "digits-only phone number",
          })
          .error("Gunakan angka saja dengan kode negara, misalnya 6282154309113."),
    }),
    defineField({
      name: "defaultWhatsappMessage",
      title: "Default WhatsApp Message",
      type: "string",
      description:
        "Pesan awal otomatis untuk tombol WhatsApp umum di website.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Contoh: Instagram, TikTok, WhatsApp.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Teks yang tampil, misalnya @nadiaanfh.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "platform",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Judul halaman untuk hasil pencarian dan preview tautan.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Deskripsi singkat untuk pencarian dan preview WhatsApp.",
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph Image",
      type: "image",
      description: "Gambar preview saat link website dibagikan.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "tagline",
      media: "brandLogo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Site Settings",
        subtitle: subtitle || "Pengaturan utama personal brand",
        media,
      };
    },
  },
});
