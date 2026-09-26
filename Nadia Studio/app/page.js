import Link from 'next/link';
import { getSettings, getBouquets, getMakeupLooks } from '@/lib/db';
import { ArrowUpRight, Sparkles, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';
import FeaturedGallery from '@/components/FeaturedGallery';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const settings = getSettings();
  const allBouquets = getBouquets('all');
  const allMakeup = getMakeupLooks('all');

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* HERO SECTION - APPLE MINIMALIST */}
      <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 text-center max-w-4xl mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868B] block mb-4">
          Nadia Studio &bull; Samarinda
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.08]">
          Dua Seni.<br />
          <span className="text-[#86868B]">Satu Dedikasi Berkelas.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#86868B] max-w-2xl mx-auto leading-relaxed font-normal">
          Ruang kreatif bagi keindahan buket bunga handmade dari <strong className="text-[#1D1D1F] font-medium">Afisa Bouquet</strong> dan seni tata rias profesional dari <strong className="text-[#1D1D1F] font-medium">Nadia Artistry</strong>.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/afisabouquet"
            className="bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Katalog Afisa Bouquet</span>
            <ArrowUpRight className="w-4 h-4 text-rose-300" />
          </Link>

          <Link
            href="/makeup-artist"
            className="bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all flex items-center gap-2 border border-[#E5E5EA]"
          >
            <span>Portofolio Nadia Artistry</span>
            <ArrowUpRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>
      </section>

      {/* ELEVATED EDITORIAL GALLERY: KOLEKSI TERFAVORIT */}
      <FeaturedGallery
        bouquets={allBouquets}
        makeupLooks={allMakeup}
        settings={settings}
      />

      {/* TWO PILLARS SHOWCASE - APPLE BENTO GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold">Unit Bisnis</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
            Fokus Layanan Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PILLAR 1: AFISA BOUQUET */}
          <div className="bg-[#FAF0F2]/40 rounded-3xl border border-[#F0D5DA] p-8 sm:p-10 flex flex-col justify-between hover:border-[#E5B5BD] transition-all duration-500">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B86A73]">
                  Florist &amp; Gifts
                </span>
                <span className="text-[10px] bg-white text-[#B86A73] px-2 py-0.5 rounded-full font-medium border border-[#F0D5DA]">
                  by Nadia &amp; Afisa
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-3">
                Afisa Bouquet.
              </h2>
              <p className="mt-3 text-sm text-[#86868B] leading-relaxed">
                Rangkaian buket mawar satin abadi, money bouquet rapi tanpa merusak uang, buket snack lezat, serta kado parfum. Dirangkai presisi untuk wisuda, sempro, dan hari istimewa.
              </p>

              {/* Minimal preview thumbnail */}
              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/10] bg-white shadow-sm border border-[#F0D5DA]">
                <img 
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80" 
                  alt="Afisa Bouquet Showcase" 
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0D5DA] flex items-center justify-between">
              <span className="text-xs text-[#86868B]">Mulai Rp 35.000 &bull; Samarinda</span>
              <Link 
                href="/afisabouquet" 
                className="apple-link font-semibold"
              >
                <span>Jelajahi Buket</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* PILLAR 2: NADIA ARTISTRY */}
          <div className="bg-[#F7F3EE]/50 rounded-3xl border border-[#EADBCE] p-8 sm:p-10 flex flex-col justify-between hover:border-[#D5C2B0] transition-all duration-500">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A7B4F]">
                  Makeup &amp; Hair Styling
                </span>
                <span className="text-[10px] bg-white text-[#9A7B4F] px-2 py-0.5 rounded-full font-medium border border-[#EADBCE]">
                  by Nadia
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-3">
                Nadia Artistry.
              </h2>
              <p className="mt-3 text-sm text-[#86868B] leading-relaxed">
                Tata rias profesional berkonsep glowing natural dan tahan luntur 12+ jam. Melayani makeup wisuda, lamaran, akad nikah, dan event di Samarinda dengan layanan home service.
              </p>

              {/* Minimal preview thumbnail */}
              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/10] bg-white shadow-sm border border-[#EADBCE]">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Nadia Artistry MUA" 
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EADBCE] flex items-center justify-between">
              <span className="text-xs text-[#86868B]">Mulai Rp 200.000 &bull; Include Hair/Hijab</span>
              <Link 
                href="/makeup-artist" 
                className="apple-link font-semibold"
              >
                <span>Lihat Portofolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SPECIAL COMBO SECTION (APPLE DARK CONTRAST CARD) */}
      <section id="bundle" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1D1D1F] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-[#333336]">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9A7B4F] bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Satu Pintu Koordinasi
            </span>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Paket Kombo Wisuda.<br />
              <span className="text-[#86868B]">Makeup &amp; Buket Sekaligus.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#86868B] leading-relaxed">
              Dapatkan riasan wisuda atau lamaran oleh <strong>Nadia Artistry</strong> sekaligus buket cantik dari <strong>Afisa Bouquet</strong> dalam satu kali koordinasi pemesanan. Bebas ribet, warna serasi, dan lebih hemat.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Halo Nadia, saya ingin pesan Paket Kombo Wisuda (Makeup Nadia Artistry + Buket Afisa Bouquet). Boleh minta info slotnya?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all flex items-center gap-2"
              >
                <span>Konsultasi Paket Kombo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-[#86868B]">
                Mulai Rp 265.000 &bull; Slot terbatas per hari
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="apple-card p-8">
            <HeartHandshake className="w-6 h-6 text-[#1D1D1F] mb-4" />
            <h3 className="font-semibold text-lg text-[#1D1D1F] tracking-tight">
              100% Handcrafted
            </h3>
            <p className="text-xs text-[#86868B] mt-2 leading-relaxed">
              Setiap kelopak buket mawar satin dan rangkaian buket uang dirangkai teliti oleh Nadia &amp; Afisa dengan standar presisi tinggi.
            </p>
          </div>

          <div className="apple-card p-8">
            <ShieldCheck className="w-6 h-6 text-[#1D1D1F] mb-4" />
            <h3 className="font-semibold text-lg text-[#1D1D1F] tracking-tight">
              Higienis &amp; Tahan Luntur
            </h3>
            <p className="text-xs text-[#86868B] mt-2 leading-relaxed">
              Peralatan rias steril dan produk berkualitas tinggi. Menjamin complexion tahan 12+ jam tanpa crack sepanjang prosesi wisuda.
            </p>
          </div>

          <div className="apple-card p-8">
            <Clock className="w-6 h-6 text-[#1D1D1F] mb-4" />
            <h3 className="font-semibold text-lg text-[#1D1D1F] tracking-tight">
              Workshop Samarinda
            </h3>
            <p className="text-xs text-[#86868B] mt-2 leading-relaxed">
              Lokasi workshop fisik di Jl. Revolusi, Samarinda. Menyediakan layanan self-pickup, pengiriman kurir lokal, hingga home service MUA.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK WORKSHOP / CONTACT BANNER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 border border-[#E5E5EA]">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
            Ada Pertanyaan Khusus?
          </h3>
          <p className="text-xs sm:text-sm text-[#86868B] mt-2 max-w-lg mx-auto">
            Konsultasikan model buket impian atau tanyakan jadwal makeup secara langsung melalui WhatsApp terpusat Nadia.
          </p>

          <div className="mt-6">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Halo Nadia, saya ingin berkonsultasi mengenai pesanan buket / booking MUA.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
            >
              <span>Chat WhatsApp ({settings.whatsappDisplay})</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
