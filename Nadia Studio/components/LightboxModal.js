'use client';

import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-transform transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1D1D1F]/70 hover:bg-[#1D1D1F] text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#F5F5F7]">
            <img 
              src={item.image} 
              alt={title}
              className="w-full h-full object-cover" 
            />
            {item.tag && (
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#1D1D1F] px-2.5 py-1 rounded-full shadow-sm">
                {item.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#86868B] font-medium">
                {item.categoryLabel || item.category || 'Koleksi Studio'}
              </span>
              <h3 className="font-semibold text-xl text-[#1D1D1F] tracking-tight mt-1">
                {title}
              </h3>
              {price && (
                <div className="mt-2 text-lg font-bold text-[#1D1D1F]">
                  {price}
                </div>
              )}

              <p className="mt-4 text-xs text-[#86868B] leading-relaxed">
                {item.description || 'Pengerjaan teliti handmade dengan bahan berkualitas tinggi dan perhatian penuh pada detail keindahan.'}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="mt-5 space-y-1.5 border-t border-[#E5E5EA] pt-4">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#1D1D1F]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#E5E5EA]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOrderClick}
                className="w-full py-3 px-4 bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <span>Tanya / Pesan via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </a>
              <p className="text-[10px] text-center text-[#86868B] mt-2">
                Pemesanan diproses langsung oleh Nadia di Samarinda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
