# Panduan Pengelolaan Konten Website (Sanity Studio)

Panduan ini disusun agar Nadia dapat memperbarui nama brand, logo, nomor WhatsApp, foto karya, dan daftar lini usaha secara mandiri kapan saja, langsung dari HP atau laptop, tanpa perlu mengubah kode website.

---

## 1. Cara Masuk ke Halaman Kelola Konten (`/studio`)

1. Buka alamat website Anda lalu tambahkan `/studio` di belakangnya.
   Contoh: `https://domain-anda.vercel.app/studio`
2. Pilih metode masuk menggunakan **akun Google** atau **akun Sanity** yang sudah terdaftar sebagai admin proyek.
3. Setelah masuk, Anda akan melihat dua menu utama di sisi kiri:
   - **Site Settings**: pengaturan identitas utama personal brand (nama brand, logo utama, bio, foto pendiri, nomor WhatsApp default, media sosial, dan info SEO).
   - **Ventures**: daftar seluruh lini usaha (misalnya Afisa Bouquet, Nadia Artistry, dan usaha baru di masa depan).

> Catatan: Halaman `/studio` tidak muncul di hasil pencarian Google (`noindex`) dan hanya bisa diubah oleh akun yang diundang ke proyek Sanity Anda.

---

## 2. Mengubah Nama Brand, Logo Utama, Bio, dan Media Sosial (FR-01)

1. Klik menu **Site Settings** di panel kiri.
2. Sesuaikan kolom yang ingin diperbarui:
   - **Brand Name**: nama utama yang tampil di header, footer, dan judul tab browser (bawaan: `Nadia Collection`). Jika nama diubah tanpa mengunggah logo baru, website otomatis menampilkan nama baru tersebut dalam gaya huruf editorial.
   - **Brand Logo**: klik **Upload** untuk mengganti logo utama dengan file milik Anda (disarankan format **SVG** atau **PNG** berlatar transparan). Jika dikosongkan, website memakai logo bawaan atau teks nama brand.
   - **Tagline**: kalimat singkat yang tampil di bagian pembuka (Hero) dan footer.
   - **Founder Name** & **Founder Bio**: nama dan cerita singkat Anda pada bagian Tentang Nadia.
   - **Founder Photo**: unggah foto potret Anda. Anda bisa menekan ikon titik fokus (*hotspot*) di pojok gambar untuk memilih titik wajah agar potongan foto tetap rapi di layar HP maupun desktop.
   - **Social Links**: klik **Add item** untuk menambah atau mengubah tautan Instagram, TikTok, atau media sosial lainnya.
   - **SEO Title**, **SEO Description**, & **OpenGraph Image**: teks dan gambar preview yang muncul saat tautan website dibagikan di WhatsApp atau Instagram.
3. Setelah selesai, klik tombol **Publish** di pojok kanan bawah.

---

## 3. Mengatur Nomor WhatsApp dan Pesan Otomatis (FR-03)

Website mendukung satu nomor WhatsApp utama dan nomor khusus per lini usaha (jika suatu saat usaha tertentu dikelola admin berbeda).

### A. Mengubah Nomor WhatsApp Utama (Default)
1. Buka **Site Settings**.
2. Isi kolom **Default WhatsApp Number** menggunakan **angka saja** dengan kode negara `62` di depan, tanpa tanda `+`, spasi, atau tanda strip.
   - Benar: `6282154309113`
   - Salah: `+62 821-5430-9113` atau `082154309113`
3. Sesuaikan **Default WhatsApp Message** sebagai pesan sapaan otomatis untuk tombol WhatsApp umum di header, hero, dan footer.
4. Klik **Publish**.

### B. Mengatur Nomor atau Pesan Khusus per Lini Usaha
1. Buka menu **Ventures**, lalu pilih lini usaha (misalnya **Afisa Bouquet** atau **Nadia Artistry**).
2. **WhatsApp Number Override** (opsional): kosongkan jika ingin tetap memakai nomor utama dari **Site Settings**. Isi angka saja (contoh `62812...`) hanya jika usaha tersebut memakai nomor WhatsApp terpisah.
3. **WhatsApp Message Template**: tulis pesan otomatis yang langsung muncul di WhatsApp ketika pengunjung menekan tombol pemesanan pada lini usaha tersebut.
4. Klik **Publish**.

---

## 4. Mengelola Lini Usaha, Area Layanan, dan Menambah Usaha Baru (FR-02)

Setiap lini usaha memiliki halaman detail sendiri dengan tautan khusus (`/ventures/<slug>`) yang bisa langsung dipasang di bio Instagram masing-masing usaha.

