/**
 * Afisa Bouquet Product Data & Showcase Logic
 * Handcrafted with love by Nadia & Afisa
 */

const BOUQUET_PRODUCTS = [
  {
    id: 1,
    title: 'Elegance Rose Satin Bouquet',
    category: 'satin',
    categoryLabel: 'Bunga Satin',
    price: 'Mulai Rp 65.000',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    description: 'Rangkaian mawar satin handmade awet selamanya, dilapisi wrapping premium matte warna blush pink & gold foil rim. Cocok untuk wisuda atau kado anniversary.',
    highlights: ['Awet bertahun-tahun', 'Wrapping premium', 'Free kartu ucapan']
  },
  {
    id: 2,
    title: 'Graduation Teddy & Flower Deluxe',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Sempro',
    price: 'Mulai Rp 95.000',
    tag: 'Favorit Wisuda',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    description: 'Buket wisuda spesial dilengkapi boneka wisuda bertoga, bunga satin premium, serta selempang nama custom. Pilihan paling berkesan untuk sahabat atau pasangan.',
    highlights: ['Boneka toga custom nama', 'Free kartu ucapan', 'Bisa request warna toga']
  },
  {
    id: 3,
    title: 'Luxury Money Bouquet Butterfly',
    category: 'money',
    categoryLabel: 'Money Bouquet',
    price: 'Jasa Mulai Rp 75.000 (+ isi)',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1599730198590-b5305106d6e1?auto=format&fit=crop&w=800&q=80',
    description: 'Buket uang asli (nominal sesuai request) disusun rapi tanpa merusak uang kertas, dipadukan bunga hiasan kawat bulu & ornamen kupu-kupu bercahaya LED.',
    highlights: ['Uang 100% aman (tanpa staples/lem)', 'Bisa tambah lampu LED', 'Request 10 - 50+ lembar']
  },
  {
    id: 4,
    title: 'Sweet Tooth Ferrero & Pocky Snack Bouquet',
    category: 'snack',
    categoryLabel: 'Snack & Chocolate',
    price: 'Mulai Rp 55.000',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    description: 'Kombinasi cokelat Ferrero Rocher, Pocky, dan aneka snack favorit yang disusun estetik dengan wrapping tema pastel atau monokrom.',
    highlights: ['Snack fresh & exp lama', 'Bisa ganti jenis snack', 'Free topper ucapan']
  },
  {
    id: 5,
    title: 'Fluffy Pipe Cleaner Daisy Bouquet',
    category: 'satin',
    categoryLabel: 'Bunga Kawat Bulu',
    price: 'Mulai Rp 45.000',
    tag: 'Unik & Viral',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
    description: 'Bunga kawat bulu (pipe cleaner) bentuk daisy & tulip warna-warni yang super gemas, awet selamanya, dan tidak akan layu.',
    highlights: ['100% Handcrafted', 'Bentuk menggemaskan', 'Tersedia aneka warna pastel']
  },
  {
    id: 6,
    title: 'Hampers Gift Box & Dama Parfume Set',
    category: 'gift',
    categoryLabel: 'Gift Box & Parfume',
    price: 'Mulai Rp 120.000',
    tag: 'Eksklusif',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    description: 'Kotak kado premium berisi rangkaian bunga mini satin, sebotol Dama Parfume beraroma elegan, cokelat, dan kartu ucapan wax seal.',
    highlights: ['Include parfum wangi mewah', 'Hardbox pita premium', 'Siap langsung diberikan']
  },
  {
    id: 7,
    title: 'Grand Pearl Rose Bouquet (Large Size)',
    category: 'satin',
    categoryLabel: 'Bunga Satin',
    price: 'Mulai Rp 150.000',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    description: 'Rangkaian mawar satin jumbo (20-30 tangkai) dihiasi mutiara dan kertas wrapping berlapis Korean-style untuk momen lamaran atau sidang skripsi.',
    highlights: ['Ukuran jumbo mewah', 'Sentuhan aksen mutiara', 'Paling difavoritkan untuk foto']
  },
  {
    id: 8,
    title: 'Mini Graduation Single Rose & Bear',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Sempro',
    price: 'Mulai Rp 35.000',
    tag: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    description: 'Buket single stalk mawar satin dengan boneka mini toga. Sangat cocok untuk kado apresiasi teman sekelas saat sempro atau yudisium.',
    highlights: ['Praktis & terjangkau', 'Pengerjaan cepat', 'Cocok untuk order banyak']
  }
];

