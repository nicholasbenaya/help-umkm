# Monorepo Proyek Sampingan UMKM (`help-umkm`)

Repositori ini adalah kumpulan proyek website dan solusi digital untuk membantu digitalisasi **Usaha Mikro, Kecil, dan Menengah (UMKM)** secara sukarela (*pro-bono* / nirlaba).

Setiap UMKM dikelola dalam sub-folder mandiri menggunakan arsitektur **Monorepo** agar mudah dirawat, terpusat, dan dapat di-hosting secara terpisah dengan target biaya **Rp 0 / bulan**.

---

## Struktur Repositori

```text
help-umkm/
├── .gitignore                        # Mengabaikan node_modules, build output, env, & runtime agent HQ
├── README.md                         # Panduan utama monorepo, deploy Vercel, & playbook proyek baru
├── ROLE.md                           # Aturan kerja & pagar anti-over-engineering untuk JSM HQ agents
├── plan.md                           # Roadmap bertahap & pecahan task untuk JSM HQ
│
├── nadia-collection/                 # [UMKM #1 - v2 Aktif] Personal Brand Nadia Collection
│   ├── PRD.md                        # Product Requirements Document (Option 2 APPROVED)
│   ├── DESIGN.md                     # Sistem desain Blush Editorial Gallery & link Figma
│   ├── PANDUAN_CMS.md                # Panduan Bahasa Indonesia non-teknis untuk klien (/studio)
│   ├── .env.example                  # Template variabel lingkungan Sanity CMS & revalidasi
│   ├── app/                          # Next.js 16 App Router (/, /ventures/[slug], /studio, SEO, webhook)
│   ├── components/                   # Komponen UI editorial (Navbar, Footer, Hero, Showcase, Lightbox)
│   ├── lib/                          # Typed Sanity client, GROQ queries, fallback data, & WhatsApp helper
│   ├── public/logos/                 # Logo placeholder SVG (dapat diganti langsung dari Sanity Studio)
│   ├── sanity/                       # Skema siteSettings & venture + Desk Structure singleton
│   └── scripts/seed-sanity.mjs       # Helper opsional untuk mengisi data awal ke Sanity dataset
│
├── archive/
│   └── nadia-studio-v1/              # Arsip read-only versi v1 (tidak lagi dikembangkan/diubah)
│
└── [Nama-UMKM-Berikutnya]/           # Folder mandiri untuk proyek UMKM masa depan
```

---

## Daftar Proyek UMKM

| Nama Bisnis | Status | Jenis Usaha | Lokasi / Market | Stack Teknologi | Dokumentasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Nadia Collection** *(v2)* | Aktif (Siap Deploy) | Personal Brand Hub: Florist (*Afisa Bouquet*), MUA (*Nadia Artistry*), & lini usaha mendatang | Samarinda, Kaltim (Bouquet); MUA opsional/fleksibel via CMS | Next.js 16 App Router (TS), Tailwind CSS v4, Sanity CMS Free Tier (`/studio`) | [`PRD.md`](nadia-collection/PRD.md) · [`DESIGN.md`](nadia-collection/DESIGN.md) · [`PANDUAN_CMS.md`](nadia-collection/PANDUAN_CMS.md) |
| ~~Nadia Studio (v1)~~ | Arsip (Read-Only) | Versi terdahulu | Samarinda, Kaltim | Next.js 14 (Legacy) | [`archive/nadia-studio-v1/PANDUAN_WEBSITE.md`](archive/nadia-studio-v1/PANDUAN_WEBSITE.md) |

---

## Menjalankan & Menyiapkan `nadia-collection`

Aplikasi di `nadia-collection/` dapat dijalankan secara lokal tanpa konfigurasi Sanity terlebih dahulu (otomatis memakai data fallback di `lib/sanity/fallback.ts`).

### 1. Menjalankan Secara Lokal
```bash
cd nadia-collection
npm install
npm run dev
```
Buka `http://localhost:3000` untuk melihat website utama, `/ventures/afisa-bouquet`, `/ventures/nadia-artistry`, dan `/studio`.

