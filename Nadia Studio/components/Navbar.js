'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

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
        <div className="bg-[#1D1D1F] text-[#F5F5F7] text-[11px] sm:text-xs py-2 px-4 text-center font-normal tracking-tight">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
            <span>{settings.announcement}</span>
            <Link 
              href="/afisabouquet" 
              className="text-[#0071E3] hover:underline inline-flex items-center gap-0.5 ml-1"
            >
              Lihat Katalog <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 apple-glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 py-3 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-serif text-sm font-semibold tracking-tighter">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs tracking-tight text-[#1D1D1F]">
                NADIA STUDIO
              </span>
              <span className="text-[9px] text-[#86868B] tracking-wider uppercase">
                Creative Ventures
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Apple-style minimal) */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#1D1D1F]/70">
            <Link 
              href="/" 
              className={`transition-colors hover:text-[#1D1D1F] ${pathname === '/' ? 'text-[#1D1D1F] font-semibold' : ''}`}
            >
              Overview
            </Link>

            <Link 
              href="/afisabouquet" 
              className={`transition-colors hover:text-[#1D1D1F] flex items-center gap-1.5 ${pathname.startsWith('/afisabouquet') ? 'text-[#1D1D1F] font-semibold' : ''}`}
            >
              <span>Afisa Bouquet</span>
              <span className="text-[10px] bg-[#FAF0F2] text-[#B86A73] px-1.5 py-0.2 rounded font-medium">
                by Nadia & Afisa
              </span>
            </Link>

            <Link 
              href="/makeup-artist" 
              className={`transition-colors hover:text-[#1D1D1F] flex items-center gap-1.5 ${pathname.startsWith('/makeup-artist') ? 'text-[#1D1D1F] font-semibold' : ''}`}
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
              className="text-xs bg-[#1D1D1F] hover:bg-[#000000] text-white font-medium px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Hubungi WA</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-[#1D1D1F] rounded-lg hover:bg-black/5"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E5EA] bg-white/95 backdrop-blur-xl px-5 py-5 space-y-4">
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[#1D1D1F] py-1"
            >
              Overview
            </Link>
            <Link 
              href="/afisabouquet" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-[#1D1D1F] py-1"
            >
              <span>Afisa Bouquet</span>
              <span className="text-[10px] bg-[#FAF0F2] text-[#B86A73] px-2 py-0.5 rounded font-semibold">
                by Nadia & Afisa
              </span>
            </Link>
            <Link 
              href="/makeup-artist" 
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[#1D1D1F] py-1"
            >
              Nadia Artistry (MUA)
            </Link>

            <div className="pt-3 border-t border-[#E5E5EA]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWaClick('mobile');
                  setMobileOpen(false);
                }}
                className="w-full py-2.5 bg-[#1D1D1F] text-white rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Chat WhatsApp ({displayPhone})</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
