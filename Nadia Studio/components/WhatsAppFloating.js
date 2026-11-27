'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppFloating({ settings }) {
  const pathname = usePathname();

  // Jangan tampilkan di halaman kelola internal
  if (
    pathname.startsWith('/admin') || 
    pathname.startsWith('/studio-admin') || 
    pathname.startsWith('/kelola-studio')
  ) {
    return null;
  }

  const phone = settings?.whatsappNumber || '6282154309113';

  let defaultMsg = 'Halo Nadia, saya ingin bertanya mengenai layanan Nadia Studio (Afisa Bouquet / Nadia Artistry).';
  let label = 'Tanya Kami';

  if (pathname.startsWith('/afisabouquet')) {
    defaultMsg = 'Halo Nadia & Afisa Bouquet, saya ingin bertanya / pesan buket untuk acara tanggal [isi tanggal]. Apakah ada slot?';
    label = 'Pesan Buket';
  } else if (pathname.startsWith('/makeup-artist')) {
    defaultMsg = 'Halo Nadia Artistry, saya ingin tanya ketersediaan jadwal rias untuk acara [Wisuda/Lamaran/Wedding/Pelatihan] pada tanggal [isi tanggal].';
    label = 'Tanya MUA';
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
      aria-label={`Chat WhatsApp Nadia Studio: ${label}`}
      className="fixed bottom-6 right-6 z-40 min-h-[44px] min-w-[44px] bg-[#231B1E] hover:bg-[#C26B76] text-white py-2.5 px-4 rounded-full shadow-lg border border-white/20 flex items-center gap-2 transition-all duration-200 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#C26B76]"
    >
      <MessageCircle className="w-4 h-4 text-emerald-400" />
      <span className="text-xs font-medium tracking-tight text-white">
        {label}
      </span>
    </a>
  );
}
