'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Eye, Sparkles } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function MakeupArtistPage() {
  const [looks, setLooks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLook, setSelectedLook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/settings').then(res => res.json()),
      fetch('/api/makeup').then(res => res.json())
    ]).then(([settingsRes, makeupRes]) => {
      if (settingsRes.success) setSettings(settingsRes.data);
      if (makeupRes.success) {
        setLooks(makeupRes.data.looks || []);
        setPackages(makeupRes.data.packages || []);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = [
    { id: 'all', label: 'Semua Look' },
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
    const msg = `Halo Nadia Artistry, saya ingin konsultasi/booking "${pkg.name}" untuk acara tanggal [isi tanggal] di [lokasi acara]. Apakah masih ada slot?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pb-24">
      {/* HERO HEADER */}
      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A7B4F] block mb-3">
          Professional Makeup Artist &bull; Samarinda
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1D1D1F]">
          Nadia Artistry.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#86868B] max-w-xl mx-auto leading-relaxed">
          Sentuhan riasan natural glowing dan tahan luntur sepanjang hari. Menampilkan pesona terbaik Anda dalam momen sakral wisuda, pertunangan, dan pernikahan.
        </p>

        {/* Minimal Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PORTFOLIO GRID - APPLE MINIMAL LOOKBOOK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-24 text-center text-[#86868B] text-xs">
            Memuat portofolio riasan...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLooks.map(item => (
              <div 
                key={item.id}
                className="apple-card overflow-hidden flex flex-col justify-between group"
              >
                <div 
                  className="relative aspect-[3/4] bg-[#F5F5F7] overflow-hidden cursor-pointer"
                  onClick={() => openLookDetail(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1D1D1F] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-[#1D1D1F]/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base text-[#1D1D1F] tracking-tight group-hover:text-[#9A7B4F] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#86868B] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E5E5EA] flex items-center justify-between">
                    <span className="text-[11px] text-[#86868B]">Samarinda</span>
                    <button
                      onClick={() => openLookDetail(item)}
                      className="text-xs text-[#1D1D1F] hover:text-[#0071E3] font-medium flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Look</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PRICELIST PACKAGES - APPLE STYLE */}
      <section id="paket" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 pt-16 border-t border-[#E5E5EA]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-wider text-[#9A7B4F] font-semibold">Pricelist Layanan</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
            Pilihan Paket Riasan.
          </h2>
          <p className="text-xs sm:text-sm text-[#86868B] mt-2">
            Seluruh paket sudah mencakup penataan hijab atau rambut dan konsultasi gaya riasan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <div 
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.isCombo
                  ? 'bg-[#1D1D1F] text-white border border-[#333336] shadow-xl relative'
                  : 'bg-white border border-[#E5E5EA] hover:border-[#D2D2D7]'
              }`}
            >
              {pkg.isCombo && (
                <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#9A7B4F] bg-white/10 px-2.5 py-0.5 rounded-full mb-3 self-start">
                  <Sparkles className="w-3 h-3" />
                  Paket Kolaborasi
                </div>
              )}

              <div>
                {!pkg.isCombo && (
                  <span className="inline-block text-[11px] font-medium text-[#86868B] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full mb-3">
                    {pkg.badge}
                  </span>
                )}
                <h3 className={`text-xl font-semibold tracking-tight ${pkg.isCombo ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  {pkg.name}
                </h3>
                <div className={`mt-2 text-2xl font-bold tracking-tight ${pkg.isCombo ? 'text-[#9A7B4F]' : 'text-[#1D1D1F]'}`}>
                  {pkg.price}
                </div>

                <div className="mt-6 space-y-2.5">
                  {(pkg.features || []).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pkg.isCombo ? 'text-[#9A7B4F]' : 'text-emerald-600'}`} />
                      <span className={pkg.isCombo ? 'text-stone-300' : 'text-[#86868B]'}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleBookingWa(pkg)}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
                    pkg.isCombo
                      ? 'bg-white hover:bg-[#F5F5F7] text-[#1D1D1F]'
                      : 'bg-[#1D1D1F] hover:bg-[#000000] text-white'
                  }`}
                >
                  <span>Booking Paket</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
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