### 2. Menghubungkan Sanity CMS (Free Tier)
1. Buat proyek gratis di [sanity.io/manage](https://www.sanity.io/manage) dengan dataset `production`.
2. Salin `nadia-collection/.env.example` menjadi `nadia-collection/.env.local` (jangan pernah commit `.env.local`) lalu isi:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=project_id_anda
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=rahasia_acak_panjang
   ```
   Opsional untuk produksi dengan custom domain: tambahkan `NEXT_PUBLIC_SITE_URL=https://domain-anda.com`.
3. Di dashboard Sanity (**API > CORS origins**), tambahkan `http://localhost:3000` dan domain Vercel/custom domain Anda dengan opsi **Allow credentials** aktif agar `/studio` dapat login.
4. *(Opsional)* Isi data awal otomatis (Nadia Collection, Afisa Bouquet, dan Nadia Artistry) dengan satu perintah menggunakan write token sementara dari Sanity:
   ```bash
   cd nadia-collection
   SANITY_API_WRITE_TOKEN=token_write_anda node scripts/seed-sanity.mjs
   ```
   Skrip ini memakai `createIfNotExists` secara default agar aman dan tidak menimpa data yang sudah diedit klien (gunakan `--force` hanya jika sengaja ingin mereset dokumen seed).
5. Di dashboard Sanity (**API > Webhooks**), buat webhook baru mengarah ke:
   - **URL:** `https://<domain-vercel-anda>/api/revalidate`
   - **Trigger on:** Create, Update, Delete (filter: `_type in ["siteSettings", "venture"]`)
   - **Projection:** `{ _type, "slug": slug.current }`
   - **Secret:** sama persis dengan nilai `SANITY_REVALIDATE_SECRET` di Vercel.

### 3. Deploy ke Vercel (Gratis / Rp 0)
1. Buka [vercel.com](https://vercel.com) lalu klik **Add New Project** dan pilih repositori `help-umkm`.
2. Pada bagian **Root Directory**, klik **Edit** dan pilih `nadia-collection`.
3. Di bagian **Environment Variables**, masukkan:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (`production`)
   - `SANITY_REVALIDATE_SECRET`
   - *(Opsional)* `NEXT_PUBLIC_SITE_URL`
4. Klik **Deploy**. Vercel hanya membangun folder `nadia-collection/`.
5. Jika klien memiliki custom domain, hubungkan di **Project Settings > Domains** lalu tambahkan domain tersebut ke CORS Origins di Sanity.

---

## Panduan Menambahkan Proyek UMKM Baru

1. **Buat Sub-Folder Baru** di root repositori (misalnya `kopi-lokal/`).
2. **Jangan pernah menjalankan `git init` di dalam subfolder** karena Git di root sudah melacak seluruh proyek.
3. **Manfaatkan `.gitignore` global** di root (`**/node_modules/`, `**/.next/`, `**/.env`, `**/.env*.local` otomatis diabaikan).
4. **Deploy terpisah di Vercel** cukup dengan memilih **Root Directory** sesuai subfolder UMKM baru tersebut.

---

## Standar Version Control (Git Monorepo)

Gunakan format **Scoped Commit** agar riwayat perubahan tiap UMKM mudah ditelusuri:

```text
tipe(nama-subfolder): ringkasan perubahan
```

Contoh:
- `feat(nadia-collection): define Sanity schemas, typed client, and fallback data`
- `fix(nadia-collection): resolve QA contrast, focus management, and studio title issues`
- `docs(nadia-collection): add Bahasa Indonesia CMS guide and update monorepo README`

Untuk melihat riwayat commit khusus satu UMKM:
```bash
git log -- nadia-collection
```

---

## Misi Sosial

Repositori ini dibuat untuk mendukung pertumbuhan ekonomi pelaku usaha mikro di Indonesia melalui penyediaan aset digital yang rapi, cepat, mudah dikelola mandiri, dan tanpa beban biaya server bulanan.
