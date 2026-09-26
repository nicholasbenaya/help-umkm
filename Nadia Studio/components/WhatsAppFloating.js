'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppFloating({ settings }) {
  const pathname = usePathname();

  // Don't show in admin area
  if (pathname.startsWith('/admin') || pathname.startsWith('/studio-admin')) return null;

  const phone = settings?.whatsappNumber || '6282154309113';

  let defaultMsg = 'Halo Nadia, saya ingin bertanya mengenai layanan Nadia Studio (Afisa Bouquet / Nadia Artistry).';
  let label = 'Tanya Kami';

  if (pathname.startsWith('/afisabouquet')) {
    defaultMsg = 'Halo Nadia & Afisa Bouquet, saya ingin bertanya / pesan buket untuk acara tanggal [isi tanggal]. Apakah ada slot?';
    label = 'Pesan Buket';
  } else if (pathname.startsWith('/makeup-artist')) {
    defaultMsg = 'Halo Nadia Artistry, saya ingin tanya ketersediaan jadwal rias untuk acara [Wisuda/Lamaran/Wedding] pada tanggal [isi tanggal].';
    label = 'Booking MUA';
  }

  const handleClick = () => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: pathname,
          meta: { source: 'floating_button', page: pathname }
        })
      }).catch(() => {});
    } catch (e) {}
  };

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#1D1D1F] hover:bg-[#000000] text-white py-2.5 px-4 rounded-full shadow-lg border border-white/20 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <MessageCircle className="w-4 h-4 text-emerald-400" />
      <span className="text-xs font-medium tracking-tight text-white/95">
        {label}
      </span>
    </a>
  );
}
