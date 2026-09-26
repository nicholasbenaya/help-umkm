# 🇮🇩 Monorepo Proyek Sampingan UMKM (`help-umkm`)

Repositori ini adalah kumpulan proyek website dan solusi digital untuk membantu digitalisasi **Usaha Mikro, Kecil, dan Menengah (UMKM)** secara sukarela (*pro-bono* / nirlaba).

Setiap UMKM dikelola dalam sub-folder mandiri menggunakan arsitektur **Monorepo** agar mudah dirawat, terpusat, dan dapat di-hosting secara terpisah tanpa biaya server bulanan.

---

## 📂 Struktur Repositori

```text
help-umkm/
├── .gitignore                   # Menghalau node_modules & build output di seluruh sub-folder
├── README.md                    # Panduan utama monorepo & playbook proyek baru
│
├── Nadia Studio/                # [UMKM #1] Afisa Bouquet & Nadia Artistry MUA (Samarinda)
│   ├── app/                     # Next.js App Router:
│   │   ├── page.js              # / -> Overview Hub & Galeri Karya Terfavorit
│   │   ├── afisabouquet/        # /afisabouquet -> Showcase & Katalog Buket
│   │   ├── makeup-artist/       # /makeup-artist -> Portofolio & Paket MUA
│   │   ├── studio-admin/        # /studio-admin -> Endpoint Admin Rahasia (PIN: 123456)
│   │   └── api/                 # REST API CRUD, Traffic & WhatsApp Click Tracking
│   ├── components/              # UI Components (Apple-style Minimalist)
│   ├── data/                    # Embedded database (db.json)
│   ├── lib/                     # Database engine & analytics calculation
│   ├── public/                  # Asset logo lossless SVG & screenshots
│   └── PANDUAN_WEBSITE.md       # Buku panduan serah-terima operasional untuk pemilik UMKM
│
└── [Nama-UMKM-Berikutnya]/      # Folder mandiri untuk proyek UMKM masa depan
```

---

## 🛠️ Daftar Proyek UMKM Aktif

| Nama Bisnis | Jenis Usaha | Lokasi | Stack Teknologi | Dokumentasi Khusus |
| :--- | :--- | :--- | :--- | :--- |
| **Nadia Studio** | Florist (*Afisa Bouquet*) & MUA (*Nadia Artistry*) | Samarinda, Kaltim | Next.js 14, Tailwind CSS, Local DB | [`Nadia Studio/PANDUAN_WEBSITE.md`](Nadia%20Studio/PANDUAN_WEBSITE.md) |

---

## 🧭 Panduan Menambahkan Proyek UMKM Baru

Ketika Anda ingin membantu UMKM baru, ikuti panduan praktis berikut:

### 1. Buat Sub-Folder Baru
Buat folder baru langsung di root repositori dengan nama brand UMKM tersebut:
```bash
# Contoh:
mkdir "Kopi-Kenangan-Lokal"
cd "Kopi-Kenangan-Lokal"
```

### 2. Inisialisasi Stack
Bangun project di dalam folder tersebut (misal Next.js atau Vite):
```bash
npx create-next-app@latest .
# ATAU
npm init -y
```
> ⚠️ **PENTING:** **JANGAN PERNAH** menjalankan `git init` di dalam subfolder! Repositori Git di root folder sudah otomatis mengawasi seluruh subfolder.

### 3. Otomatisasi `.gitignore`
File `.gitignore` di root repositori sudah disetel secara global:
* `**/node_modules/` otomatis diabaikan di subfolder mana pun.
* `**/.next/`, `**/build/`, `**/dist/`, dan `**/.env` tidak akan pernah ter-commit.

---

## 🌿 Standar Version Control (Git Monorepo)

Untuk menjaga riwayat commit tetap bersih dan mudah dibaca, gunakan konvensi **Scoped Commit**:

### Format Pesan Commit:
```text
tipe(nama-subfolder): ringkasan perubahan
```

### Contoh Praktis:
* `feat(nadia-studio): tambah galeri favorit dan endpoint studio-admin`
* `fix(nadia-studio): perbaiki pesan otomatis whatsapp untuk money bouquet`
* `feat(umkm-kuliner): buat halaman menu dan integrasi gmaps`
* `docs: perbarui panduan serah-terima umkm`

### Cara Melihat Riwayat Commit Hanya untuk 1 UMKM:
```bash
# Hanya menampilkan log commit milik folder Nadia Studio
git log -- "Nadia Studio"
```

---

## 🚀 Cara Deploy ke Hosting Gratis (Vercel) dari Monorepo

Setiap proyek UMKM dapat dihubungkan ke **nama domainnya masing-masing** (misal `nadia-business.com`, `toko-batik.com`) menggunakan 1 repository GitHub ini tanpa biaya bulanan (Rp 0):

1. Buka dashboard [Vercel.com](https://vercel.com) dan klik **Add New Project**.
2. Pilih repository GitHub ini (`help-umkm`).
3. Pada bagian **Root Directory**, klik **Edit** dan pilih subfolder proyeknya (contoh: `Nadia Studio`).
4. Klik **Deploy**. Vercel hanya akan mengompilasi folder tersebut.
5. Di menu **Project Settings > Domains**, masukkan custom domain milik UMKM tersebut.
6. Selesai! Ulangi langkah di atas setiap kali ada proyek UMKM baru.

---

## 🤝 Misi Sosial
Proyek ini dibuat untuk mendukung pertumbuhan ekonomi pelaku usaha mikro di Indonesia melalui penyediaan aset digital yang profesional, berkecepatan tinggi, dan berdaya guna tanpa membebani biaya operasional UMKM.
