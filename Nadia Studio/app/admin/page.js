'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  Sparkles, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUpRight, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Eye, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState('overview'); // overview, bouquets, makeup, settings

  const [analytics, setAnalytics] = useState(null);
  const [bouquets, setBouquets] = useState([]);
  const [makeupData, setMakeupData] = useState({ looks: [], packages: [] });
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bouquet Form Modal state
  const [bouquetModalOpen, setBouquetModalOpen] = useState(false);
  const [editingBouquet, setEditingBouquet] = useState(null);
  const [bouquetForm, setBouquetForm] = useState({
    title: '',
    category: 'satin',
    categoryLabel: 'Bunga Satin',
    price: '',
    tag: 'Best Seller',
    status: 'available',
    image: '',
    description: '',
    highlights: ''
  });

  // Look Form Modal state
  const [lookModalOpen, setLookModalOpen] = useState(false);
  const [editingLook, setEditingLook] = useState(null);
  const [lookForm, setLookForm] = useState({
    title: '',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Sempro',
    image: '',
    description: '',
    tag: 'Look Favorit'
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: '',
    whatsappDisplay: '',
    contactName: '',
    announcement: '',
    isAnnouncementActive: true,
    address: '',
    adminPin: ''
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'valid') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPinError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_session', 'valid');
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setPinError(data.error || 'PIN tidak valid');
      }
    } catch (err) {
      setPinError('Gagal memverifikasi PIN.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, bouquetsRes, makeupRes, settingsRes] = await Promise.all([
        fetch('/api/analytics').then(r => r.json()),
        fetch('/api/bouquets').then(r => r.json()),
        fetch('/api/makeup').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes.data);
      if (bouquetsRes.success) setBouquets(bouquetsRes.data);
      if (makeupRes.success) setMakeupData(makeupRes.data);
      if (settingsRes.success) {
        setSettings(settingsRes.data);
        setSettingsForm(settingsRes.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Bouquet CRUD Handlers
  const openNewBouquetModal = () => {
    setEditingBouquet(null);
    setBouquetForm({
      title: '',
      category: 'satin',
      categoryLabel: 'Bunga Satin',
      price: 'Rp 65.000',
      tag: 'Best Seller',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      description: '',
      highlights: 'Awet selamanya, Free kartu ucapan'
    });
    setBouquetModalOpen(true);
  };

  const openEditBouquetModal = (item) => {
    setEditingBouquet(item);
    setBouquetForm({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      price: item.price,
      tag: item.tag || '',
      status: item.status || 'available',
      image: item.image,
      description: item.description || '',
      highlights: (item.highlights || []).join(', ')
    });
    setBouquetModalOpen(true);
  };

  const handleSaveBouquet = async (e) => {
    e.preventDefault();
    const payload = {
      ...bouquetForm,
      highlights: bouquetForm.highlights.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingBouquet) {
      // Update
      const res = await fetch(`/api/bouquets/${editingBouquet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setBouquets(bouquets.map(b => b.id === editingBouquet.id ? data.data : b));
        setBouquetModalOpen(false);
      }
    } else {
      // Create
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setBouquets([data.data, ...bouquets]);
        setBouquetModalOpen(false);
      }
    }
  };

  const handleDeleteBouquet = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buket ini?')) return;
    const res = await fetch(`/api/bouquets/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setBouquets(bouquets.filter(b => b.id !== id));
    }
  };

  // Makeup Look CRUD Handlers
  const openNewLookModal = () => {
    setEditingLook(null);
    setLookForm({
      title: '',
      category: 'wisuda',
      categoryLabel: 'Wisuda & Sempro',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      description: '',
      tag: 'Look Favorit'
    });
    setLookModalOpen(true);
  };

  const openEditLookModal = (item) => {
    setEditingLook(item);
    setLookForm({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      image: item.image,
      description: item.description || '',
      tag: item.tag || ''
    });
    setLookModalOpen(true);
  };

  const handleSaveLook = async (e) => {
    e.preventDefault();
    if (editingLook) {
      const res = await fetch(`/api/makeup/${editingLook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lookForm)
      });
      const data = await res.json();
      if (data.success) {
        setMakeupData({
          ...makeupData,
          looks: makeupData.looks.map(l => l.id === editingLook.id ? data.data : l)
        });
        setLookModalOpen(false);
      }
    } else {
      const res = await fetch('/api/makeup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lookForm)
      });
      const data = await res.json();
      if (data.success) {
        setMakeupData({
          ...makeupData,
          looks: [data.data, ...makeupData.looks]
        });
        setLookModalOpen(false);
      }
    }
  };

  const handleDeleteLook = async (id) => {
    if (!confirm('Hapus look riasan ini?')) return;
    const res = await fetch(`/api/makeup/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setMakeupData({
        ...makeupData,
        looks: makeupData.looks.filter(l => l.id !== id)
      });
    }
  };

  // Settings Handlers
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaved(false);
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsForm)
    });
    const data = await res.json();
    if (data.success) {
      setSettings(data.data);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  // ==================== AUTH GATE ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="apple-card max-w-sm w-full p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
            Nadia Studio Admin
          </h2>
          <p className="text-xs text-[#86868B] mt-1.5 mb-6">
            Masukkan PIN keamanan untuk mengelola produk buket, portofolio MUA, dan analitik.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Masukkan PIN (Default: 123456)"
              className="w-full text-center tracking-widest text-lg py-2.5 px-4 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
              autoFocus
            />

            {pinError && (
              <div className="text-xs text-rose-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <p className="text-[10px] text-[#86868B] mt-6">
            PIN default awal: <code>123456</code> (dapat diubah di menu Pengaturan).
          </p>
        </div>
      </div>
    );
  }

  // ==================== MAIN DASHBOARD ====================
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5EA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              Live Production
            </span>
            <span className="text-xs text-[#86868B]">Samarinda</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
            Admin Studio Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="text-xs px-3.5 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] font-medium transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="text-xs px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Apple Style) */}
      <div className="flex border-b border-[#E5E5EA] mt-6 gap-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#1D1D1F] text-[#1D1D1F] font-semibold'
              : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Traffic &amp; Leads</span>
        </button>

        <button
          onClick={() => setActiveTab('bouquets')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'bouquets'
              ? 'border-[#1D1D1F] text-[#1D1D1F] font-semibold'
              : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Katalog Buket ({bouquets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('makeup')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'makeup'
              ? 'border-[#1D1D1F] text-[#1D1D1F] font-semibold'
              : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Portofolio MUA ({makeupData.looks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'settings'
              ? 'border-[#1D1D1F] text-[#1D1D1F] font-semibold'
              : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan Bisnis</span>
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW & TRAFFIC ================= */}
      {activeTab === 'overview' && (
        <div className="mt-8 space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="apple-card p-6">
              <span className="text-[11px] uppercase font-semibold text-[#86868B]">
                Total Kunjungan Web
              </span>
              <div className="text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-2">
                {analytics?.totalPageviews || 0}
              </div>
              <span className="text-[10px] text-[#86868B] mt-1 block">
                Pageviews tercatat
              </span>
            </div>

            <div className="apple-card p-6">
              <span className="text-[11px] uppercase font-semibold text-[#86868B]">
                Klik Pesan WhatsApp
              </span>
              <div className="text-3xl font-semibold tracking-tight text-emerald-600 mt-2">
                {analytics?.totalWaClicks || 0}
              </div>
              <span className="text-[10px] text-[#86868B] mt-1 block">
                Potensi calon pembeli
              </span>
            </div>

            <div className="apple-card p-6">
              <span className="text-[11px] uppercase font-semibold text-[#86868B]">
                Conversion Rate
              </span>
              <div className="text-3xl font-semibold tracking-tight text-[#0071E3] mt-2">
                {analytics?.conversionRate || '0%'}
              </div>
              <span className="text-[10px] text-[#86868B] mt-1 block">
                Rasio klik WA per visitor
              </span>
            </div>

            <div className="apple-card p-6">
              <span className="text-[11px] uppercase font-semibold text-[#86868B]">
                Total Produk Aktif
              </span>
              <div className="text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-2">
                {bouquets.length + makeupData.looks.length}
              </div>
              <span className="text-[10px] text-[#86868B] mt-1 block">
                Buket &amp; portofolio rias
              </span>
            </div>
          </div>

          {/* Traffic Breakdown & Conversion Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Page Breakdown */}
            <div className="apple-card p-6">
              <h3 className="text-sm font-semibold text-[#1D1D1F]">
                Halaman Paling Sering Dikunjungi
              </h3>
              <div className="mt-4 space-y-3">
                {Object.entries(analytics?.pathCounts || {}).map(([path, count]) => (
                  <div key={path} className="flex items-center justify-between text-xs py-1.5 border-b border-[#E5E5EA] last:border-none">
                    <span className="font-mono text-[#1D1D1F]">{path}</span>
                    <span className="font-semibold text-[#86868B]">{count} views</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrer Breakdown */}
            <div className="apple-card p-6">
              <h3 className="text-sm font-semibold text-[#1D1D1F]">
                Sumber Kunjungan (Referrer)
              </h3>
              <div className="mt-4 space-y-3">
                {Object.entries(analytics?.referrerCounts || {}).map(([ref, count]) => (
                  <div key={ref} className="flex items-center justify-between text-xs py-1.5 border-b border-[#E5E5EA] last:border-none">
                    <span className="text-[#1D1D1F] capitalize">{ref}</span>
                    <span className="font-semibold text-[#86868B]">{count} interaksi</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Top Bouquets Clicked */}
          <div className="apple-card p-6">
            <h3 className="text-sm font-semibold text-[#1D1D1F] mb-4">
              Produk Buket Paling Banyak Ditanyakan via WhatsApp
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E5EA] text-[#86868B]">
                    <th className="pb-3 font-medium">Buket</th>
                    <th className="pb-3 font-medium">Kategori</th>
                    <th className="pb-3 font-medium">Harga</th>
                    <th className="pb-3 font-medium text-right">Total Klik WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA]">
                  {(analytics?.topBouquets || []).map(b => (
                    <tr key={b.id} className="hover:bg-[#F5F5F7]">
                      <td className="py-3 font-medium text-[#1D1D1F] flex items-center gap-2">
                        <img src={b.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <span>{b.title}</span>
                      </td>
                      <td className="py-3 text-[#86868B]">{b.categoryLabel}</td>
                      <td className="py-3 font-semibold text-[#1D1D1F]">{b.price}</td>
                      <td className="py-3 text-right font-bold text-emerald-600">{b.waClicks || 0}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: BOUQUETS CRUD ================= */}
      {activeTab === 'bouquets' && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F]">Katalog Afisa Bouquet</h2>
              <p className="text-xs text-[#86868B]">Kelola buket, ubah harga, dan update status ketersediaan.</p>
            </div>
            <button
              onClick={openNewBouquetModal}
              className="bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Buket</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bouquets.map(b => (
              <div key={b.id} className="apple-card overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] bg-[#F5F5F7]">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {b.tag}
                    </span>
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {b.waClicks || 0} WA clicks
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] uppercase font-semibold text-[#B86A73]">
                      {b.categoryLabel}
                    </span>
                    <h3 className="font-semibold text-base text-[#1D1D1F] mt-1">{b.title}</h3>
                    <p className="text-xs text-[#86868B] mt-1 line-clamp-2">{b.description}</p>
                    <div className="mt-3 font-semibold text-sm text-[#1D1D1F]">{b.price}</div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E5E5EA] mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditBouquetModal(b)}
                    className="p-2 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors"
                    title="Edit Buket"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBouquet(b.id)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus Buket"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MAKEUP CRUD ================= */}
      {activeTab === 'makeup' && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F]">Portofolio &amp; Layanan MUA</h2>
              <p className="text-xs text-[#86868B]">Kelola foto lookbook riasan dan pricelist paket Nadia Artistry.</p>
            </div>
            <button
              onClick={openNewLookModal}
              className="bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Look Riasan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {makeupData.looks.map(l => (
              <div key={l.id} className="apple-card overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[3/4] bg-[#F5F5F7]">
                    <img src={l.image} alt={l.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {l.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase font-semibold text-[#9A7B4F]">
                      {l.categoryLabel}
                    </span>
                    <h3 className="font-semibold text-sm text-[#1D1D1F] mt-1">{l.title}</h3>
                    <p className="text-xs text-[#86868B] mt-1 line-clamp-2">{l.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#E5E5EA] mt-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditLookModal(l)}
                    className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteLook(l.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: SETTINGS ================= */}
      {activeTab === 'settings' && (
        <div className="mt-8 max-w-2xl">
          <div className="apple-card p-8">
            <h2 className="text-lg font-semibold text-[#1D1D1F]">Pengaturan Bisnis Studio</h2>
            <p className="text-xs text-[#86868B] mt-1 mb-6">
              Ubah nomor WhatsApp, teks pengumuman promo, dan PIN login secara instan tanpa perlu menyentuh kode program.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                    Nomor WhatsApp (Format: 628...)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full text-xs py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                    Tampilan Nomor (Untuk teks)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappDisplay}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappDisplay: e.target.value })}
                    className="w-full text-xs py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  Teks Pengumuman Promo Atas
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full text-xs py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  Alamat Workshop Samarinda
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full text-xs py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5EA]">
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                  PIN Keamanan Admin Baru (6 Digit)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={settingsForm.adminPin}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                  className="w-48 text-xs py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pengaturan berhasil disimpan!</span>
                </div>
              )}

              <button
                type="submit"
                className="py-2.5 px-6 bg-[#1D1D1F] hover:bg-[#000000] text-white text-xs font-semibold rounded-full shadow-sm transition-all"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: BOUQUET FORM ================= */}
      {bouquetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E5E5EA] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#1D1D1F]">
              {editingBouquet ? 'Edit Data Buket' : 'Tambah Buket Baru'}
            </h3>

            <form onSubmit={handleSaveBouquet} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1">Nama Buket</label>
                <input
                  type="text"
                  required
                  value={bouquetForm.title}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, title: e.target.value })}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Kategori</label>
                  <select
                    value={bouquetForm.category}
                    onChange={(e) => {
                      const labels = {
                        satin: 'Bunga Satin',
                        wisuda: 'Wisuda & Sempro',
                        money: 'Money Bouquet',
                        snack: 'Snack & Chocolate',
                        gift: 'Gift Box & Parfume'
                      };
                      setBouquetForm({
                        ...bouquetForm,
                        category: e.target.value,
                        categoryLabel: labels[e.target.value] || 'Bunga'
                      });
                    }}
                    className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                  >
                    <option value="satin">Bunga Satin</option>
                    <option value="wisuda">Wisuda & Sempro</option>
                    <option value="money">Money Bouquet</option>
                    <option value="snack">Snack & Chocolate</option>
                    <option value="gift">Gift Box & Parfume</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Harga (Teks)</label>
                  <input
                    type="text"
                    required
                    value={bouquetForm.price}
                    onChange={(e) => setBouquetForm({ ...bouquetForm, price: e.target.value })}
                    placeholder="Contoh: Rp 65.000"
                    className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">URL Foto Produk</label>
                <input
                  type="url"
                  required
                  value={bouquetForm.image}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={bouquetForm.description}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, description: e.target.value })}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Highlights (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={bouquetForm.highlights}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, highlights: e.target.value })}
                  placeholder="Awet selamanya, Free kartu ucapan, Wrapping tebal"
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5EA]">
                <button
                  type="button"
                  onClick={() => setBouquetModalOpen(false)}
                  className="py-2 px-4 rounded-xl text-[#86868B] hover:bg-[#F5F5F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[#1D1D1F] hover:bg-[#000000] text-white font-semibold rounded-xl"
                >
                  Simpan Buket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: MAKEUP LOOK FORM ================= */}
      {lookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E5E5EA]">
            <h3 className="text-lg font-semibold text-[#1D1D1F]">
              {editingLook ? 'Edit Look Riasan' : 'Tambah Look Riasan Baru'}
            </h3>

            <form onSubmit={handleSaveLook} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1">Judul Look Riasan</label>
                <input
                  type="text"
                  required
                  value={lookForm.title}
                  onChange={(e) => setLookForm({ ...lookForm, title: e.target.value })}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Kategori Acara</label>
                <select
                  value={lookForm.category}
                  onChange={(e) => {
                    const labels = {
                      wisuda: 'Wisuda & Sempro',
                      engagement: 'Lamaran & Prewed',
                      wedding: 'Akad & Wedding',
                      party: 'Party & Event'
                    };
                    setLookForm({
                      ...lookForm,
                      category: e.target.value,
                      categoryLabel: labels[e.target.value] || 'Wisuda'
                    });
                  }}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                >
                  <option value="wisuda">Wisuda & Sempro</option>
                  <option value="engagement">Lamaran & Prewed</option>
                  <option value="wedding">Akad & Wedding</option>
                  <option value="party">Party & Event</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">URL Foto Look</label>
                <input
                  type="url"
                  required
                  value={lookForm.image}
                  onChange={(e) => setLookForm({ ...lookForm, image: e.target.value })}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={lookForm.description}
                  onChange={(e) => setLookForm({ ...lookForm, description: e.target.value })}
                  className="w-full py-2 px-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#1D1D1F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5EA]">
                <button
                  type="button"
                  onClick={() => setLookModalOpen(false)}
                  className="py-2 px-4 rounded-xl text-[#86868B] hover:bg-[#F5F5F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[#1D1D1F] hover:bg-[#000000] text-white font-semibold rounded-xl"
                >
                  Simpan Look
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
