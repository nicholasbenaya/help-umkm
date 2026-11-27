import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';

// Fallback initial data jika Supabase belum di-seed tabelnya
const FALLBACK_SETTINGS = {
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
};

const FALLBACK_BOUQUETS = [
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
];

const FALLBACK_MAKEUP_LOOKS = [
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
  },
  {
    id: "mua-5",
    title: "Beauty Class & Pelatihan Rias Sekolah/Instansi",
    category: "training",
    categoryLabel: "Kelas & Pelatihan",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    description: "Layanan pengajar rias panggilan untuk ekskul sekolah (SMP/SMA/SMK), workshop kecantikan siswi/guru menyambut hari perpisahan atau Hari Kartini, serta seminar instansi di Samarinda.",
    tag: "Guest Educator",
    featured: true,
    waClicks: 56
  }
];

const FALLBACK_MAKEUP_PACKAGES = [
  {
    id: "pkg-1",
    name: "Layanan Rias Wisuda & Sempro",
    badge: "Paling Diminati",
    price: "Konsultasi Jadwal & Pricelist via WA",
    features: [
      "Complexion halus dan tahan lama untuk kegiatan luar maupun dalam ruangan",
      "Sudah termasuk penataan hijab (hijab do) atau tata rambut sederhana",
      "Termasuk pemasangan bulu mata dan softlens",
      "Disertai perlengkapan touch-up mini",
      "Layanan home service langsung ke alamat Anda di area Samarinda"
    ],
    isCombo: false,
    waClicks: 52
  },
  {
    id: "pkg-2",
    name: "Layanan Rias Lamaran & Prewedding",
    badge: "Rekomendasi",
    price: "Konsultasi Jadwal & Pricelist via WA",
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
    name: "Layanan Rias Akad & Wedding",
    badge: "Akad & Pernikahan",
    price: "Konsultasi Konsep & Jadwal via WA",
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
    name: "Beauty Class & Pelatihan Rias Sekolah/Instansi",
    badge: "Panggilan Mengajar",
    price: "Konsultasi Materi & Jadwal Acara",
    features: [
      "Panggilan pengajar rias wajah untuk sekolah (ekskul, perpisahan, Hari Kartini) & instansi",
      "Materi tata rias dasar (skincare prep, daily to formal makeup) disesuaikan peserta",
      "Praktek langsung (hands-on) dengan panduan langkah yang mudah dipahami pemula",
      "Bisa untuk kelompok kecil maupun kelas seminar di Samarinda",
      "Sertifikat kehadiran atau rangkuman materi (opsional sesuai kesepakatan)"
    ],
    isCombo: true,
    waClicks: 68
  }
];

// ==============================================================================
// 1. DATA FETCHING DENGAN NEXT.JS SERVER-SIDE CACHING (ISR / Data Cache)
// Menghemat request ke Supabase. Revalidate setiap 3600 detik (1 jam) atau instan via On-Demand Revalidation.
// ==============================================================================

export const getCachedSettings = unstable_cache(
  async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (error || !data) {
        return FALLBACK_SETTINGS;
      }

      return {
        studioName: data.studio_name,
        tagline: data.tagline,
        whatsappNumber: data.whatsapp_number,
        whatsappDisplay: data.whatsapp_display,
        contactName: data.contact_name,
        city: data.city,
        address: data.address,
        instagramAfisa: data.instagram_afisa,
        instagramNadia: data.instagram_nadia,
        announcement: data.announcement,
        isAnnouncementActive: data.is_announcement_active,
        adminPin: data.admin_pin || '123456'
      };
    } catch {
      return FALLBACK_SETTINGS;
    }
  },
  ['site_settings_cache'],
  { revalidate: 3600, tags: ['settings'] }
);

