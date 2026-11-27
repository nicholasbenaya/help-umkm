-- ==============================================================================
-- Nadia Studio - Supabase Database Schema & Initial Data
-- Jalankan skrip ini di SQL Editor pada Dashboard Supabase Anda
-- ==============================================================================

-- 1. Hapus tabel lama jika ada (Clean slate)
DROP TABLE IF EXISTS traffic CASCADE;
DROP TABLE IF EXISTS makeup_packages CASCADE;
DROP TABLE IF EXISTS makeup_looks CASCADE;
DROP TABLE IF EXISTS bouquets CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 2. Buat Tabel Pengaturan Situs (site_settings)
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  studio_name TEXT NOT NULL DEFAULT 'Nadia Studio',
  tagline TEXT DEFAULT 'Buket Bunga Handmade & Jasa Rias Wajah Samarinda',
  whatsapp_number TEXT NOT NULL DEFAULT '6282154309113',
  whatsapp_display TEXT DEFAULT '0821-5430-9113',
  contact_name TEXT DEFAULT 'Nadia',
  city TEXT DEFAULT 'Samarinda, Kalimantan Timur',
  address TEXT DEFAULT 'Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda',
  instagram_afisa TEXT DEFAULT 'https://www.instagram.com/afisabouquet/',
  instagram_nadia TEXT DEFAULT 'https://www.instagram.com/nadiaanfh/',
  announcement TEXT DEFAULT 'Pemesanan buket wisuda dan booking jadwal rias Samarinda kini dibuka.',
  is_announcement_active BOOLEAN DEFAULT true,
  admin_pin TEXT DEFAULT '123456',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Buat Tabel Buket Bunga (bouquets)
CREATE TABLE bouquets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  price TEXT NOT NULL,
  numeric_price NUMERIC DEFAULT 0,
  tag TEXT,
  status TEXT DEFAULT 'available',
  image TEXT NOT NULL,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  wa_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Buat Tabel Portofolio Rias (makeup_looks)
CREATE TABLE makeup_looks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  tag TEXT,
  featured BOOLEAN DEFAULT false,
  wa_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Buat Tabel Paket Jasa Rias (makeup_packages)
CREATE TABLE makeup_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT,
  price TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_combo BOOLEAN DEFAULT false,
  wa_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Buat Tabel Traffic & Analytics (traffic)
