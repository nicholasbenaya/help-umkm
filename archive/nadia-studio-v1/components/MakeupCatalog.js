'use client';

import { useState } from 'react';
import { Check, Eye, MessageCircle } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function MakeupCatalog({ initialLooks = [], initialPackages = [], initialSettings = null }) {
  const [looks] = useState(initialLooks);
  const [packages] = useState(initialPackages);
  const [settings] = useState(initialSettings);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLook, setSelectedLook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'training', label: 'Kelas & Pelatihan Sekolah' },
    { id: 'wisuda', label: 'Wisuda & Sempro' },
    { id: 'engagement', label: 'Lamaran & Prewed' },
    { id: 'wedding', label: 'Akad & Wedding' },
    { id: 'party', label: 'Party & Event' }
  ];

  const filteredLooks = activeCategory === 'all'
    ? looks
    : looks.filter(m => m.category === activeCategory);

  const openLookDetail = (item) => {
    setSelectedLook(item);
    setIsModalOpen(true);
  };

  const handleBookingWa = (pkg) => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: '/makeup-artist',
          meta: { id: pkg.id, name: pkg.name, type: 'makeup_package' }
        })
      }).catch(() => {});
    } catch (e) {}

    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = `Halo Nadia Artistry, saya tertarik dengan "${pkg.name}". Boleh minta info pricelist lengkap dan ketersediaan slotnya?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCustomConsult = () => {
    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = `Halo Nadia Artistry, saya ingin konsultasi request konsep riasan atau panggilan kelas mengajar. Boleh diskusi sekarang?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C26B76] block mb-2">
          Jasa Rias Wajah &amp; Pengajar Pelatihan Samarinda
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#231B1E]">
          Nadia Artistry
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#635256] max-w-xl mx-auto leading-relaxed">
          Layanan tata rias wisuda, lamaran, akad, serta <strong className="text-[#231B1E] font-medium">Beauty Class / Pengajar Pelatihan Rias</strong> untuk sekolah dan instansi di Samarinda.
        </p>

        {/* Category Filter Pills: min 44px tap target per antislop-layoutmobile */}
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

      {/* Portfolio Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {filteredLooks.length === 0 ? (
          <div className="py-24 text-center text-[#635256] text-xs">
            Belum ada portofolio pada kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLooks.map(item => (
              <div 
                key={item.id}
                className="apple-card overflow-hidden flex flex-col justify-between group"
              >
                <div 
                  className="relative aspect-[3/4] bg-[#FAF6F7] overflow-hidden cursor-pointer"
                  onClick={() => openLookDetail(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-white/95 text-[#231B1E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-[#231B1E]/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base text-[#231B1E] tracking-tight group-hover:text-[#C26B76] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#635256] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0E2E5] flex items-center justify-between">
                    <span className="text-[11px] text-[#635256]">Samarinda</span>
                    <button
                      type="button"
                      onClick={() => openLookDetail(item)}
                      className="min-h-[44px] min-w-[44px] text-xs text-[#C26B76] hover:text-[#231B1E] font-medium inline-flex items-center gap-1 transition-colors"
                      aria-label={`Lihat detail ${item.title}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Showcase Layanan & Pricelist via WhatsApp */}
      <section id="layanan" className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 pt-16 border-t border-[#EEDADE]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-[#C26B76] font-semibold">Daftar Layanan</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#231B1E] mt-1">
            Pilihan Layanan Rias &amp; Kelas
          </h2>
          <p className="text-xs sm:text-sm text-[#635256] mt-2">
            Pricelist resmi dan konsultasi slot jadwal langsung kami informasikan melalui WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <div 
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.isCombo
                  ? 'bg-[#231B1E] text-white border border-[#3A2D31] shadow-lg relative'
                  : 'bg-white border border-[#EEDADE] hover:border-[#D8BDC2]'
              }`}
            >
              <div>
                <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-3 ${
                  pkg.isCombo ? 'bg-white/10 text-[#F2C4CB]' : 'bg-[#FFF0F2] text-[#C26B76]'
                }`}>
                  {pkg.badge}
                </span>

                <h3 className={`text-xl font-semibold tracking-tight ${pkg.isCombo ? 'text-white' : 'text-[#231B1E]'}`}>
                  {pkg.name}
                </h3>

                <div className={`mt-3 text-xs font-semibold tracking-wide ${pkg.isCombo ? 'text-[#F2C4CB]' : 'text-[#C26B76]'}`}>
                  {pkg.price}
                </div>

                <div className="mt-6 space-y-2.5">
                  {(pkg.features || []).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pkg.isCombo ? 'text-[#F2C4CB]' : 'text-[#C26B76]'}`} />
                      <span className={pkg.isCombo ? 'text-stone-300' : 'text-[#635256]'}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleBookingWa(pkg)}
                  className={`w-full min-h-[44px] py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    pkg.isCombo
                      ? 'bg-white hover:bg-[#FAF6F7] text-[#231B1E]'
                      : 'bg-[#231B1E] hover:bg-[#C26B76] text-white'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tanya Pricelist via WA</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Request Design / Custom Concept */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-[#EEDADE] text-center max-w-3xl mx-auto shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26B76] block mb-2">
            Konsultasi Khusus
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-[#231B1E]">
            Atau Ingin Request Konsep Desain &amp; Look Riasan?
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-[#635256] leading-relaxed max-w-xl mx-auto">
            Punya referensi look dari media sosial atau ingin mengundang Nadia sebagai pemateri workshop rias di sekolah Anda? Diskusikan langsung sekarang via WhatsApp.
          </p>
          <button
            type="button"
            onClick={handleCustomConsult}
            className="mt-6 min-h-[44px] bg-[#C26B76] hover:bg-[#A7535E] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full transition-all shadow-sm inline-flex items-center justify-center"
          >
            Konsultasi Konsep &amp; Tanya Pricelist via WA
          </button>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedLook}
        settings={settings}
        type="makeup"
      />
    </div>
  );
}