export const getCachedBouquets = unstable_cache(
  async (category = 'all') => {
    try {
      let query = supabase.from('bouquets').select('*').order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (category && category !== 'all') {
          return FALLBACK_BOUQUETS.filter(b => b.category === category);
        }
        return FALLBACK_BOUQUETS;
      }

      return data.map(b => ({
        id: b.id,
        title: b.title,
        category: b.category,
        categoryLabel: b.category_label,
        price: b.price,
        numericPrice: Number(b.numeric_price) || 0,
        tag: b.tag,
        status: b.status,
        image: b.image,
        description: b.description,
        highlights: Array.isArray(b.highlights) ? b.highlights : [],
        featured: Boolean(b.featured),
        views: b.views || 0,
        waClicks: b.wa_clicks || 0,
        createdAt: b.created_at
      }));
    } catch {
      return category && category !== 'all' 
        ? FALLBACK_BOUQUETS.filter(b => b.category === category)
        : FALLBACK_BOUQUETS;
    }
  },
  ['bouquets_cache'],
  { revalidate: 3600, tags: ['bouquets'] }
);

export const getCachedMakeupLooks = unstable_cache(
  async (category = 'all') => {
    try {
      let query = supabase.from('makeup_looks').select('*').order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (category && category !== 'all') {
          return FALLBACK_MAKEUP_LOOKS.filter(m => m.category === category);
        }
        return FALLBACK_MAKEUP_LOOKS;
      }

      return data.map(m => ({
        id: m.id,
        title: m.title,
        category: m.category,
        categoryLabel: m.category_label,
        image: m.image,
        description: m.description,
        tag: m.tag,
        featured: Boolean(m.featured),
        waClicks: m.wa_clicks || 0
      }));
    } catch {
      return category && category !== 'all'
        ? FALLBACK_MAKEUP_LOOKS.filter(m => m.category === category)
        : FALLBACK_MAKEUP_LOOKS;
    }
  },
  ['makeup_looks_cache'],
  { revalidate: 3600, tags: ['makeup'] }
);

export const getCachedMakeupPackages = unstable_cache(
  async () => {
    try {
      const { data, error } = await supabase.from('makeup_packages').select('*').order('created_at', { ascending: true });
      if (error || !data || data.length === 0) {
        return FALLBACK_MAKEUP_PACKAGES;
      }
      return data.map(p => ({
        id: p.id,
        name: p.name,
        badge: p.badge,
        price: p.price,
        features: Array.isArray(p.features) ? p.features : [],
        isCombo: Boolean(p.is_combo),
        waClicks: p.wa_clicks || 0
      }));
    } catch {
      return FALLBACK_MAKEUP_PACKAGES;
    }
  },
  ['makeup_packages_cache'],
  { revalidate: 3600, tags: ['makeup'] }
);

// ==============================================================================
// 2. REVALIDATION HELPER
// Dipanggil saat admin melakukan perubahan agar cache server langsung bersih seketika
// ==============================================================================

export function purgeCache(type = 'all') {
  try {
    if (type === 'bouquets' || type === 'all') {
      revalidateTag('bouquets');
      revalidatePath('/afisabouquet');
      revalidatePath('/');
    }
    if (type === 'makeup' || type === 'all') {
      revalidateTag('makeup');
      revalidatePath('/makeup-artist');
      revalidatePath('/');
    }
    if (type === 'settings' || type === 'all') {
      revalidateTag('settings');
      revalidatePath('/');
      revalidatePath('/afisabouquet');
      revalidatePath('/makeup-artist');
    }
  } catch (err) {
    console.error('Error invalidating cache:', err);
  }
}

// ==============================================================================
// 3. MUTASI ADMIN (Menggunakan Service Role untuk Keamanan & Otomatis Purge Cache)
// ==============================================================================

export async function createBouquetSupabase(data) {
  const newId = `bq-${Date.now()}`;
  const payload = {
    id: newId,
    title: data.title || "Buket Baru",
    category: data.category || "satin",
    category_label: data.categoryLabel || "Bunga Satin",
    price: data.price || "Rp 50.000",
    numeric_price: Number(data.numericPrice) || 50000,
    tag: data.tag || "Koleksi Baru",
    status: data.status || "available",
    image: data.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80",
    description: data.description || "",
    highlights: Array.isArray(data.highlights) ? data.highlights : ["100% Handcrafted"],
    featured: Boolean(data.featured)
  };

  const { data: result, error } = await supabaseAdmin.from('bouquets').insert(payload).select().single();
  if (error) throw new Error(error.message);
  purgeCache('bouquets');
  return result;
}

