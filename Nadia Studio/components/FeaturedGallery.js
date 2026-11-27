'use client';

import { useState } from 'react';
import { Eye, Heart, MessageCircle } from 'lucide-react';
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
      : `Halo Nadia Artistry, saya tertarik dengan look favorit "${item.title}". Apakah bisa konsultasi jadwal untuk tanggal [isi tanggal]?`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EEDADE]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C26B76] block mb-1">
            Galeri Pilihan Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#231B1E]">
            Karya Pilihan Studio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#635256] max-w-xl leading-relaxed">
            Pilihan buket bunga dan hasil riasan yang sering dipesan untuk wisuda, lamaran, dan perayaan di Samarinda.
          </p>
        </div>

        {/* Category Tabs: min 44px tap targets */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-full self-start md:self-auto border border-[#EEDADE]">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`text-xs px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-full font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-[#231B1E] text-white shadow-sm font-semibold'
                : 'text-[#635256] hover:text-[#231B1E]'
            }`}
          >
            Semua ({allItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bouquets')}
            className={`text-xs px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-full font-medium transition-all ${
              activeTab === 'bouquets'
                ? 'bg-[#231B1E] text-white shadow-sm font-semibold'
                : 'text-[#635256] hover:text-[#231B1E]'
            }`}
          >
            Buket Bunga
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('makeup')}
            className={`text-xs px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-full font-medium transition-all ${
              activeTab === 'makeup'
                ? 'bg-[#231B1E] text-white shadow-sm font-semibold'
                : 'text-[#635256] hover:text-[#231B1E]'
            }`}
          >
            Rias Wajah
          </button>
        </div>
      </div>

      {/* Gallery Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayItems.map((item, index) => {
          return (
            <div
              key={`${item.id}-${index}`}
              tabIndex={0}
              role="button"
              onClick={() => handleOpenDetail(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenDetail(item);
                }
              }}
              aria-label={`Lihat karya ${item.title} dari ${item.studio}`}
              className="apple-card overflow-hidden group text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C26B76] focus-visible:outline-none flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#FAF6F7] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Studio badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-white/95 backdrop-blur-sm text-[#231B1E] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {item.studio}
                  </span>
                  {item.tag && (
                    <span className="bg-[#231B1E]/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Subtitle / Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-[#635256] text-[10px] font-medium px-2 py-0.5 rounded-md shadow-sm">
                    {item.categoryLabel || item.category}
                  </span>
                </div>

                {/* Bottom title inside image overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                  <h3 className="font-semibold text-base sm:text-lg tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Hover Quick Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="bg-white text-[#231B1E] text-xs font-semibold px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#C26B76]" />
                    <span>Lihat Rincian</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Summary */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-white border-t border-[#F0E2E5]">
                <p className="text-xs text-[#635256] line-clamp-1 flex-1">
                  {item.description || 'Pengerjaan handmade dengan bahan pilihan.'}
                </p>

                <button
                  type="button"
                  onClick={(e) => handleQuickWa(e, item)}
                  className="flex-shrink-0 min-h-[44px] text-xs font-semibold bg-[#FAF6F7] hover:bg-[#231B1E] text-[#231B1E] hover:text-white px-4 py-2 rounded-full transition-all flex items-center gap-1.5 border border-[#EEDADE]"
                  title="Tanya ketersediaan slot via WhatsApp"
                  aria-label={`Tanya slot WhatsApp untuk ${item.title}`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C26B76]" />
                  <span>Tanya WA</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workshop Note Banner */}
      <div className="mt-12 bg-white border border-[#EEDADE] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF0F2] flex items-center justify-center text-[#C26B76] shadow-sm flex-shrink-0">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#231B1E] block">
              Karya Buatan Tangan &bull; Workshop Samarinda
            </span>
            <span className="text-[11px] text-[#635256]">
              Dikerjakan langsung oleh Nadia &amp; Afisa di workshop Jl. Revolusi, Samarinda.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href={settings?.instagramAfisa || 'https://www.instagram.com/afisabouquet/'}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-link text-xs hover:underline"
          >
            Instagram @afisabouquet
          </a>
        </div>
      </div>

      {/* Detail Modal */}
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