CREATE TABLE traffic (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT DEFAULT 'direct',
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Menjamin publik hanya bisa membaca (SELECT), dan hanya service role / admin yang bisa mutasi
-- ------------------------------------------------------------------------------
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bouquets ENABLE ROW LEVEL SECURITY;
ALTER TABLE makeup_looks ENABLE ROW LEVEL SECURITY;
ALTER TABLE makeup_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic ENABLE ROW LEVEL SECURITY;

-- Policy: Publik boleh membaca data produk & profil
CREATE POLICY "Public can view settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view bouquets" ON bouquets FOR SELECT USING (true);
CREATE POLICY "Public can view makeup looks" ON makeup_looks FOR SELECT USING (true);
CREATE POLICY "Public can view makeup packages" ON makeup_packages FOR SELECT USING (true);

-- Policy: Publik boleh mengirim catatan traffic/klik
CREATE POLICY "Public can log traffic" ON traffic FOR INSERT WITH CHECK (true);

-- Policy: Service role memiliki akses penuh (otomatis bypass RLS, tapi eksplisit didokumentasikan)

-- ------------------------------------------------------------------------------
-- SEED INITIAL DATA (Data awal bersih anti-slop)
-- ------------------------------------------------------------------------------
INSERT INTO site_settings (id, studio_name, tagline, whatsapp_number, whatsapp_display, contact_name, city, address, instagram_afisa, instagram_nadia, announcement, is_announcement_active, admin_pin)
VALUES (
  'default',
  'Nadia Studio',
  'Buket Bunga Handmade & Jasa Rias Wajah Samarinda',
  '6282154309113',
  '0821-5430-9113',
  'Nadia',
  'Samarinda, Kalimantan Timur',
  'Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda',
  'https://www.instagram.com/afisabouquet/',
  'https://www.instagram.com/nadiaanfh/',
  'Pemesanan buket wisuda dan booking jadwal rias Samarinda kini dibuka.',
  true,
  '123456'
);

INSERT INTO bouquets (id, title, category, category_label, price, numeric_price, tag, status, image, description, highlights, featured, views, wa_clicks) VALUES
('bq-1', 'Elegance Rose Satin Bouquet', 'satin', 'Bunga Satin', 'Rp 65.000', 65000, 'Best Seller', 'available', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80', 'Rangkaian mawar satin buatan tangan yang rapi dan tahan lama, dibungkus kertas buket warna blush pink dengan aksen pita. Cocok untuk hadiah wisuda atau ulang tahun.', '["Bahan satin awet", "Kertas buket rapi dan kokoh", "Sudah termasuk kartu ucapan"]'::jsonb, true, 142, 28),
('bq-2', 'Graduation Teddy & Flower Deluxe', 'wisuda', 'Wisuda & Sempro', 'Rp 95.000', 95000, 'Favorit Wisuda', 'available', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80', 'Buket wisuda dengan boneka bertoga, bunga satin rapi, dan selempang nama sesuai permintaan. Pilihan praktis untuk kado kelulusan sahabat atau kerabat.', '["Boneka toga bisa request nama", "Sudah termasuk kartu ucapan", "Pilihan warna toga sesuai kampus"]'::jsonb, true, 210, 47),
('bq-3', 'Luxury Butterfly Money Bouquet', 'money', 'Money Bouquet', 'Jasa Rp 75.000 (+ isi)', 75000, 'Buket Uang', 'available', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80', 'Buket uang kertas asli yang dipasang menggunakan plastik pelindung rapi tanpa lem atau staples sehingga kondisi uang tetap utuh dan aman saat diambil.', '["Uang aman tanpa lem atau staples", "Jumlah lembar bisa disesuaikan", "Pilihan ornamen kupu-kupu atau lampu kecil"]'::jsonb, true, 185, 39),
('bq-4', 'Sweet Tooth Ferrero & Pocky Bouquet', 'snack', 'Snack & Chocolate', 'Rp 55.000', 55000, 'Buket Snack', 'available', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80', 'Kombinasi cokelat Ferrero Rocher dan biskuit Pocky yang dirangkai estetik dengan susunan simetris dan wrapping warna pastel.', '["Snack baru dengan masa simpan panjang", "Bisa request jenis snack pengganti", "Sudah termasuk kartu ucapan"]'::jsonb, false, 98, 16),
('bq-5', 'Fluffy Pipe Cleaner Daisy Bouquet', 'satin', 'Bunga Kawat Bulu', 'Rp 45.000', 45000, 'Kawat Bulu', 'available', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80', 'Bunga buatan tangan dari kawat bulu (pipe cleaner) berbentuk daisy dan tulip warna pastel. Menggemaskan, tahan lama, dan tidak layu.', '["100% buatan tangan", "Bentuk rapi dan awet", "Pilihan warna pastel"]'::jsonb, false, 112, 21),
('bq-6', 'Hampers Gift Box & Dama Parfume', 'gift', 'Gift Box & Parfume', 'Rp 120.000', 120000, 'Hampers', 'available', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80', 'Kotak kado berisi buket mini satin, sebotol Dama Parfume, cokelat, dan kartu ucapan. Praktis untuk kado ulang tahun atau wisuda.', '["Termasuk 1 botol Dama Parfume", "Kemasan kotak pita rapi", "Siap langsung diserahkan"]'::jsonb, true, 154, 32);

INSERT INTO makeup_looks (id, title, category, category_label, image, description, tag, featured, wa_clicks) VALUES
('mua-1', 'Soft Radiant Graduation Look', 'wisuda', 'Wisuda & Sempro', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80', 'Riasan wisuda bernuansa natural peach yang segar di depan kamera. Nyaman dipakai dari pagi hingga selesai prosesi kelulusan.', 'Wisuda', true, 42),
('mua-2', 'Warm Peach Engagement Look', 'engagement', 'Lamaran & Prewedding', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', 'Riasan lamaran dengan warna hangat yang anggun dan menyatu dengan busana kebaya. Mengutamakan hasil kulit halus dan mata tegas bersahaja.', 'Lamaran', true, 38),
('mua-3', 'Sacred Traditional & Modern Akad', 'wedding', 'Akad & Wedding', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80', 'Riasan akad nikah bernuansa bersih dan sakral. Dilengkapi penataan hijab atau rambut rapi serta ronce melati.', 'Akad Nikah', true, 26),
('mua-4', 'Editorial Night Party & Bridesmaid', 'party', 'Party & Event', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80', 'Riasan untuk pesta, bridesmaid, atau acara formal dengan shading proporsional dan mata terdefinisi rapi.', 'Pesta & Event', false, 19),
('mua-5', 'Beauty Class & Pelatihan Rias Sekolah/Instansi', 'training', 'Kelas & Pelatihan', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', 'Layanan pengajar rias panggilan untuk ekskul sekolah (SMP/SMA/SMK), workshop kecantikan siswi/guru menyambut hari perpisahan atau Hari Kartini, serta seminar instansi di Samarinda.', 'Guest Educator', true, 56);

INSERT INTO makeup_packages (id, name, badge, price, features, is_combo, wa_clicks) VALUES
('pkg-1', 'Layanan Rias Wisuda & Sempro', 'Paling Diminati', 'Konsultasi Jadwal & Pricelist via WA', '["Complexion halus dan tahan lama untuk kegiatan luar maupun dalam ruangan", "Sudah termasuk penataan hijab (hijab do) atau tata rambut sederhana", "Termasuk pemasangan bulu mata dan softlens", "Disertai perlengkapan touch-up mini", "Layanan home service langsung ke alamat Anda di area Samarinda"]'::jsonb, false, 52),
('pkg-2', 'Layanan Rias Lamaran & Prewedding', 'Rekomendasi', 'Konsultasi Jadwal & Pricelist via WA', '["Riasan berfokus pada tampilan natural anggun", "Complexion rapi disesuaikan dengan jenis kulit", "Penataan rambut atau hijab sesuai tema busana", "Bantuan pemasangan headpiece atau aksesoris", "Home service ke rumah atau lokasi acara di Samarinda"]'::jsonb, false, 34),
('pkg-3', 'Layanan Rias Akad & Wedding', 'Akad & Pernikahan', 'Konsultasi Konsep & Jadwal via WA', '["Riasan pengantin full coverage yang tetap terasa nyaman di kulit", "Persiapan kulit (skin prep) sebelum rias", "Penataan hijab atau sanggul pengantin plus ronce melati", "Pendampingan touch-up selama prosesi akad", "Konsultasi konsep riasan sebelum hari H"]'::jsonb, false, 22),
('pkg-4', 'Beauty Class & Pelatihan Rias Sekolah/Instansi', 'Panggilan Mengajar', 'Konsultasi Materi & Jadwal Acara', '["Panggilan pengajar rias wajah untuk sekolah (ekskul, perpisahan, Hari Kartini) & instansi", "Materi tata rias dasar (skincare prep, daily to formal makeup) disesuaikan peserta", "Praktek langsung (hands-on) dengan panduan langkah yang mudah dipahami pemula", "Bisa untuk kelompok kecil maupun kelas seminar di Samarinda", "Sertifikat kehadiran atau rangkuman materi (opsional sesuai kesepakatan)"]'::jsonb, true, 68);