export async function updateBouquetSupabase(id, updates) {
  const payload = {};
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.categoryLabel !== undefined) payload.category_label = updates.categoryLabel;
  if (updates.price !== undefined) payload.price = updates.price;
  if (updates.numericPrice !== undefined) payload.numeric_price = Number(updates.numericPrice);
  if (updates.tag !== undefined) payload.tag = updates.tag;
  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.image !== undefined) payload.image = updates.image;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.highlights !== undefined) payload.highlights = updates.highlights;
  if (updates.featured !== undefined) payload.featured = Boolean(updates.featured);

  const { data: result, error } = await supabaseAdmin.from('bouquets').update(payload).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  purgeCache('bouquets');
  return result;
}

export async function deleteBouquetSupabase(id) {
  const { error } = await supabaseAdmin.from('bouquets').delete().eq('id', id);
  if (error) throw new Error(error.message);
  purgeCache('bouquets');
  return true;
}

export async function createMakeupLookSupabase(data) {
  const newId = `mua-${Date.now()}`;
  const payload = {
    id: newId,
    title: data.title || "Look Riasan Baru",
    category: data.category || "wisuda",
    category_label: data.categoryLabel || "Wisuda",
    image: data.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    description: data.description || "",
    tag: data.tag || "Portofolio",
    featured: Boolean(data.featured)
  };

  const { data: result, error } = await supabaseAdmin.from('makeup_looks').insert(payload).select().single();
  if (error) throw new Error(error.message);
  purgeCache('makeup');
  return result;
}

export async function updateMakeupLookSupabase(id, updates) {
  const payload = {};
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.categoryLabel !== undefined) payload.category_label = updates.categoryLabel;
  if (updates.image !== undefined) payload.image = updates.image;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.tag !== undefined) payload.tag = updates.tag;
  if (updates.featured !== undefined) payload.featured = Boolean(updates.featured);

  const { data: result, error } = await supabaseAdmin.from('makeup_looks').update(payload).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  purgeCache('makeup');
  return result;
}

export async function deleteMakeupLookSupabase(id) {
  const { error } = await supabaseAdmin.from('makeup_looks').delete().eq('id', id);
  if (error) throw new Error(error.message);
  purgeCache('makeup');
  return true;
}

export async function updateSettingsSupabase(updates) {
  const payload = { updated_at: new Date().toISOString() };
  if (updates.studioName !== undefined) payload.studio_name = updates.studioName;
  if (updates.tagline !== undefined) payload.tagline = updates.tagline;
  if (updates.whatsappNumber !== undefined) payload.whatsapp_number = updates.whatsappNumber;
  if (updates.whatsappDisplay !== undefined) payload.whatsapp_display = updates.whatsappDisplay;
  if (updates.contactName !== undefined) payload.contact_name = updates.contactName;
  if (updates.city !== undefined) payload.city = updates.city;
  if (updates.address !== undefined) payload.address = updates.address;
  if (updates.instagramAfisa !== undefined) payload.instagram_afisa = updates.instagramAfisa;
  if (updates.instagramNadia !== undefined) payload.instagram_nadia = updates.instagramNadia;
  if (updates.announcement !== undefined) payload.announcement = updates.announcement;
  if (updates.isAnnouncementActive !== undefined) payload.is_announcement_active = Boolean(updates.isAnnouncementActive);
  if (updates.adminPin !== undefined) payload.admin_pin = updates.adminPin;

  const { data: result, error } = await supabaseAdmin.from('site_settings').update(payload).eq('id', 'default').select().single();
  if (error) throw new Error(error.message);
  purgeCache('settings');
  return result;
}
