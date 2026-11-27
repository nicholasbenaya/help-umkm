'use client';

import { useState } from 'react';
import { Check, Eye, MessageCircle } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function BouquetCatalog({ initialBouquets = [], initialSettings = null }) {
  const [bouquets] = useState(initialBouquets);
  const [settings] = useState(initialSettings);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBouquet, setSelectedBouquet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'wisuda', label: 'Wisuda & Sempro' },
    { id: 'satin', label: 'Bunga Satin Abadi' },
    { id: 'money', label: 'Money Bouquet' },
    { id: 'snack', label: 'Snack & Chocolate' },
    { id: 'gift', label: 'Gift Box & Parfume' }
  ];

  const filtered = activeCategory === 'all'
    ? bouquets
    : bouquets.filter(b => b.category === activeCategory);

  const openItemDetail = (item) => {
    setSelectedBouquet(item);
    setIsModalOpen(true);
  };

  const handleWaOrder = (item) => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: '/afisabouquet',
          meta: { id: item.id, title: item.title, type: 'bouquet' }
        })
      }).catch(() => {});
    } catch (e) {}

    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = `Halo Nadia & Afisa Bouquet, saya tertarik dengan buket "${item.title}". Boleh minta info pricelist dan cara pemesanannya?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCustomBouquet = () => {
    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = `Halo Nadia & Afisa Bouquet, saya ingin konsultasi request desain buket custom (tema warna / snack / nominal uang). Boleh diskusi sekarang?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C26B76] block mb-2">
          Koleksi Florist &amp; Kado Handmade Samarinda
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#231B1E]">
          Afisa Bouquet
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#635256] max-w-xl mx-auto leading-relaxed">
          Rangkaian buket bunga satin, kawat bulu, buket uang aman, dan aneka kado. Dirangkai buatan tangan oleh Nadia &amp; Afisa untuk wisuda, sempro, serta momen ulang tahun di Samarinda.
        </p>

        {/* Category Filter Pills: min 44px tap target with spacing per antislop-layoutmobile */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#231B1E] text-white shadow-sm'
                  : 'bg-white text-[#231B1E] border border-[#EEDADE] hover:bg-[#FFF5F6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-[#635256] text-xs">
            Belum ada buket pada kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map(item => (
              <div 
                key={item.id}
                className="apple-card overflow-hidden flex flex-col justify-between group"
              >
                {/* Image */}
                <div 
                  className="relative aspect-[4/3] bg-[#FAF6F7] overflow-hidden cursor-pointer"
                  onClick={() => openItemDetail(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-white/95 text-[#231B1E] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-[#231B1E]/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-[#231B1E] tracking-tight group-hover:text-[#C26B76] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#635256] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(item.highlights || []).slice(0, 2).map((h, i) => (
                        <span key={i} className="text-[10px] bg-[#FFF0F2] text-[#A7535E] px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-[#C26B76]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions with full 44x44px tap targets */}
                  <div className="mt-6 pt-4 border-t border-[#F0E2E5] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] text-[#8A787C] uppercase">Estimasi</span>
                      <span className="text-xs font-semibold text-[#C26B76]">
                        {item.price || 'Konsultasi via WA'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openItemDetail(item)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#FAF6F7] text-[#635256] hover:text-[#231B1E] transition-colors"
                        title="Lihat Detail Buket"
                        aria-label={`Lihat detail ${item.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWaOrder(item)}
                        className="min-h-[44px] px-4 bg-[#231B1E] hover:bg-[#C26B76] text-white text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Tanya WA</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner Request Design Custom Bouquet (Em-dash removed per R-02 antislop-copywriting) */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-[#EEDADE] text-center max-w-3xl mx-auto shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26B76] block mb-2">
            Pemesanan Khusus
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-[#231B1E]">
            Atau Mau Request Desain Buket Custom?
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-[#635256] leading-relaxed max-w-xl mx-auto">
            Ingin buket dengan jumlah lembar uang tertentu, snack favorit teman wisuda, atau kombinasi warna kertas wrapping yang unik? Diskusikan sekarang via WhatsApp, kami bantu sesuaikan dengan konsep dan budget Anda.
          </p>
          <button
            type="button"
            onClick={handleCustomBouquet}
            className="mt-6 min-h-[44px] bg-[#C26B76] hover:bg-[#A7535E] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full transition-all shadow-sm inline-flex items-center justify-center"
          >
            Konsultasi Desain &amp; Cek Pricelist via WA
          </button>
        </div>
      </section>

      {/* Panduan Pemesanan Buket */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 pt-16 border-t border-[#EEDADE]">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-[#C26B76] font-semibold">Petunjuk Pemesanan</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#231B1E] mt-1">
            Panduan Pemesanan Buket
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#EEDADE]">
            <h4 className="font-semibold text-sm text-[#231B1E]">Waktu Pemesanan</h4>
            <p className="text-xs text-[#635256] mt-2 leading-relaxed">
              Disarankan memesan minimal H-1 atau H-2 sebelum hari acara agar rangkaian buket selesai dengan rapi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EEDADE]">
            <h4 className="font-semibold text-sm text-[#231B1E]">Kustomisasi Bebas</h4>
            <p className="text-xs text-[#635256] mt-2 leading-relaxed">
              Bebas berkonsultasi warna bunga, tema kertas pembungkus (wrapping), serta nominal uang atau snack.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EEDADE]">
            <h4 className="font-semibold text-sm text-[#231B1E]">Gratis Kartu Ucapan</h4>
            <p className="text-xs text-[#635256] mt-2 leading-relaxed">
              Setiap pesanan buket sudah termasuk kartu ucapan gratis. Teks ucapan dapat Anda tentukan saat memesan.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EEDADE]">
            <h4 className="font-semibold text-sm text-[#231B1E]">Pengambilan &amp; Kirim</h4>
            <p className="text-xs text-[#635256] mt-2 leading-relaxed">
              Pesanan siap diambil di workshop Jl. Revolusi, Samarinda, atau dikirimkan melalui kurir online lokal.
            </p>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      <LightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedBouquet}
        settings={settings}
        type="bouquet"
      />
    </div>
  );
}
