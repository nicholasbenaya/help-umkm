import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_DATA = {
  settings: {
    studioName: "Nadia Studio",
    tagline: "Buket Bunga Handmade & Jasa Rias Wajah Samarinda",
    whatsappNumber: "6282154309113",
    whatsappDisplay: "0821-5430-9113",
    contactName: "Nadia",
    city: "Samarinda, Kalimantan Timur",
    address: "Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda",
    instagramAfisa: "https://www.instagram.com/afisabouquet/",
    instagramNadia: "https://www.instagram.com/nadiaanfh/",
    announcement: "Pemesanan buket wisuda dan booking jadwal rias Samarinda kini dibuka.",
    isAnnouncementActive: true,
    adminPin: "123456"
  },
  bouquets: [
    {
      id: "bq-1",
      title: "Elegance Rose Satin Bouquet",
      category: "satin",
      categoryLabel: "Bunga Satin",
      price: "Rp 65.000",
      numericPrice: 65000,
      tag: "Best Seller",
      status: "available",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80",
      description: "Rangkaian mawar satin buatan tangan yang rapi dan tahan lama, dibungkus kertas buket warna blush pink dengan aksen pita. Cocok untuk hadiah wisuda atau ulang tahun.",
      highlights: ["Bahan satin awet", "Kertas buket rapi dan kokoh", "Sudah termasuk kartu ucapan"],
      featured: true,
      views: 142,
      waClicks: 28,
      createdAt: "2026-09-01T10:00:00Z"
    },
    {
      id: "bq-2",
      title: "Graduation Teddy & Flower Deluxe",
      category: "wisuda",
      categoryLabel: "Wisuda & Sempro",
      price: "Rp 95.000",
      numericPrice: 95000,
      tag: "Favorit Wisuda",
      status: "available",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80",
      description: "Buket wisuda dengan boneka bertoga, bunga satin rapi, dan selempang nama sesuai permintaan. Pilihan praktis untuk kado kelulusan sahabat atau kerabat.",
      highlights: ["Boneka toga bisa request nama", "Sudah termasuk kartu ucapan", "Pilihan warna toga sesuai kampus"],
      featured: true,
      views: 210,
      waClicks: 47,
      createdAt: "2026-09-02T10:00:00Z"
    },
    {
      id: "bq-3",
      title: "Luxury Butterfly Money Bouquet",
      category: "money",
      categoryLabel: "Money Bouquet",
      price: "Jasa Rp 75.000 (+ isi)",
      numericPrice: 75000,
      tag: "Buket Uang",
      status: "available",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80",
      description: "Buket uang kertas asli yang dipasang menggunakan plastik pelindung rapi tanpa lem atau staples sehingga kondisi uang tetap utuh dan aman saat diambil.",
      highlights: ["Uang aman tanpa lem atau staples", "Jumlah lembar bisa disesuaikan", "Pilihan ornamen kupu-kupu atau lampu kecil"],
      featured: true,
      views: 185,
      waClicks: 39,
      createdAt: "2026-09-03T10:00:00Z"
    },
    {
      id: "bq-4",
      title: "Sweet Tooth Ferrero & Pocky Bouquet",
      category: "snack",
      categoryLabel: "Snack & Chocolate",
      price: "Rp 55.000",
      numericPrice: 55000,
      tag: "Buket Snack",
      status: "available",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80",
      description: "Kombinasi cokelat Ferrero Rocher dan biskuit Pocky yang dirangkai estetik dengan susunan simetris dan wrapping warna pastel.",
      highlights: ["Snack baru dengan masa simpan panjang", "Bisa request jenis snack pengganti", "Sudah termasuk kartu ucapan"],
      featured: false,
      views: 98,
      waClicks: 16,
      createdAt: "2026-09-04T10:00:00Z"
    },
    {
      id: "bq-5",
      title: "Fluffy Pipe Cleaner Daisy Bouquet",
      category: "satin",
      categoryLabel: "Bunga Kawat Bulu",
      price: "Rp 45.000",
      numericPrice: 45000,
      tag: "Kawat Bulu",
      status: "available",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80",
      description: "Bunga buatan tangan dari kawat bulu (pipe cleaner) berbentuk daisy dan tulip warna pastel. Menggemaskan, tahan lama, dan tidak layu.",
      highlights: ["100% buatan tangan", "Bentuk rapi dan awet", "Pilihan warna pastel"],
      featured: false,
      views: 112,
      waClicks: 21,
      createdAt: "2026-09-05T10:00:00Z"
    },
    {
      id: "bq-6",
      title: "Hampers Gift Box & Dama Parfume",
      category: "gift",
      categoryLabel: "Gift Box & Parfume",
      price: "Rp 120.000",
      numericPrice: 120000,
      tag: "Hampers",
      status: "available",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
      description: "Kotak kado berisi buket mini satin, sebotol Dama Parfume, cokelat, dan kartu ucapan. Praktis untuk kado ulang tahun atau wisuda.",
      highlights: ["Termasuk 1 botol Dama Parfume", "Kemasan kotak pita rapi", "Siap langsung diserahkan"],
      featured: true,
      views: 154,
      waClicks: 32,
      createdAt: "2026-09-06T10:00:00Z"
    }
  ],
  makeupLooks: [
    {
      id: "mua-1",
      title: "Soft Radiant Graduation Look",
      category: "wisuda",
      categoryLabel: "Wisuda & Sempro",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
      description: "Riasan wisuda bernuansa natural peach yang segar di depan kamera. Nyaman dipakai dari pagi hingga selesai prosesi kelulusan.",
      tag: "Wisuda",
      featured: true,
      waClicks: 42
    },
    {
      id: "mua-2",
      title: "Warm Peach Engagement Look",
      category: "engagement",
      categoryLabel: "Lamaran & Prewedding",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      description: "Riasan lamaran dengan warna hangat yang anggun dan menyatu dengan busana kebaya. Mengutamakan hasil kulit halus dan mata tegas bersahaja.",
      tag: "Lamaran",
      featured: true,
      waClicks: 38
    },
    {
      id: "mua-3",
      title: "Sacred Traditional & Modern Akad",
      category: "wedding",
      categoryLabel: "Akad & Wedding",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      description: "Riasan akad nikah bernuansa bersih dan sakral. Dilengkapi penataan hijab atau rambut rapi serta ronce melati.",
      tag: "Akad Nikah",
      featured: true,
      waClicks: 26
    },
    {
      id: "mua-4",
      title: "Editorial Night Party & Bridesmaid",
      category: "party",
      categoryLabel: "Party & Event",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80",
      description: "Riasan untuk pesta, bridesmaid, atau acara formal dengan shading proporsional dan mata terdefinisi rapi.",
      tag: "Pesta & Event",
      featured: false,
      waClicks: 19
    }
  ],
  makeupPackages: [
    {
      id: "pkg-1",
      name: "Paket Rias Wisuda & Sempro",
      badge: "Paling Diminati",
      price: "Mulai Rp 200.000",
      features: [
        "Complexion halus dan tahan lama untuk kegiatan luar maupun dalam ruangan",
        "Sudah termasuk penataan hijab (hijab do) atau tata rambut sederhana",
        "Termasuk pemasangan bulu mata dan softlens",
        "Disertai perlengkapan touch-up mini",
        "Layanan home service ke alamat Anda di area Samarinda"
      ],
      isCombo: false,
      waClicks: 52
    },
    {
      id: "pkg-2",
      name: "Paket Rias Lamaran & Prewedding",
      badge: "Rekomendasi",
      price: "Mulai Rp 350.000",
      features: [
        "Riasan berfokus pada tampilan natural anggun",
        "Complexion rapi disesuaikan dengan jenis kulit",
        "Penataan rambut atau hijab sesuai tema busana",
        "Bantuan pemasangan headpiece atau aksesoris",
        "Home service ke rumah atau lokasi acara di Samarinda"
      ],
      isCombo: false,
      waClicks: 34
    },
    {
      id: "pkg-3",
      name: "Paket Rias Akad Nikah",
      badge: "Akad & Pernikahan",
      price: "Konsultasi via WA",
      features: [
        "Riasan pengantin full coverage yang tetap terasa nyaman di kulit",
        "Persiapan kulit (skin prep) sebelum rias",
        "Penataan hijab atau sanggul pengantin plus ronce melati",
        "Pendampingan touch-up selama prosesi akad",
        "Konsultasi konsep riasan sebelum hari H"
      ],
      isCombo: false,
      waClicks: 22
    },
    {
      id: "pkg-4",
      name: "Paket Kombo Wisuda (Rias + Buket)",
      badge: "Hemat Satu Paket",
      price: "Hemat Rp 265.000",
      features: [
        "Jasa rias wisuda oleh Nadia Artistry",
        "Buket bunga pilihan dari Afisa Bouquet",
        "Satu kontak koordinasi untuk atur jadwal rias dan serah terima buket",
        "Buket bisa langsung diserahkan saat perias datang ke lokasi",
        "Biaya lebih hemat dibanding pemesanan terpisah"
      ],
      isCombo: true,
      waClicks: 68
    }
  ],
  traffic: [
    { id: "tr-1", type: "pageview", path: "/", referrer: "direct", timestamp: "2026-09-26T08:15:00Z" },
    { id: "tr-2", type: "pageview", path: "/afisabouquet", referrer: "instagram", timestamp: "2026-09-26T09:20:00Z" },
    { id: "tr-3", type: "whatsapp_click", path: "/afisabouquet", meta: { item: "Elegance Rose Satin Bouquet" }, timestamp: "2026-09-26T09:25:00Z" },
    { id: "tr-4", type: "pageview", path: "/makeup-artist", referrer: "instagram", timestamp: "2026-09-26T10:10:00Z" },
    { id: "tr-5", type: "whatsapp_click", path: "/makeup-artist", meta: { item: "Paket Kombo Wisuda (MUA + Buket)" }, timestamp: "2026-09-26T10:15:00Z" }
  ]
};

