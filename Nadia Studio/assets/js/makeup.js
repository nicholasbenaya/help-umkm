/**
 * Nadia Artistry - Makeup Artist Portfolio & Services Logic
 */

const MAKEUP_GALLERY = [
  {
    id: 1,
    title: 'Soft Glam Graduation Look',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Yudisium',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Riasan glowing natural dengan eye makeup lembut bernuansa peach-champagne, tahan seharian di bawah terik matahari & acara wisuda.',
    tag: 'Favorite Wisuda'
  },
  {
    id: 2,
    title: 'Flawless Radiant Engagement Look',
    category: 'engagement',
    categoryLabel: 'Engagement & Lamaran',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Complexion flawless velvet dengan teknik baking tahan luntur, bulu mata 3D bertingkat lembut, dan lipstik nude mauve elegan.',
    tag: 'Best Seller'
  },
  {
    id: 3,
    title: 'Traditional & Modern Akad Nikah',
    category: 'wedding',
    categoryLabel: 'Akad & Wedding',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Tampilan pangling elegan untuk hari sakral, dipercantik ronce melati/aksesoris hijab, serta complexion full coverage anti-crack.',
    tag: 'Eksklusif Wedding'
  },
  {
    id: 4,
    title: 'Editorial Outdoor Prewedding Glam',
    category: 'engagement',
    categoryLabel: 'Prewedding',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Makeup tahan keringat & waterproof untuk sesi foto outdoor maupun indoor studio. Menghasilkan dimensi wajah yang tajam di depan kamera.',
    tag: 'Photoshoot Ready'
  },
  {
    id: 5,
    title: 'Night Party & Bridesmaid Glam',
    category: 'party',
    categoryLabel: 'Party & Event',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Gaya riasan berani dengan sentuhan shimmer smokey eyes dan lipstik berani untuk menghadiri gala dinner, prom night, atau kondangan.',
    tag: 'Modern Glam'
  },
  {
    id: 6,
    title: 'Clean Girl Soft Glowing Look',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Sempro',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80',
    description: 'Tampilan effortless seperti "kulit kedua yang bercahaya", cocok untuk foto ijazah, sidang yudisium, atau acara wisuda indoor santai.',
    tag: 'Trending Look'
  }
];

// MUA Service Packages
const MAKEUP_PACKAGES = [
  {
    name: 'Graduation / Wisuda Package',
    badge: 'Paling Populer',
    price: 'Mulai Rp 200.000',
    features: [
      'Flawless HD Makeup (Tahan 12+ jam)',
      'Include Hijab Do / Hair Styling',
      'Free Softlens & Premium False Eyelashes',
      'Free Mini Touch-up Kit (Bedak + Lip Sample)',
      'Bisa Home Service (Samarinda & sekitarnya)'
    ],
    waMessage: 'Halo Kak Nadia Artistry, saya mau booking/tanya jadwal Makeup Wisuda untuk tanggal [isi tanggal] di [lokasi]. Apakah masih ada slot?'
  },
  {
    name: 'Engagement / Lamaran Package',
    badge: 'Rekomendasi',
    price: 'Mulai Rp 350.000',
    features: [
      'Complexion Luxury Glowing Anti-Crack',
      'High-Definition Contour & Shading',
      'Hairdo / Hijab Styling Bertekstur Modern',
      'Free Pemasangan Headpiece / Aksesoris',
      'Full Touch-up Kit & Konsultasi Look'
    ],
    waMessage: 'Halo Kak Nadia Artistry, saya ingin konsultasi dan booking Makeup Lamaran / Engagement untuk tanggal [isi tanggal]. Boleh info slotnya?'
  },
  {
    name: 'Akad Nikah / Wedding Package',
    badge: 'Paket Eksklusif',
    price: 'Konsultasi via WA',
    features: [
      'Pangling & Flawless Full Coverage',
      'Skin Prep Premium (Serum & Masker Eksklusif)',
      'Hairdo / Hijab Pengantin + Ronce Melati',
      'Pendampingan Touch-up selama acara',
      'Free Makeup untuk Ibu Pengantin (Opsional)'
    ],
    waMessage: 'Halo Kak Nadia Artistry, saya ingin konsultasi dan tanya pricelist Makeup Akad Nikah / Wedding untuk tanggal [isi tanggal].'
  },
  {
    name: 'Paket Kombo All-in-One (MUA + Buket)',
    badge: '✨ Best Value Combo',
    price: 'Hemat Bundling Spesial',
    isCombo: true,
    features: [
      'Makeup Wisuda / Engagement by Nadia Artistry',
      'Buket Cantik Custom by Afisa Bouquet',
      '1x Booking untuk 2 Kebutuhan Sekaligus',
      'Buket Diantar Bersamaan / Diambil Saat Rias',
      'Harga Lebih Hemat dibanding pesan terpisah'
    ],
    waMessage: 'Halo Kak Nadia! Saya mau pesan "Paket Kombo Spesial (Makeup Nadia Artistry + Buket Afisa Bouquet)" untuk acara tanggal [isi tanggal]. Boleh minta detailnya?'
  }
];

