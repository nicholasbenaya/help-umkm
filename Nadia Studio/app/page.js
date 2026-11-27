import Link from 'next/link';
import { getCachedSettings, getCachedBouquets, getCachedMakeupLooks } from '@/lib/supabase-service';
import { MapPin, Palette, Clock } from 'lucide-react';
import FeaturedGallery from '@/components/FeaturedGallery';

export const revalidate = 3600; // Cache selama 1 jam, update instan via On-Demand Revalidation

export default async function HomePage() {
  const settings = await getCachedSettings();
  const allBouquets = await getCachedBouquets('all');
  const allMakeup = await getCachedMakeupLooks('all');

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 text-center max-w-4xl mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#555555] block mb-3">
          Studio Buket &amp; Jasa Rias Samarinda
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.12]">
          Buket Bunga Buatan Tangan &amp; Tata Rias di Samarinda
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
          Dua usaha rumahan oleh Nadia dan Afisa: buket bunga untuk wisuda dan perayaan dari <strong className="text-[#1D1D1F] font-medium">Afisa Bouquet</strong>, serta layanan rias wajah wisuda dan acara oleh <strong className="text-[#1D1D1F] font-medium">Nadia Artistry</strong>.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/afisabouquet"
            className="bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all shadow-sm"
          >
            Katalog Afisa Bouquet
          </Link>

          <Link
            href="/makeup-artist"
            className="bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all border border-[#E5E5EA]"
          >
            Portofolio Nadia Artistry
          </Link>
        </div>
      </section>

      {/* Galeri Karya Pilihan */}
      <FeaturedGallery
        bouquets={allBouquets}
        makeupLooks={allMakeup}
        settings={settings}
      />

      {/* Dua Layanan Utama */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#555555] font-semibold">Layanan</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
            Dua Layanan Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Afisa Bouquet */}
          <div className="bg-[#FAF0F2]/50 rounded-3xl border border-[#F0D5DA] p-8 sm:p-10 flex flex-col justify-between hover:border-[#E5B5BD] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B86A73]">
                  Buket &amp; Kado
                </span>
                <span className="text-[10px] bg-white text-[#B86A73] px-2 py-0.5 rounded-full font-medium border border-[#F0D5DA]">
                  by Nadia &amp; Afisa
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-3">
                Afisa Bouquet
              </h2>
              <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                Rangkaian mawar satin, buket kawat bulu (pipe cleaner), buket uang aman tanpa lem atau staples, serta buket snack dan parfum. Siap untuk hadiah wisuda, sempro, dan hari ulang tahun.
              </p>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/10] bg-white shadow-sm border border-[#F0D5DA]">
                <img 
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80" 
                  alt="Katalog Afisa Bouquet" 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0D5DA] flex items-center justify-between">
              <span className="text-xs text-[#635256]">Konsultasi Desain &amp; Custom via WA</span>
              <Link 
                href="/afisabouquet" 
                className="apple-link font-semibold text-xs sm:text-sm hover:underline"
              >
                Buka Katalog Buket
              </Link>
            </div>
          </div>

          {/* Card 2: Nadia Artistry */}
          <div className="bg-[#FAF4F5] rounded-3xl border border-[#EEDADE] p-8 sm:p-10 flex flex-col justify-between hover:border-[#D8BDC2] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26B76]">
                  Jasa Rias (MUA) &amp; Beauty Class
                </span>
                <span className="text-[10px] bg-white text-[#C26B76] px-2 py-0.5 rounded-full font-medium border border-[#EEDADE]">
                  by Nadia
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#231B1E] mt-3">
                Nadia Artistry
              </h2>
              <p className="mt-3 text-sm text-[#635256] leading-relaxed">
                Jasa tata rias wajah wisuda, lamaran, akad nikah, serta <strong>panggilan pengajar Beauty Class &amp; Pelatihan Rias</strong> untuk ekstrakurikuler sekolah, guru, siswi, atau seminar instansi di Samarinda.
              </p>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/10] bg-white shadow-sm border border-[#EEDADE]">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Portofolio Nadia Artistry MUA & Beauty Class" 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EEDADE] flex items-center justify-between">
              <span className="text-xs text-[#635256]">Konsultasi Slot &amp; Pricelist via WA</span>
              <Link 
                href="/makeup-artist" 
                className="apple-link font-semibold text-xs sm:text-sm hover:underline"
              >
                Buka Portofolio &amp; Kelas
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Paket Kombo Wisuda */}
      <section id="bundle" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1D1D1F] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-[#333336]">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#D5C2B0] bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-4">
              Paket Kolaborasi
            </span>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.12]">
              Paket Kombo Wisuda: Rias &amp; Buket Sekaligus
            </h2>

            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
              Pesan jasa rias wisuda dari <strong>Nadia Artistry</strong> sekaligus buket bunga dari <strong>Afisa Bouquet</strong> dalam satu kali pemesanan. Lebih praktis, warna buket bisa disesuaikan dengan kebaya atau toga, dan jadwal penyerahan buket langsung diatur saat proses rias.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Halo Nadia, saya ingin tanya info Paket Kombo Wisuda (Makeup Nadia Artistry + Buket Afisa Bouquet) untuk tanggal [isi tanggal].')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all"
              >
                Tanya Paket Kombo via WhatsApp
              </a>

              <span className="text-xs text-stone-400">
                Mulai Rp 265.000 &bull; Wilayah Kota Samarinda
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Catatan Pelayanan & Workshop */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="apple-card p-6 sm:p-8">
            <MapPin className="w-5 h-5 text-[#1D1D1F] mb-3" />
            <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] tracking-tight">
              Workshop di Samarinda
            </h3>
            <p className="text-xs text-[#555555] mt-2 leading-relaxed">
              Lokasi pengerjaan di Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda. Anda bisa mengambil pesanan langsung di tempat (self-pickup) atau dikirim via ojek online.
            </p>
          </div>

          <div className="apple-card p-6 sm:p-8">
            <Palette className="w-5 h-5 text-[#1D1D1F] mb-3" />
            <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] tracking-tight">
              Pengerjaan Teliti
            </h3>
            <p className="text-xs text-[#555555] mt-2 leading-relaxed">
              Buket dirangkai teliti dengan pilihan warna sesuai permintaan. Pada money bouquet, uang dirawat tanpa staples atau lem agar tetap utuh saat dibongkar.
            </p>
          </div>

          <div className="apple-card p-6 sm:p-8">
            <Clock className="w-5 h-5 text-[#1D1D1F] mb-3" />
            <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] tracking-tight">
              Home Service Area Samarinda
            </h3>
            <p className="text-xs text-[#555555] mt-2 leading-relaxed">
              Untuk rias wisuda, lamaran, atau acara keluarga, perias datang langsung ke alamat rumah atau lokasi acara Anda di Samarinda sehingga Anda tidak perlu repot di pagi hari.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Kontak */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 border border-[#E5E5EA]">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
            Konsultasi Pesanan &amp; Jadwal
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 max-w-lg mx-auto">
            Diskusikan model buket yang Anda inginkan atau tanyakan ketersediaan tanggal rias langsung ke WhatsApp Nadia.
          </p>

          <div className="mt-6">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Halo Nadia, saya ingin bertanya mengenai pesanan buket / jadwal rias.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all shadow-sm"
            >
              Hubungi WhatsApp ({settings.whatsappDisplay})
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