// Ensure data directory exists
function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
  }
}

export function getDatabase() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json, returning initial data", err);
    return INITIAL_DATA;
  }
}

export function saveDatabase(data) {
  ensureDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing db.json", err);
    return false;
  }
}

// ==================== BOUQUETS CRUD ====================

export function getBouquets(filterCategory = 'all') {
  const db = getDatabase();
  let items = db.bouquets || [];
  if (filterCategory && filterCategory !== 'all') {
    items = items.filter(b => b.category === filterCategory);
  }
  return items;
}

export function getBouquetById(id) {
  const db = getDatabase();
  return (db.bouquets || []).find(b => b.id === id);
}

export function createBouquet(data) {
  const db = getDatabase();
  const newId = `bq-${Date.now()}`;
  const newItem = {
    id: newId,
    title: data.title || "Buket Baru",
    category: data.category || "satin",
    categoryLabel: data.categoryLabel || "Bunga Satin",
    price: data.price || "Rp 50.000",
    numericPrice: Number(data.numericPrice) || 50000,
    tag: data.tag || "Koleksi Baru",
    status: data.status || "available",
    image: data.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80",
    description: data.description || "",
    highlights: Array.isArray(data.highlights) ? data.highlights : ["100% Handcrafted", "Free kartu ucapan"],
    featured: Boolean(data.featured),
    views: 0,
    waClicks: 0,
    createdAt: new Date().toISOString()
  };
  db.bouquets = [newItem, ...(db.bouquets || [])];
  saveDatabase(db);
  return newItem;
}