// Customer Testimonials
const MAKEUP_TESTIMONIALS = [
  {
    name: 'Adelia Putri, S.Farm',
    role: 'Wisudawati Universitas Mulawarman',
    text: 'Makeup wisudaku tahan dari subuh jam 5 sampai sore jam 4! Panas-panasan foto di luar gedung sama sekali nggak cakey ataupun luntur. Ditambah buket wisuda dari Afisa Bouquet juga serasi banget. Puas banget!'
  },
  {
    name: 'Nabila Zahra',
    role: 'Klien Lamaran / Engagement',
    text: 'Kak Nadia teliti banget pas ngerjain complexion. Hasilnya bener-bener halus dan flawless, banyak keluarga yang muji riasannya pangling tapi tetap natural. Makasih banyak Kak Nadia!'
  },
  {
    name: 'Vivi Andriani',
    role: 'Bridesmaid & Party Event',
    text: 'Hairdo dan makeup-nya rapi banget. Produk yang dipakai higienis dan wangi. Bakal selalu jadi langganan setiap ada acara penting!'
  }
];

/**
 * Render Gallery Look
 */
function renderMakeupGallery(filter = 'all') {
  const container = document.getElementById('makeupGalleryGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? MAKEUP_GALLERY 
    : MAKEUP_GALLERY.filter(m => m.category === filter);

  container.innerHTML = filtered.map(item => {
    const waMessage = `Halo Kak Nadia Artistry, saya sangat suka referensi riasan "${item.title}". Apakah bisa request look seperti ini untuk acara saya pada tanggal [isi tanggal]?`;
    return `
      <div class="glass-card rounded-2xl overflow-hidden hover-lift flex flex-col group border border-stone-200/80 transition-all duration-300">
        <div class="relative overflow-hidden aspect-[3/4] bg-stone-100 cursor-pointer" onclick="openLightbox('${item.image}', '${item.title}', '${item.categoryLabel}', 'Booking Jadwal Rias', '${waMessage}')">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
          <div class="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="bg-white/90 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow backdrop-blur-sm flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              Lihat Detail Look
            </span>
          </div>
          <span class="absolute top-3 left-3 bg-amber-500/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
            ${item.tag}
          </span>
          <span class="absolute top-3 right-3 bg-stone-900/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm">
            ${item.categoryLabel}
          </span>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-lg font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
              ${item.title}
            </h3>
            <p class="text-stone-500 text-xs mt-2 leading-relaxed">
              ${item.description}
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span class="text-xs text-amber-800 font-medium">Samarinda & Sekitarnya</span>
            <a 
              href="${createWhatsAppUrl(waMessage)}" 
              target="_blank" 
              class="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              Request Look Ini
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterMakeupGallery(cat) {
  const buttons = document.querySelectorAll('.mua-filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === cat) {
      btn.classList.add('bg-stone-900', 'text-amber-300', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-600', 'hover:bg-amber-50');
    } else {
      btn.classList.remove('bg-stone-900', 'text-amber-300', 'shadow-md');
      btn.classList.add('bg-white', 'text-stone-600', 'hover:bg-amber-50');
    }
  });

  renderMakeupGallery(cat);
}

/**
 * Render Packages
 */
function renderMakeupPackages() {
  const container = document.getElementById('makeupPackagesGrid');
  if (!container) return;

  container.innerHTML = MAKEUP_PACKAGES.map(pkg => {
    const isCombo = pkg.isCombo;
    const cardBg = isCombo 
      ? 'bg-gradient-to-br from-amber-50/90 via-rose-50/80 to-white border-2 border-amber-400/80 shadow-lg' 
      : 'glass-card border border-stone-200/80';

    return `
      <div class="${cardBg} rounded-3xl p-6 flex flex-col justify-between hover-lift relative overflow-hidden">
        ${isCombo ? '<div class="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-rose-400 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-sm">Kolaborasi Spesial</div>' : ''}
        <div>
          <span class="inline-block text-xs font-semibold px-3 py-1 rounded-full ${isCombo ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'} mb-3">
            ${pkg.badge}
          </span>
          <h3 class="font-serif text-xl font-bold text-stone-900">${pkg.name}</h3>
          <div class="mt-3 mb-6">
            <span class="text-2xl font-bold text-stone-900">${pkg.price}</span>
          </div>

          <ul class="space-y-2.5 text-xs text-stone-600 mb-6">
            ${pkg.features.map(f => `
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <a 
          href="${createWhatsAppUrl(pkg.waMessage)}" 
          target="_blank" 
          class="w-full text-center py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            isCombo 
              ? 'bg-gradient-to-r from-amber-600 to-[#D9777F] hover:from-amber-700 hover:to-[#B5525B] text-white' 
              : 'bg-stone-900 hover:bg-stone-800 text-white'
          }"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
          ${isCombo ? 'Booking Paket Kombo' : 'Booking Jadwal Rias'}
        </a>
      </div>
    `;
  }).join('');
}

// Testimonials
function renderMakeupTestimonials() {
  const container = document.getElementById('makeupTestimonialsGrid');
  if (!container) return;

  container.innerHTML = MAKEUP_TESTIMONIALS.map(t => `
    <div class="glass-card p-6 rounded-2xl border border-stone-200/60 flex flex-col justify-between hover-lift">
      <div>
        <div class="flex text-amber-500 gap-1 mb-3">
          ★★★★★
        </div>
        <p class="text-stone-700 italic text-sm leading-relaxed">"${t.text}"</p>
      </div>
      <div class="mt-5 pt-4 border-t border-stone-100">
        <h4 class="font-serif font-bold text-stone-900 text-sm">${t.name}</h4>
        <span class="text-xs text-amber-700 font-medium">${t.role}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMakeupGallery('all');
  renderMakeupPackages();
  renderMakeupTestimonials();
});