### Mengedit Lini Usaha yang Sudah Ada
1. Klik **Ventures**, lalu pilih nama usaha yang ingin diubah.
2. Beberapa kolom penting:
   - **Display Order**: angka urutan tampil di website (`1` tampil paling awal, lalu `2`, `3`, dst.).
   - **Active**: matikan toggle ini jika ingin menyembunyikan lini usaha sementara tanpa menghapus datanya.
   - **Venture Logo** (opsional): unggah logo khusus lini usaha untuk mengganti logo bawaan.
   - **Category**: label kategori singkat (contoh: `Florist & Custom Bouquet` atau `Makeup Artist`).
   - **Short Description**: ringkasan 1 sampai 2 kalimat untuk kartu direktori di halaman utama.
   - **Full Description**: penjelasan lebih lengkap yang tampil di halaman detail usaha.
   - **Service Area** (opsional): lokasi layanan usaha. Contohnya untuk **Afisa Bouquet** diisi `Samarinda, Kalimantan Timur`. Untuk **Nadia Artistry (MUA)** atau usaha lain yang areanya fleksibel, kolom ini boleh dibiarkan kosong sehingga bagian Area Layanan disembunyikan otomatis.
   - **Instagram URL**: tautan profil Instagram khusus lini usaha tersebut.
   - **External Action Label** & **External Action URL** (opsional): slot khusus untuk tautan layanan tambahan di masa depan. Jika kosong, bagian ini tidak tampil di website.
3. Klik **Publish**.

### Menambah Lini Usaha Baru (Usaha ke-3, ke-4, dan Seterusnya)
1. Di menu **Ventures**, klik ikon **+** (**Create new Venture**).
2. Isi **Venture Name** (nama usaha baru).
3. Pada kolom **Slug**, klik tombol **Generate** agar alamat URL terbentuk otomatis (misalnya `nadia-hampers` akan menjadi `/ventures/nadia-hampers`).
4. Isi **Display Order** (misalnya `3`), pastikan **Active** menyala, lalu lengkapi **Category**, **Short Description**, dan **WhatsApp Message Template**.
5. Klik **Publish**. Usaha baru otomatis muncul di menu navigasi, halaman utama, sitemap, dan langsung memiliki halaman detail sendiri tanpa perlu bantuan developer.

---

## 5. Mengunggah Foto Karya dan Daftar Layanan (FR-04 & FR-05)

1. Buka dokumen lini usaha di menu **Ventures**.
2. **Cover Image**: unggah foto terbaik yang mewakili usaha tersebut untuk sampul di halaman utama dan foto utama di halaman detail.
3. **Service Highlights** (opsional): klik **Add item** untuk menambahkan jenis layanan atau produk unggulan (isi **Title**, lalu **Price Hint** seperti `Mulai Rp 75.000` dan **Note** bila diperlukan).
4. **Showcase Gallery**:
   - Klik **Add item** pada bagian **Showcase Gallery**.
   - Unggah foto karya Anda (disarankan ukuran file di bawah 2 MB agar unggah cepat; Sanity otomatis mengoptimalkan ukuran foto untuk pengunjung).
   - Isi **Caption** dengan nama karya yang jelas (contoh: `Buket Satin Dusty Rose` atau `Soft Glam Wisuda`). Nama ini otomatis ikut masuk ke pesan WhatsApp saat pengunjung menekan tombol **Tanyakan Karya Ini via WhatsApp** di tampilan perbesar (Lightbox).
   - Isi **Tag** singkat bila perlu (contoh: `Buket Wisuda`, `Lamaran`, `Hampers`).
   - Untuk mengubah urutan foto, seret ikon titik di sebelah kiri setiap item galeri.
5. Klik **Publish**.

> Catatan: Selama foto belum diunggah, website tetap tampil rapi menggunakan tampilan placeholder dan menyediakan tombol WhatsApp agar pengunjung tetap bisa meminta katalog terbaru.

---

## 6. Bagaimana Perubahan Tampil di Website Live (FR-06)

- Setiap perubahan hanya tersimpan sebagai draf (*Draft*) sampai Anda menekan tombol **Publish**.
- Begitu Anda menekan **Publish**, website akan memperbarui konten secara otomatis melalui webhook revalidasi (`/api/revalidate`) dan pembaruan berkala (ISR) dalam hitungan detik sampai maksimal 1 menit.
- Jika perubahan belum langsung terlihat di browser HP Anda, cukup muat ulang (*refresh*) halaman satu kali.

---

## 7. Ringkasan Bantuan Cepat

| Situasi | Solusi Cepat |
| :--- | :--- |
| Perubahan sudah diketik tapi belum muncul di website | Pastikan tombol **Publish** sudah diklik (bukan hanya tersimpan sebagai *Draft*), lalu refresh browser. |
| Tombol WhatsApp tidak mengarah ke nomor yang benar | Periksa kolom **Default WhatsApp Number** atau **WhatsApp Number Override**. Pastikan hanya berisi angka diawali `62` tanpa spasi, strip, atau tanda `+`. |
| Bagian wajah atau buket terpotong pada foto | Klik ikon pensil/crop pada foto di Sanity Studio, geser lingkaran **Hotspot** ke titik utama foto, lalu klik **Publish**. |
| Ingin menyembunyikan usaha tanpa menghapus foto-fotonya | Buka usaha di **Ventures**, matikan toggle **Active**, lalu klik **Publish**. |
