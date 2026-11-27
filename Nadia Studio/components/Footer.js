import Link from 'next/link';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5EA] text-[#555555] text-xs py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Footnote notes */}
        <div className="pb-8 border-b border-[#E5E5EA] space-y-2 text-[11px] leading-relaxed text-[#555555]">
          <p>
            1. <strong>Afisa Bouquet:</strong> Usaha buket bunga buatan tangan oleh Nadia &amp; Afisa. Pengerjaan dilakukan di workshop Samarinda. Pemesanan kustom disarankan minimal H-1 sebelum acara.
          </p>
          <p>
            2. <strong>Nadia Artistry:</strong> Jasa tata rias wajah dan penataan hijab/rambut oleh Nadia. Melayani home service untuk wilayah Kota Samarinda.
          </p>
          <p>
            3. <strong>Paket Kombo:</strong> Pemesanan rias wisuda dan buket bunga sekaligus dalam satu jadwal agar lebih praktis.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <h4 className="font-semibold text-[#1D1D1F] text-xs mb-3">Layanan</h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link href="/afisabouquet" className="hover:text-[#1D1D1F] transition-colors">
                  Afisa Bouquet (Katalog)
                </Link>
              </li>
              <li>
                <Link href="/makeup-artist" className="hover:text-[#1D1D1F] transition-colors">
                  Nadia Artistry (Portofolio)
                </Link>
              </li>
              <li>
                <Link href="/#bundle" className="hover:text-[#1D1D1F] transition-colors">
                  Paket Kombo Wisuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1D1D1F] text-xs mb-3">Kategori Buket</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link href="/afisabouquet?cat=wisuda" className="hover:text-[#1D1D1F]">Wisuda &amp; Sempro</Link></li>
              <li><Link href="/afisabouquet?cat=satin" className="hover:text-[#1D1D1F]">Bunga Satin</Link></li>
              <li><Link href="/afisabouquet?cat=money" className="hover:text-[#1D1D1F]">Buket Uang</Link></li>
              <li><Link href="/afisabouquet?cat=gift" className="hover:text-[#1D1D1F]">Gift Box &amp; Parfum</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#231B1E] text-xs mb-3">Layanan MUA &amp; Pelatihan</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link href="/makeup-artist" className="hover:text-[#231B1E]">Rias Wisuda &amp; Sempro</Link></li>
              <li><Link href="/makeup-artist" className="hover:text-[#231B1E]">Rias Lamaran &amp; Akad</Link></li>
              <li><Link href="/makeup-artist" className="hover:text-[#C26B76] font-medium">Beauty Class &amp; Pelatihan Sekolah</Link></li>
              <li><Link href="/makeup-artist" className="hover:text-[#231B1E]">Home Service Samarinda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#231B1E] text-xs mb-3">Studio &amp; Kontak</h4>
            <p className="text-[12px] leading-relaxed mb-3 text-[#635256]">
              {settings?.address || 'Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda'}
            </p>
            <div className="flex flex-col gap-1 text-[12px]">
              <a href={settings?.instagramAfisa || 'https://www.instagram.com/afisabouquet/'} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#C26B76]">
                Instagram @afisabouquet
              </a>
              <a href={settings?.instagramNadia || 'https://www.instagram.com/nadiaanfh/'} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#C26B76]">
                Instagram @nadiaanfh
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#E5E5EA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555555]">
          <p>
            Copyright &copy; {currentYear} Nadia Studio. Afisa Bouquet by Nadia &amp; Afisa &bull; Nadia Artistry.
          </p>
          <div className="flex items-center gap-4">
            <span>Samarinda, Kalimantan Timur</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