export function updateBouquet(id, updates) {
  const db = getDatabase();
  const index = (db.bouquets || []).findIndex(b => b.id === id);
  if (index === -1) return null;

  db.bouquets[index] = {
    ...db.bouquets[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveDatabase(db);
  return db.bouquets[index];
}

export function deleteBouquet(id) {
  const db = getDatabase();
  const initialLen = (db.bouquets || []).length;
  db.bouquets = (db.bouquets || []).filter(b => b.id !== id);
  saveDatabase(db);
  return db.bouquets.length < initialLen;
}

// ==================== MAKEUP LOOKS & PACKAGES ====================

export function getMakeupLooks(filterCategory = 'all') {
  const db = getDatabase();
  let items = db.makeupLooks || [];
  if (filterCategory && filterCategory !== 'all') {
    items = items.filter(m => m.category === filterCategory);
  }
  return items;
}

export function createMakeupLook(data) {
  const db = getDatabase();
  const newItem = {
    id: `mua-${Date.now()}`,
    title: data.title || "Look Riasan Baru",
    category: data.category || "wisuda",
    categoryLabel: data.categoryLabel || "Wisuda",
    image: data.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    description: data.description || "",
    tag: data.tag || "Portofolio",
    featured: Boolean(data.featured),
    waClicks: 0,
    createdAt: new Date().toISOString()
  };
  db.makeupLooks = [newItem, ...(db.makeupLooks || [])];
  saveDatabase(db);
  return newItem;
}

export function updateMakeupLook(id, updates) {
  const db = getDatabase();
  const index = (db.makeupLooks || []).findIndex(m => m.id === id);
  if (index === -1) return null;
  db.makeupLooks[index] = { ...db.makeupLooks[index], ...updates };
  saveDatabase(db);
  return db.makeupLooks[index];
}

export function deleteMakeupLook(id) {
  const db = getDatabase();
  db.makeupLooks = (db.makeupLooks || []).filter(m => m.id !== id);
  saveDatabase(db);
  return true;
}

export function getMakeupPackages() {
  const db = getDatabase();
  return db.makeupPackages || [];
}

export function updateMakeupPackage(id, updates) {
  const db = getDatabase();
  const index = (db.makeupPackages || []).findIndex(p => p.id === id);
  if (index === -1) return null;
  db.makeupPackages[index] = { ...db.makeupPackages[index], ...updates };
  saveDatabase(db);
  return db.makeupPackages[index];
}

// ==================== SETTINGS & ANALYTICS ====================

export function getSettings() {
  const db = getDatabase();
  return db.settings || INITIAL_DATA.settings;
}

export function updateSettings(newSettings) {
  const db = getDatabase();
  db.settings = { ...db.settings, ...newSettings };
  saveDatabase(db);
  return db.settings;
}

export function trackEvent({ type, path, referrer, meta }) {
  const db = getDatabase();
  const newEvent = {
    id: `tr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: type || 'pageview',
    path: path || '/',
    referrer: referrer || 'direct',
    meta: meta || {},
    timestamp: new Date().toISOString()
  };

  // If whatsapp click on specific bouquet or makeup item, increment item's waClicks counter
  if (type === 'whatsapp_click' && meta?.id) {
    const bq = (db.bouquets || []).find(b => b.id === meta.id);
    if (bq) bq.waClicks = (bq.waClicks || 0) + 1;

    const look = (db.makeupLooks || []).find(m => m.id === meta.id);
    if (look) look.waClicks = (look.waClicks || 0) + 1;

    const pkg = (db.makeupPackages || []).find(p => p.id === meta.id);
    if (pkg) pkg.waClicks = (pkg.waClicks || 0) + 1;
  }

  // Keep max 1000 events to keep lightweight
  db.traffic = [newEvent, ...(db.traffic || [])].slice(0, 1000);
  saveDatabase(db);
  return newEvent;
}

export function getAnalyticsSummary() {
  const db = getDatabase();
  const events = db.traffic || [];

  const pageviews = events.filter(e => e.type === 'pageview');
  const waClicks = events.filter(e => e.type === 'whatsapp_click');

  // Breakdown by path
  const pathCounts = {};
  pageviews.forEach(p => {
    pathCounts[p.path] = (pathCounts[p.path] || 0) + 1;
  });

  // Breakdown by referrer
  const referrerCounts = {};
  events.forEach(e => {
    const ref = e.referrer || 'direct';
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });

  // Top bouquets by wa clicks
  const topBouquets = [...(db.bouquets || [])]
    .sort((a, b) => (b.waClicks || 0) - (a.waClicks || 0))
    .slice(0, 5);

  // Top makeup services
  const topPackages = [...(db.makeupPackages || [])]
    .sort((a, b) => (b.waClicks || 0) - (a.waClicks || 0));

  const conversionRate = pageviews.length > 0 
    ? ((waClicks.length / pageviews.length) * 100).toFixed(1) 
    : 0;

  return {
    totalPageviews: pageviews.length,
    totalWaClicks: waClicks.length,
    conversionRate: `${conversionRate}%`,
    pathCounts,
    referrerCounts,
    topBouquets,
    topPackages,
    recentEvents: events.slice(0, 15)
  };
}
