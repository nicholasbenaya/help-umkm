'use client';

import { X, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function LightboxModal({ isOpen, onClose, item, settings, type = 'bouquet' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const phone = settings?.whatsappNumber || '6282154309113';
  const title = item.title || item.name || '';
  const price = item.price || '';

  const waMessage = type === 'bouquet'
    ? `Halo Nadia & Afisa Bouquet, saya tertarik ingin pesan/tanya buket "${title}" (${price}). Apakah masih ada slot untuk tanggal [isi tanggal]?`
    : `Halo Nadia Artistry, saya tertarik dengan riasan look "${title}". Apakah bisa konsultasi jadwal untuk tanggal [isi tanggal]?`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;

  const handleOrderClick = () => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: type === 'bouquet' ? '/afisabouquet' : '/makeup-artist',
          meta: { id: item.id, title, type }
        })
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EEDADE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button: 44x44px tap target per antislop-layoutmobile */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-[#231B1E]/80 hover:bg-[#231B1E] text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#C26B76]"
          aria-label="Tutup rincian"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#FAF6F7]">
            <img 
              src={item.image} 
              alt={title}
              className="w-full h-full object-cover" 
            />
            {item.tag && (
              <span className="absolute top-4 left-4 bg-white/95 text-[11px] font-semibold text-[#231B1E] px-2.5 py-1 rounded-full shadow-sm">
                {item.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#C26B76] font-semibold">
                {item.categoryLabel || item.category || 'Koleksi Studio'}
              </span>
              <h3 className="font-semibold text-xl text-[#231B1E] tracking-tight mt-1">
                {title}
              </h3>
              {price && (
                <div className="mt-2 text-sm font-semibold text-[#C26B76]">
                  {price}
                </div>
              )}

              <p className="mt-4 text-xs text-[#635256] leading-relaxed">
                {item.description || 'Pengerjaan buatan tangan dengan bahan berkualitas rapi.'}
              </p>

              {/* Highlights */}
              {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-semibold text-[#231B1E] uppercase tracking-wider block">
                    Keunggulan:
                  </span>
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#635256]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C26B76] flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#F0E2E5]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOrderClick}
                className="w-full min-h-[44px] py-3 bg-[#231B1E] hover:bg-[#C26B76] text-white rounded-full text-xs font-semibold flex items-center justify-center transition-all shadow-sm"
              >
                Tanya Ketersediaan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