// Customer Testimonials Data
const BOUQUET_TESTIMONIALS = [
  {
    name: 'Dinda Rahmawati',
    occasion: 'Wisuda Unmul Samarinda',
    rating: 5,
    text: 'Buket satinnya rapi banget dan bunganya awet banget! Pas foto wisuda warnanya keluar banget dan dapat pujian dari teman-teman. Makasih Kak Nadia & Kak Afisa! ❤️'
  },
  {
    name: 'Rian Saputra',
    occasion: 'Hadiah Anniversary',
    rating: 5,
    text: 'Pesan buket uang + bunga kawat bulu H-1, pengerjaannya cepat dan hasilnya rapi tanpa lecek sedikitpun. Pacar saya suka banget. Recommended florist di Samarinda!'
  },
  {
    name: 'Siti Nurhaliza',
    occasion: 'Sidang Sempro',
    rating: 5,
    text: 'Suka banget sama wrapping-nya yang tebal dan warnanya matching. Free kartu ucapannya juga ditulis tangan dengan estetik. Bakal langganan terus kalau ada acara!'
  }
];

/**
 * Render bouquet cards to DOM
 */
function renderBouquetProducts(filter = 'all') {
  const container = document.getElementById('bouquetProductGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? BOUQUET_PRODUCTS 
    : BOUQUET_PRODUCTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500">
        <p class="text-lg">Belum ada buket di kategori ini.</p>
        <button onclick="filterBouquets('all')" class="mt-3 text-sm text-[#D9777F] underline font-medium">Tampilkan Semua Produk</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const waMessage = `Halo Kak Nadia & Afisa Bouquet, saya ingin pesan/tanya varian buket "${item.title}" (${item.price}). Apakah masih ada slot untuk tanggal [isi tanggal]?`;
    const waLink = createWhatsAppUrl(waMessage);

    return `
      <div class="glass-card rounded-2xl overflow-hidden hover-lift flex flex-col group border border-stone-200/80 transition-all duration-300">
        <!-- Image Container -->
        <div class="relative overflow-hidden aspect-[4/3] bg-stone-100 cursor-pointer" onclick="openLightbox('${item.image}', '${item.title}', '${item.categoryLabel}', '${item.price}', '${waMessage}')">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="bg-white/90 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow backdrop-blur-sm flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              Klik untuk Zoom
            </span>
          </div>
          <!-- Badge Tag -->
          <span class="absolute top-3 left-3 bg-white/95 text-[#B5525B] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
            ${item.tag}
          </span>
          <span class="absolute top-3 right-3 bg-stone-900/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm">
            ${item.categoryLabel}
          </span>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-lg font-bold text-stone-800 group-hover:text-[#D9777F] transition-colors leading-snug">
              ${item.title}
            </h3>
            <p class="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">
              ${item.description}
            </p>

            <!-- Highlights -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              ${item.highlights.map(h => `<span class="text-[10px] bg-rose-50 text-[#9C6B75] px-2 py-0.5 rounded font-medium">✓ ${h}</span>`).join('')}
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
            <div>
              <span class="block text-[11px] text-stone-400 font-medium">Estimasi Harga</span>
              <span class="text-sm font-bold text-stone-900">${item.price}</span>
            </div>

            <a 
              href="${waLink}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition-all transform active:scale-95"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
              Tanya / Pesan
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter handler
 */
function filterBouquets(cat) {
  // Update button active state
  const buttons = document.querySelectorAll('.cat-filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === cat) {
      btn.classList.add('bg-[#B5525B]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-600', 'hover:bg-rose-50');
    } else {
      btn.classList.remove('bg-[#B5525B]', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'text-stone-600', 'hover:bg-rose-50');
    }
  });

  renderBouquetProducts(cat);
}

// Render testimonials
function renderBouquetTestimonials() {
  const container = document.getElementById('bouquetTestimonialGrid');
  if (!container) return;

  container.innerHTML = BOUQUET_TESTIMONIALS.map(t => `
    <div class="glass-card p-6 rounded-2xl border border-stone-200/60 flex flex-col justify-between hover-lift">
      <div>
        <div class="flex text-amber-400 gap-1 mb-3">
          ${'★'.repeat(t.rating)}
        </div>
        <p class="text-stone-700 italic text-sm leading-relaxed">"${t.text}"</p>
      </div>
      <div class="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
        <span class="font-serif font-bold text-stone-900 text-sm">${t.name}</span>
        <span class="text-xs text-[#9C6B75] bg-rose-50 px-2 py-0.5 rounded font-medium">${t.occasion}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderBouquetProducts('all');
  renderBouquetTestimonials();
});
