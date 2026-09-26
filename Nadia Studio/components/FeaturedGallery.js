'use client';

import { useState } from 'react';
import { ArrowUpRight, Eye, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function FeaturedGallery({ bouquets = [], makeupLooks = [], settings }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'bouquets', 'makeup'
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('bouquet');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Combine curated items with rich metadata
  const curatedBouquets = bouquets.filter(b => b.featured || b.tag?.includes('Favorit') || b.tag?.includes('Best')).slice(0, 4);
  const curatedMakeup = makeupLooks.filter(m => m.featured || m.tag?.includes('Favorit') || m.tag?.includes('Best')).slice(0, 4);

  const allItems = [
    ...curatedBouquets.map(b => ({ ...b, itemType: 'bouquet', studio: 'Afisa Bouquet' })),
    ...curatedMakeup.map(m => ({ ...m, itemType: 'makeup', studio: 'Nadia Artistry' }))
  ];

  const displayItems = activeTab === 'bouquets'
    ? allItems.filter(i => i.itemType === 'bouquet')
    : activeTab === 'makeup'
    ? allItems.filter(i => i.itemType === 'makeup')
    : allItems;

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setModalType(item.itemType);
    setIsModalOpen(true);
  };

  const handleQuickWa = (e, item) => {
    e.stopPropagation();
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: '/',
          meta: { id: item.id, title: item.title, source: 'featured_gallery' }
        })
      }).catch(() => {});
    } catch (err) {}

    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = item.itemType === 'bouquet'
      ? `Halo Nadia & Afisa Bouquet, saya sangat tertarik dengan karya favorit "${item.title}" (${item.price || ''}). Apakah ada slot untuk tanggal [isi tanggal]?`
      : `Halo Nadia Artistry, saya tertarik dengan look favorit "${item.title}". Apakah bisa request look ini untuk tanggal [isi tanggal]?`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* SECTION HEADER - APPLE EDITORIAL */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E5E5EA]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#86868B] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Curated Studio Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            Galeri Karya Terfavorit.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#86868B] max-w-xl leading-relaxed">
            Rangkaian buket paling diminati dan kreasi riasan wajah yang paling sering dipesan oleh wisudawati &amp; klien kami di Samarinda.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F7] rounded-full self-start md:self-auto border border-[#E5E5EA]">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Semua Sorotan ({allItems.length})
          </button>
          <button
            onClick={() => setActiveTab('bouquets')}
            className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${
              activeTab === 'bouquets'
                ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Buket Terlaris
          </button>
          <button
            onClick={() => setActiveTab('makeup')}
            className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${
              activeTab === 'makeup'
                ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Riasan Favorit
          </button>
        </div>
      </div>

      {/* EDITORIAL GALLERY GRID (APPLE PRO PHOTO SHOWCASE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayItems.map((item, index) => {
          const isFeaturedHero = index === 0;
          return (
            <div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              className={`apple-card overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-500 hover:shadow-xl ${
                isFeaturedHero ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Media Frame */}
              <div className={`relative bg-[#F5F5F7] overflow-hidden ${
                isFeaturedHero ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3] sm:aspect-[4/4]'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="bg-white/95 backdrop-blur-md text-[#1D1D1F] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {item.tag || 'Favorit'}
                  </span>

                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20">
                    {item.studio}
                  </span>
                </div>

                {/* Bottom Overlay Info (Appears on Image) */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/80 block font-medium">
                      {item.categoryLabel}
                    </span>
                    <h3 className={`font-semibold tracking-tight text-white mt-0.5 leading-snug drop-shadow-sm ${
                      isFeaturedHero ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {item.price && (
                    <div className="text-right flex-shrink-0">
                      <span className="block text-[9px] uppercase tracking-wider text-white/70">Mulai</span>
                      <span className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm">
                        {item.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover Reveal Quick Action Badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-white/95 text-[#1D1D1F] text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Rincian Karya</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Summary */}
              <div className="p-5 flex items-center justify-between gap-4 bg-white border-t border-[#E5E5EA]">
                <p className="text-xs text-[#86868B] line-clamp-1 flex-1">
                  {item.description || 'Pengerjaan handmade presisi dengan bahan pilihan.'}
                </p>

                <button
                  onClick={(e) => handleQuickWa(e, item)}
                  className="flex-shrink-0 text-xs font-semibold bg-[#F5F5F7] hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"
                  title="Tanya ketersediaan slot via WhatsApp"
                >
                  <span>Tanya WA</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Proof Metric Banner */}
      <div className="mt-12 bg-[#F5F5F7] border border-[#E5E5EA] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-sm flex-shrink-0">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#1D1D1F] block">
              100% Karya Asli Handmade &bull; Workshop Samarinda
            </span>
            <span className="text-[11px] text-[#86868B]">
              Semua buket dan riasan dikerjakan langsung oleh Nadia &amp; Afisa. Bukan barang pabrikan massal.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href={settings?.instagramAfisa || 'https://www.instagram.com/afisabouquet/'}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-link text-xs"
          >
            Feed IG @afisabouquet ↗
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        settings={settings}
        type={modalType}
      />
    </section>
  );
}
