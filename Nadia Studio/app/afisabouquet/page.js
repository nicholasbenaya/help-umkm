'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Eye } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function AfisaBouquetPage() {
  const [bouquets, setBouquets] = useState([]);
  const [settings, setSettings] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBouquet, setSelectedBouquet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch settings & bouquets
    Promise.all([
      fetch('/api/settings').then(res => res.json()),
      fetch('/api/bouquets').then(res => res.json())
    ]).then(([settingsRes, bouquetsRes]) => {
      if (settingsRes.success) setSettings(settingsRes.data);
      if (bouquetsRes.success) setBouquets(bouquetsRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'wisuda', label: 'Wisuda & Sempro' },
    { id: 'satin', label: 'Bunga Satin Abadi' },
    { id: 'money', label: 'Money Bouquet' },
    { id: 'snack', label: 'Snack & Chocolate' },
    { id: 'gift', label: 'Gift Box & Parfume' }
  ];

  const filtered = activeCategory === 'all'
    ? bouquets
    : bouquets.filter(b => b.category === activeCategory);

  const openItemDetail = (item) => {
    setSelectedBouquet(item);
    setIsModalOpen(true);
  };

  const handleWaOrder = (item) => {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_click',
          path: '/afisabouquet',
          meta: { id: item.id, title: item.title, type: 'bouquet' }
        })
      }).catch(() => {});
    } catch (e) {}

    const phone = settings?.whatsappNumber || '6282154309113';
    const msg = `Halo Nadia & Afisa Bouquet, saya ingin pesan/tanya buket "${item.title}" (${item.price}). Apakah masih ada slot untuk tanggal [isi tanggal]?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pb-24">
      {/* HERO HEADER */}
      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B86A73] block mb-3">
          Handcrafted by Nadia &amp; Afisa &bull; Samarinda
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1D1D1F]">
          Afisa Bouquet.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#86868B] max-w-xl mx-auto leading-relaxed">
          Rangkaian buket estetik berkualitas premium. Dikerjakan dengan dedikasi tinggi agar setiap momen perayaan wisuda dan hari spesial Anda terkenang abadi.
        </p>

        {/* Minimal Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID - APPLE REFINED CARD */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-24 text-center text-[#86868B] text-xs">
            Memuat katalog buket...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-[#86868B] text-xs">
            Belum ada buket pada kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(item => (
              <div 
                key={item.id}
                className="apple-card overflow-hidden flex flex-col justify-between group"
              >
                {/* Image */}
                <div 
                  className="relative aspect-[4/3] bg-[#F5F5F7] overflow-hidden cursor-pointer"
                  onClick={() => openItemDetail(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1D1D1F] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-[#1D1D1F]/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-[#1D1D1F] tracking-tight group-hover:text-[#B86A73] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#86868B] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(item.highlights || []).slice(0, 2).map((h, i) => (
                        <span key={i} className="text-[10px] bg-[#F5F5F7] text-[#1D1D1F] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-[#E5E5EA] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] text-[#86868B] uppercase">Harga</span>
                      <span className="text-sm font-semibold text-[#1D1D1F]">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openItemDetail(item)}
                        className="p-2 rounded-full hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                        title="Lihat Detail"
                        aria-label="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleWaOrder(item)}
                        className="bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-medium px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5"
                      >
                        <span>Pesan</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW TO ORDER (APPLE MINIMAL 4-STEPS) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 pt-16 border-t border-[#E5E5EA]">
        <div className="text-center max-w-lg mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-[#86868B] font-semibold">Alur Pemesanan</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
            Empat Langkah Mudah.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-[#F5F5F7] rounded-2xl">
            <span className="text-xs font-mono text-[#86868B] block mb-2">01</span>
            <h4 className="font-semibold text-sm text-[#1D1D1F]">Pilih Model</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              Tentukan varian dari katalog atau siapkan referensi foto buket impian Anda sendiri.
            </p>
          </div>

          <div className="p-6 bg-[#F5F5F7] rounded-2xl">
            <span className="text-xs font-mono text-[#86868B] block mb-2">02</span>
            <h4 className="font-semibold text-sm text-[#1D1D1F]">Hubungi WhatsApp</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              Klik tombol pesan untuk konsultasi tanggal acara, warna wrapping, dan teks kartu ucapan.
            </p>
          </div>

          <div className="p-6 bg-[#F5F5F7] rounded-2xl">
            <span className="text-xs font-mono text-[#86868B] block mb-2">03</span>
            <h4 className="font-semibold text-sm text-[#1D1D1F]">Konfirmasi &amp; Proses</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              Konfirmasi pembayaran DP. Rangkaian buket akan dirangkai teliti oleh Nadia &amp; Afisa.
            </p>
          </div>

          <div className="p-6 bg-[#F5F5F7] rounded-2xl">
            <span className="text-xs font-mono text-[#86868B] block mb-2">04</span>
            <h4 className="font-semibold text-sm text-[#1D1D1F]">Pengambilan / Kirim</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              Buket siap diambil di workshop Samarinda atau dikirim via kurir langsung ke lokasi.
            </p>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      <LightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedBouquet}
        settings={settings}
        type="bouquet"
      />
    </div>
  );
}
