import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "next-sanity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex <= 0) {
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(projectRoot, ".env.local"));
loadEnvFile(path.join(projectRoot, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
const forceOverwrite = process.argv.includes("--force");

if (!projectId || !token) {
  console.error(
    [
      "Missing required environment variables for Sanity seeding.",
      "Please set:",
      "  - NEXT_PUBLIC_SANITY_PROJECT_ID",
      "  - SANITY_API_WRITE_TOKEN (Editor/Write token from sanity.io/manage)",
      "Optional:",
      "  - NEXT_PUBLIC_SANITY_DATASET (defaults to production)",
      "",
      "Usage:",
      "  node scripts/seed-sanity.mjs          # Safe seed (createIfNotExists)",
      "  node scripts/seed-sanity.mjs --force  # Replace existing seed documents",
    ].join("\n"),
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const seedDocuments = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Nadia Collection",
    tagline:
      "Karya personal dalam floristry dan tata rias, dirangkai dengan perhatian pada setiap detail.",
    founderName: "Nadia",
    founderBio:
      "Nadia Collection adalah rumah personal brand yang menaungi lini usaha kreatif Nadia, dimulai dari rangkaian buket custom Afisa Bouquet hingga layanan tata rias Nadia Artistry. Setiap karya dikerjakan secara personal agar terasa hangat, rapi, dan sesuai momen spesial Anda.",
    defaultWhatsappNumber: "6282154309113",
    defaultWhatsappMessage:
      "Halo Nadia, saya melihat website Nadia Collection dan ingin bertanya mengenai layanan yang tersedia.",
    socialLinks: [
      {
        _key: "ig-nadia",
        _type: "socialLink",
        platform: "Instagram",
        label: "@nadiaanfh",
        url: "https://www.instagram.com/nadiaanfh/",
      },
      {
        _key: "ig-afisa",
        _type: "socialLink",
        platform: "Instagram",
        label: "@afisabouquet",
        url: "https://www.instagram.com/afisabouquet/",
      },
    ],
    seoTitle: "Nadia Collection | Personal Brand & Multi-Venture Showcase",
    seoDescription:
      "Personal brand dan showcase lini usaha Nadia: Afisa Bouquet (Florist & Custom Bouquet Samarinda) dan Nadia Artistry (Makeup Artist).",
  },
  {
    _id: "venture-afisa-bouquet",
    _type: "venture",
    name: "Afisa Bouquet",
    slug: {
      _type: "slug",
      current: "afisa-bouquet",
    },
    order: 1,
    isActive: true,
    category: "Florist & Custom Bouquet",
    shortDescription:
      "Rangkaian buket custom untuk wisuda, hadiah, dan momen spesial di Samarinda: buket satin, bunga, uang, snack, pipe cleaner, dan hampers.",
    fullDescription:
      "Afisa Bouquet melayani pemesanan buket custom dan hampers di Samarinda, Kalimantan Timur. Pilihan warna wrapping, isi rangkaian, dan kartu ucapan dapat disesuaikan dengan kebutuhan acara maupun budget Anda melalui konsultasi langsung di WhatsApp.",
    serviceArea: "Samarinda, Kalimantan Timur",
    whatsappMessageTemplate:
      "Halo Nadia, saya ingin bertanya dan pesan buket custom di Afisa Bouquet.",
    instagramUrl: "https://www.instagram.com/afisabouquet/",
    highlights: [
      {
        _key: "afisa-satin-wisuda",
        _type: "ventureHighlight",
        title: "Buket Satin & Buket Wisuda",
        note: "Pilihan warna pita dan wrapping custom untuk momen kelulusan.",
      },
      {
        _key: "afisa-money-snack",
        _type: "ventureHighlight",
        title: "Money Bouquet & Snack Bouquet",
        note: "Rangkaian rapi sesuai nominal dan pilihan camilan yang diinginkan.",
      },
      {
        _key: "afisa-pipe-hampers",
        _type: "ventureHighlight",
        title: "Pipe Cleaner Bouquet & Hampers",
        note: "Alternatif hadiah tahan lama untuk ulang tahun, lamaran, dan ucapan selamat.",
      },
    ],
    gallery: [],
  },
  {
    _id: "venture-nadia-artistry",
    _type: "venture",
    name: "Nadia Artistry",
    slug: {
      _type: "slug",
      current: "nadia-artistry",
    },
    order: 2,
    isActive: true,
    category: "Makeup Artist",
    shortDescription:
      "Layanan makeup artist dengan sentuhan lembut dan tahan lama untuk wisuda, lamaran, acara keluarga, hingga hari pernikahan.",
    fullDescription:
      "Nadia Artistry menghadirkan riasan yang menonjolkan karakter alami wajah dengan hasil halus dan nyaman dipakai sepanjang acara. Diskusikan tanggal acara, referensi look, dan lokasi Anda langsung melalui WhatsApp.",
    whatsappMessageTemplate:
      "Halo Nadia, saya ingin menanyakan ketersediaan jadwal dan layanan MUA Nadia Artistry.",
    instagramUrl: "https://www.instagram.com/nadiaanfh/",
    highlights: [
      {
        _key: "mua-wisuda",
        _type: "ventureHighlight",
        title: "Makeup Wisuda & Acara Formal",
        note: "Tampilan fresh dan rapi untuk dokumentasi indoor maupun outdoor.",
      },
      {
        _key: "mua-lamaran",
        _type: "ventureHighlight",
        title: "Makeup Lamaran & Pre-Wedding",
        note: "Riasan lembut yang selaras dengan busana dan tema acara.",
      },
      {
        _key: "mua-wedding",
        _type: "ventureHighlight",
        title: "Bridal & Wedding Event",
        note: "Konsultasi konsep look dan jadwal langsung bersama Nadia.",
      },
    ],
    gallery: [],
  },
];

async function run() {
  console.log(
    `Seeding Sanity project "${projectId}" (dataset "${dataset}") using ${forceOverwrite ? "createOrReplace (--force)" : "createIfNotExists"}...`,
  );

  for (const doc of seedDocuments) {
    if (forceOverwrite) {
      await client.createOrReplace(doc);
    } else {
      await client.createIfNotExists(doc);
    }
    console.log(`  - Seeded ${doc._type} (${doc._id})`);
  }

  console.log("Sanity seed completed successfully.");
}

run().catch((error) => {
  console.error("Failed to seed Sanity:", error);
  process.exit(1);
});
