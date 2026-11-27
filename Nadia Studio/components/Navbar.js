'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ settings }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const phone = settings?.whatsappNumber || '6282154309113';
  const displayPhone = settings?.whatsappDisplay || '0821-5430-9113';

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Halo Nadia, saya ingin bertanya tentang layanan Nadia Studio (Afisa Bouquet / Nadia Artistry).')}`;

  const trackWaClick = (source) => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: pathname,
          meta: { source: `navbar_${source}` }
        })
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <>
      {/* Top subtle announcement if active */}
      {settings?.isAnnouncementActive && settings?.announcement && (
        <div className="bg-[#231B1E] text-[#FDF8F9] text-[11px] sm:text-xs py-2 px-4 text-center font-normal tracking-tight">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
            <span>{settings.announcement}</span>
            <Link 
              href="/afisabouquet" 
              className="text-[#C26B76] hover:underline font-medium ml-1"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 apple-glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#C26B76] text-white flex items-center justify-center font-serif text-sm font-semibold tracking-tighter shadow-sm">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs tracking-tight text-[#231B1E]">
                NADIA STUDIO
              </span>
              <span className="text-[10px] text-[#635256] tracking-wide">
                Buket &amp; Rias Samarinda
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#231B1E]/80">
            <Link 
              href="/" 
              className={`transition-colors hover:text-[#C26B76] ${pathname === '/' ? 'text-[#C26B76] font-semibold' : ''}`}
            >
              Beranda
            </Link>

            <Link 
              href="/afisabouquet" 
              className={`transition-colors hover:text-[#C26B76] flex items-center gap-1.5 ${pathname.startsWith('/afisabouquet') ? 'text-[#C26B76] font-semibold' : ''}`}
            >
              <span>Afisa Bouquet</span>
              <span className="text-[10px] bg-[#FFF0F2] text-[#C26B76] px-1.5 py-0.5 rounded font-medium">
                by Nadia &amp; Afisa
              </span>
            </Link>

            <Link 
              href="/makeup-artist" 
              className={`transition-colors hover:text-[#C26B76] flex items-center gap-1.5 ${pathname.startsWith('/makeup-artist') ? 'text-[#C26B76] font-semibold' : ''}`}
            >
              <span>Nadia Artistry (MUA)</span>
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWaClick('desktop')}
              className="text-xs bg-[#231B1E] hover:bg-[#C26B76] text-white font-medium px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              Hubungi WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button: Labeled and >= 44x44px per antislop-layoutmobile */}
          <button 
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 text-[#231B1E] rounded-xl hover:bg-[#FFF5F6] border border-[#EEDADE] transition-colors"
            aria-label={mobileOpen ? 'Tutup navigasi' : 'Buka menu navigasi'}
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#C26B76]" /> : <Menu className="w-5 h-5 text-[#231B1E]" />}
            <span className="text-xs font-semibold">{mobileOpen ? 'Tutup' : 'Menu'}</span>
          </button>
        </div>

        {/* Mobile Dropdown with 44px tap targets */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#EEDADE] bg-white px-5 py-4 space-y-2 shadow-lg">
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[44px] text-sm font-medium text-[#231B1E] px-2 rounded-lg hover:bg-[#FFF5F6]"
            >
              Beranda
            </Link>
            <Link 
              href="/afisabouquet" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between min-h-[44px] text-sm font-medium text-[#231B1E] px-2 rounded-lg hover:bg-[#FFF5F6]"
            >
              <span>Afisa Bouquet</span>
              <span className="text-[10px] bg-[#FFF0F2] text-[#C26B76] px-2 py-0.5 rounded font-semibold">
                by Nadia &amp; Afisa
              </span>
            </Link>
            <Link 
              href="/makeup-artist" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[44px] text-sm font-medium text-[#231B1E] px-2 rounded-lg hover:bg-[#FFF5F6]"
            >
              Nadia Artistry (MUA)
            </Link>

            <div className="pt-3 border-t border-[#EEDADE]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWaClick('mobile');
                  setMobileOpen(false);
                }}
                className="w-full min-h-[44px] bg-[#231B1E] hover:bg-[#C26B76] text-white rounded-xl text-center text-xs font-semibold flex items-center justify-center shadow-sm transition-colors"
              >
                Chat WhatsApp ({displayPhone})
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
