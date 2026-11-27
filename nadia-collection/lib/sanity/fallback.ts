import type { SiteData, SiteSettings, Venture } from "./types";

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  _id: "fallback-site-settings",
  brandName: "Nadia Collection",
  brandLogo: null,
  fallbackLogoPath: "/logos/nadia-collection-logo.svg",
  tagline: "Karya personal dalam floristry dan tata rias, dirangkai dengan perhatian pada setiap detail.",
  founderName: "Nadia",
  founderBio:
    "Nadia Collection adalah rumah personal brand yang menaungi lini usaha kreatif Nadia, dimulai dari rangkaian buket custom Afisa Bouquet hingga layanan tata rias Nadia Artistry. Setiap karya dikerjakan secara personal agar terasa hangat, rapi, dan sesuai momen spesial Anda.",
  founderPhoto: null,
  defaultWhatsappNumber: "6282154309113",
  defaultWhatsappMessage:
    "Halo Nadia, saya melihat website Nadia Collection dan ingin bertanya mengenai layanan yang tersedia.",
  socialLinks: [
    {
      _key: "ig-nadia",
      platform: "Instagram",
      label: "@nadiaanfh",
      url: "https://www.instagram.com/nadiaanfh/",
    },
    {
      _key: "ig-afisa",
      platform: "Instagram",
      label: "@afisabouquet",
      url: "https://www.instagram.com/afisabouquet/",
    },
  ],
  seoTitle: "Nadia Collection | Personal Brand & Multi-Venture Showcase",
  seoDescription:
    "Personal brand dan showcase lini usaha Nadia: Afisa Bouquet (Florist & Custom Bouquet Samarinda) dan Nadia Artistry (Makeup Artist).",
  ogImage: null,
};

export const FALLBACK_VENTURES: Venture[] = [
  {
    _id: "fallback-afisa-bouquet",
    name: "Afisa Bouquet",
    slug: "afisa-bouquet",
    order: 1,
    isActive: true,
    logo: null,
    fallbackLogoPath: "/logos/afisa-bouquet-logo.svg",
    category: "Florist & Custom Bouquet",
    shortDescription:
      "Rangkaian buket custom untuk wisuda, hadiah, dan momen spesial di Samarinda: buket satin, bunga, uang, snack, pipe cleaner, dan hampers.",
    fullDescription:
      "Afisa Bouquet melayani pemesanan buket custom dan hampers di Samarinda, Kalimantan Timur. Pilihan warna wrapping, isi rangkaian, dan kartu ucapan dapat disesuaikan dengan kebutuhan acara maupun budget Anda melalui konsultasi langsung di WhatsApp.",
    serviceArea: "Samarinda, Kalimantan Timur",
    whatsappNumberOverride: null,
    whatsappMessageTemplate:
      "Halo Nadia, saya ingin bertanya dan pesan buket custom di Afisa Bouquet.",
    instagramUrl: "https://www.instagram.com/afisabouquet/",
    coverImage: null,
    highlights: [
      {
        _key: "afisa-satin-wisuda",
        title: "Buket Satin & Buket Wisuda",
        note: "Pilihan warna pita dan wrapping custom untuk momen kelulusan.",
      },
      {
        _key: "afisa-money-snack",
        title: "Money Bouquet & Snack Bouquet",
        note: "Rangkaian rapi sesuai nominal dan pilihan camilan yang diinginkan.",
      },
      {
        _key: "afisa-pipe-hampers",
        title: "Pipe Cleaner Bouquet & Hampers",
        note: "Alternatif hadiah tahan lama untuk ulang tahun, lamaran, dan ucapan selamat.",
      },
    ],
    gallery: [],
    externalActionLabel: null,
    externalActionUrl: null,
  },
  {
    _id: "fallback-nadia-artistry",
    name: "Nadia Artistry",
    slug: "nadia-artistry",
    order: 2,
    isActive: true,
    logo: null,
    fallbackLogoPath: "/logos/nadia-artistry-logo.svg",
    category: "Makeup Artist",
    shortDescription:
      "Layanan makeup artist dengan sentuhan lembut dan tahan lama untuk wisuda, lamaran, acara keluarga, hingga hari pernikahan.",
    fullDescription:
      "Nadia Artistry menghadirkan riasan yang menonjolkan karakter alami wajah dengan hasil halus dan nyaman dipakai sepanjang acara. Diskusikan tanggal acara, referensi look, dan lokasi Anda langsung melalui WhatsApp.",
    serviceArea: null,
    whatsappNumberOverride: null,
    whatsappMessageTemplate:
      "Halo Nadia, saya ingin menanyakan ketersediaan jadwal dan layanan MUA Nadia Artistry.",
    instagramUrl: "https://www.instagram.com/nadiaanfh/",
    coverImage: null,
    highlights: [
      {
        _key: "mua-wisuda",
        title: "Makeup Wisuda & Acara Formal",
        note: "Tampilan fresh dan rapi untuk dokumentasi indoor maupun outdoor.",
      },
      {
        _key: "mua-lamaran",
        title: "Makeup Lamaran & Pre-Wedding",
        note: "Riasan lembut yang selaras dengan busana dan tema acara.",
      },
      {
        _key: "mua-wedding",
        title: "Bridal & Wedding Event",
        note: "Konsultasi konsep look dan jadwal langsung bersama Nadia.",
      },
    ],
    gallery: [],
    externalActionLabel: null,
    externalActionUrl: null,
  },
];

export const FALLBACK_SITE_DATA: SiteData = {
  settings: FALLBACK_SITE_SETTINGS,
  ventures: FALLBACK_VENTURES,
  isFallback: true,
};
