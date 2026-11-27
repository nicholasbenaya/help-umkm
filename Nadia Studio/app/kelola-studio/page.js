'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  Palette, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Lock, 
  LogOut, 
  Eye, 
  EyeOff,
  CheckCircle2, 
  AlertCircle,
  Shield,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function KelolaStudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('overview'); // overview, bouquets, makeup, settings, security

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
    price: 'Konsultasi Desain & Harga via WA',
    tag: 'Best Seller',
    status: 'available',
    image: '',
    description: '',
    highlights: 'Handmade rapi, Free kartu ucapan'
  });

  // Look & Training Form Modal state
  const [lookModalOpen, setLookModalOpen] = useState(false);
  const [editingLook, setEditingLook] = useState(null);
  const [lookForm, setLookForm] = useState({
    title: '',
    category: 'wisuda',
    categoryLabel: 'Wisuda & Sempro',
    image: '',
    description: '',
    tag: 'Favorit'
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: '',
    whatsappDisplay: '',
    contactName: '',
    announcement: '',
    isAnnouncementActive: true,
    address: ''
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

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('admin_token') || ''}`,
    'x-admin-token': sessionStorage.getItem('admin_token') || ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: usernameInput, 
          password: passwordInput 
        })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_session', 'valid');
        if (data.token) sessionStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setAuthError(data.error || 'Username atau password salah.');
      }
    } catch {
      setAuthError('Gagal menghubungi server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}
    sessionStorage.removeItem('admin_session');
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [bouquetsRes, makeupRes, settingsRes] = await Promise.all([
        fetch('/api/bouquets').then(r => r.json()),
        fetch('/api/makeup').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);

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
      price: 'Konsultasi Desain & Harga via WA',
      tag: 'Koleksi Baru',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      description: '',
      highlights: '100% Buatan tangan, Free kartu ucapan'
    });
    setBouquetModalOpen(true);
  };

  const openEditBouquetModal = (item) => {
    setEditingBouquet(item);
    setBouquetForm({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      price: item.price || 'Konsultasi Desain & Harga via WA',
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
      const res = await fetch(`/api/bouquets/${editingBouquet.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setBouquets(bouquets.map(b => b.id === editingBouquet.id ? data.data : b));
        setBouquetModalOpen(false);
      } else {
        alert(data.error || 'Gagal menyimpan.');
      }
    } else {
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setBouquets([data.data, ...bouquets]);
        setBouquetModalOpen(false);
      } else {
        alert(data.error || 'Gagal membuat buket.');
      }
    }
  };

  const handleDeleteBouquet = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buket ini?')) return;
    const res = await fetch(`/api/bouquets/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders()
    });
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
      category: 'training',
      categoryLabel: 'Kelas & Pelatihan Sekolah',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      description: '',
      tag: 'Layanan Pengajar'
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
        headers: getAuthHeaders(),
        body: JSON.stringify(lookForm)
      });
      const data = await res.json();
      if (data.success) {
        setMakeupData({
          ...makeupData,
          looks: makeupData.looks.map(l => l.id === editingLook.id ? data.data : l)
        });
        setLookModalOpen(false);
      } else {
        alert(data.error || 'Gagal menyimpan.');
      }
    } else {
      const res = await fetch('/api/makeup', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(lookForm)
      });
      const data = await res.json();
      if (data.success) {
        setMakeupData({
          ...makeupData,
          looks: [data.data, ...makeupData.looks]
        });
        setLookModalOpen(false);
      } else {
        alert(data.error || 'Gagal membuat portofolio.');
      }
    }
  };

  const handleDeleteLook = async (id) => {
    if (!confirm('Hapus look atau portofolio ini?')) return;
    const res = await fetch(`/api/makeup/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders()
    });
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
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsForm)
    });
    const data = await res.json();
    if (data.success) {
      setSettings(data.data);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } else {
      alert(data.error || 'Gagal menyimpan pengaturan.');
    }
  };

  // ==================== AUTH GATE ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6F7] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#EEDADE] shadow-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#C26B76] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#231B1E]">
              Portal Pengelola Studio
            </h1>
            <p className="text-xs text-[#635256] mt-2 leading-relaxed">
              Kredensial khusus pemilik untuk mengelola katalog, permintaan jasa rias, dan pelatihan.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFF0F2] border border-[#F2C4CB] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#C26B76] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#A7535E] font-medium leading-relaxed">
                {authError}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#231B1E] mb-1.5">
                Username Pengelola
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="nadiastudio"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#EEDADE] text-sm text-[#231B1E] placeholder-[#9E8B90] focus:outline-none focus:border-[#C26B76] transition-colors bg-[#FCF8F9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#231B1E] mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#EEDADE] text-sm text-[#231B1E] placeholder-[#9E8B90] focus:outline-none focus:border-[#C26B76] transition-colors bg-[#FCF8F9]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A787C] hover:text-[#231B1E]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full mt-2 bg-[#231B1E] hover:bg-[#C26B76] text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <span>Memverifikasi enkripsi...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#F2E4E7] text-center">
            <span className="text-[11px] text-[#8A787C] flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C26B76]" />
              Dilindungi enkripsi PBKDF2 SHA-512 &amp; Rate Limiting
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==================== DASHBOARD UTAMA ====================
  return (
    <div className="min-h-screen bg-[#FAF6F7] pb-24">
      {/* Top Bar Pengelola */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#EEDADE] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#C26B76] text-white flex items-center justify-center font-bold text-sm">
              N
            </span>
            <div>
              <h2 className="text-sm font-semibold text-[#231B1E] leading-none">
                Nadia Studio Management
              </h2>
              <span className="text-[10px] text-[#635256]">Sesi Terenkripsi Aman</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#231B1E] hover:text-[#C26B76] px-3 py-1.5 rounded-lg border border-[#EEDADE] font-medium transition-colors"
            >
              Lihat Web Publik ↗
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-[#C26B76] hover:bg-[#FFF0F2] px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EEDADE] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-[#231B1E] text-white shadow-sm'
                : 'bg-white text-[#231B1E] border border-[#EEDADE] hover:bg-[#FFF5F6]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Ringkasan
          </button>

          <button
            onClick={() => setActiveTab('bouquets')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'bouquets'
                ? 'bg-[#231B1E] text-white shadow-sm'
                : 'bg-white text-[#231B1E] border border-[#EEDADE] hover:bg-[#FFF5F6]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Katalog Buket ({bouquets.length})
          </button>

          <button
            onClick={() => setActiveTab('makeup')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'makeup'
                ? 'bg-[#231B1E] text-white shadow-sm'
                : 'bg-white text-[#231B1E] border border-[#EEDADE] hover:bg-[#FFF5F6]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Portofolio MUA &amp; Pelatihan ({makeupData.looks.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-[#231B1E] text-white shadow-sm'
                : 'bg-white text-[#231B1E] border border-[#EEDADE] hover:bg-[#FFF5F6]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Pengaturan Kontak WA
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-[#EEDADE] shadow-sm">
                <span className="text-xs text-[#635256] font-medium">Total Buket Aktif</span>
                <div className="text-3xl font-bold text-[#231B1E] mt-2">{bouquets.length}</div>
                <span className="text-[11px] text-[#8A787C] mt-1 block">Afisa Bouquet Florist</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#EEDADE] shadow-sm">
                <span className="text-xs text-[#635256] font-medium">Portofolio Rias &amp; Kelas</span>
                <div className="text-3xl font-bold text-[#231B1E] mt-2">{makeupData.looks.length}</div>
                <span className="text-[11px] text-[#8A787C] mt-1 block">Nadia Artistry &amp; Educator</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#EEDADE] shadow-sm">
                <span className="text-xs text-[#635256] font-medium">Strategi WhatsApp Leads</span>
                <div className="text-lg font-semibold text-[#C26B76] mt-2">Konsultasi Desain Aktif</div>
                <span className="text-[11px] text-[#8A787C] mt-1 block">Pricelist dikirim via chat WA</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EEDADE] space-y-4">
              <h3 className="font-semibold text-lg text-[#231B1E]">
                Status Strategi Pemasaran UMKM
              </h3>
              <p className="text-xs text-[#635256] leading-relaxed max-w-3xl">
                Website ini dirancang menggunakan pendekatan <strong>Lead Generation via WhatsApp</strong>. 
                Pengunjung tidak melihat angka pricelist kaku di depan agar tidak ragu bertanya. Tombol pada setiap buket dan layanan riasan langsung mengarahkan calon pelanggan untuk berkonsultasi konsep atau meminta pricelist resmi, memudahkan Anda mendata nomor pelanggan.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: BOUQUETS */}
        {activeTab === 'bouquets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#231B1E]">Katalog Afisa Bouquet</h3>
                <p className="text-xs text-[#635256]">Kelola buket bunga satin, kawat bulu, uang, dan hampers.</p>
              </div>
              <button
                onClick={openNewBouquetModal}
                className="bg-[#231B1E] hover:bg-[#C26B76] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Buket
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bouquets.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-[#EEDADE] overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-[#C26B76] bg-[#FFF0F2] px-2 py-0.5 rounded-full">
                          {b.categoryLabel}
                        </span>
                        {b.tag && (
                          <span className="text-[10px] text-[#635256] border border-[#EEDADE] px-2 py-0.5 rounded-full">
                            {b.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm text-[#231B1E]">{b.title}</h4>
                      <p className="text-xs text-[#635256] mt-1 line-clamp-2">{b.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-[#F5EAEB] mt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#C26B76]">{b.price}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditBouquetModal(b)}
                        className="p-1.5 text-[#635256] hover:text-[#231B1E] rounded-lg hover:bg-[#FAF6F7]"
                        title="Edit Buket"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBouquet(b.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-[#FFF0F2]"
                        title="Hapus Buket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MAKEUP LOOKS & WORKSHOP */}
        {activeTab === 'makeup' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#231B1E]">
                  Portofolio MUA &amp; Pelatihan Sekolah
                </h3>
                <p className="text-xs text-[#635256]">
                  Kelola foto riasan wisuda, lamaran, akad, dan kegiatan mengajar di sekolah/instansi.
                </p>
              </div>
              <button
                onClick={openNewLookModal}
                className="bg-[#231B1E] hover:bg-[#C26B76] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Portofolio / Kelas
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {makeupData.looks.map((look) => (
                <div key={look.id} className="bg-white rounded-2xl border border-[#EEDADE] overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={look.image} alt={look.title} className="w-full h-52 object-cover" />
                    <div className="p-4">
                      <span className="text-[10px] font-semibold text-[#C26B76] bg-[#FFF0F2] px-2 py-0.5 rounded-full inline-block mb-1.5">
                        {look.categoryLabel}
                      </span>
                      <h4 className="font-semibold text-sm text-[#231B1E]">{look.title}</h4>
                      <p className="text-xs text-[#635256] mt-1 line-clamp-2">{look.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-[#F5EAEB] flex items-center justify-between">
                    <span className="text-[11px] text-[#8A787C]">{look.tag || 'Layanan MUA'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditLookModal(look)}
                        className="p-1.5 text-[#635256] hover:text-[#231B1E] rounded-lg hover:bg-[#FAF6F7]"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLook(look.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-[#FFF0F2]"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-[#EEDADE] p-6 sm:p-8 max-w-2xl">
            <h3 className="text-lg font-semibold text-[#231B1E] mb-1">
              Pengaturan Kontak WhatsApp &amp; Lokasi
            </h3>
            <p className="text-xs text-[#635256] mb-6">
              Nomor ini digunakan sebagai tujuan tombol &quot;Konsultasi Sekarang&quot; dan &quot;Tanya Pricelist&quot;.
            </p>

            {settingsSaved && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Pengaturan berhasil disimpan dan cache langsung diperbarui!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">
                  Nomor WhatsApp (Awali 62, tanpa spasi/tanda +)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  placeholder="6282154309113"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E] focus:outline-none focus:border-[#C26B76]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">
                  Format Tampilan Nomor
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappDisplay || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappDisplay: e.target.value })}
                  placeholder="0821-5430-9113"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E] focus:outline-none focus:border-[#C26B76]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">
                  Nama Kontak Pemilik
                </label>
                <input
                  type="text"
                  value={settingsForm.contactName || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactName: e.target.value })}
                  placeholder="Nadia"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E] focus:outline-none focus:border-[#C26B76]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">
                  Alamat Workshop Samarinda
                </label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  placeholder="Jl. Revolusi, arah Gg. Kasih, Samarinda"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E] focus:outline-none focus:border-[#C26B76]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">
                  Teks Pengumuman Promo / Slot Wisuda
                </label>
                <input
                  type="text"
                  value={settingsForm.announcement || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  placeholder="Slot wisuda dan buket bunga bulan ini dibuka."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E] focus:outline-none focus:border-[#C26B76]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#231B1E] hover:bg-[#C26B76] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Simpan Pengaturan Kontak
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL FORM BUKET */}
      {bouquetModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#EEDADE]">
            <h3 className="text-lg font-semibold text-[#231B1E] mb-4">
              {editingBouquet ? 'Edit Buket Bunga' : 'Tambah Buket Baru'}
            </h3>

            <form onSubmit={handleSaveBouquet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">Judul Buket</label>
                <input
                  type="text"
                  value={bouquetForm.title}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, title: e.target.value })}
                  required
                  placeholder="Contoh: Elegance Rose Satin Deluxe"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#231B1E] mb-1">Kategori</label>
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
                        categoryLabel: labels[e.target.value] || 'Buket Bunga'
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                  >
                    <option value="satin">Bunga Satin</option>
                    <option value="wisuda">Wisuda &amp; Sempro</option>
                    <option value="money">Money Bouquet</option>
                    <option value="snack">Snack &amp; Chocolate</option>
                    <option value="gift">Gift Box &amp; Parfume</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#231B1E] mb-1">Label Tag</label>
                  <input
                    type="text"
                    value={bouquetForm.tag}
                    onChange={(e) => setBouquetForm({ ...bouquetForm, tag: e.target.value })}
                    placeholder="Best Seller / Favorit"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">URL Gambar (Foto)</label>
                <input
                  type="url"
                  value={bouquetForm.image}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, image: e.target.value })}
                  required
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">Keterangan / Deskripsi</label>
                <textarea
                  value={bouquetForm.description}
                  onChange={(e) => setBouquetForm({ ...bouquetForm, description: e.target.value })}
                  rows={3}
                  placeholder="Jelaskan detail bahan, warna bunga, dan kelengkapan buket."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F5EAEB]">
                <button
                  type="button"
                  onClick={() => setBouquetModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#635256] hover:bg-[#FAF6F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#231B1E] hover:bg-[#C26B76] text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  Simpan Buket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM LOOK & TRAINING */}
      {lookModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#EEDADE]">
            <h3 className="text-lg font-semibold text-[#231B1E] mb-4">
              {editingLook ? 'Edit Portofolio / Layanan' : 'Tambah Portofolio / Pelatihan Baru'}
            </h3>

            <form onSubmit={handleSaveLook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">Judul Layanan / Look</label>
                <input
                  type="text"
                  value={lookForm.title}
                  onChange={(e) => setLookForm({ ...lookForm, title: e.target.value })}
                  required
                  placeholder="Contoh: Guest Trainer Beauty Class SMA Negeri Samarinda"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#231B1E] mb-1">Kategori</label>
                  <select
                    value={lookForm.category}
                    onChange={(e) => {
                      const labels = {
                        training: 'Kelas & Pelatihan Sekolah',
                        wisuda: 'Wisuda & Sempro',
                        engagement: 'Lamaran & Prewed',
                        wedding: 'Akad & Wedding',
                        party: 'Party & Event'
                      };
                      setLookForm({
                        ...lookForm,
                        category: e.target.value,
                        categoryLabel: labels[e.target.value] || 'Layanan Rias'
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                  >
                    <option value="training">Kelas &amp; Pelatihan Sekolah / Instansi</option>
                    <option value="wisuda">Wisuda &amp; Sempro</option>
                    <option value="engagement">Lamaran &amp; Prewedding</option>
                    <option value="wedding">Akad &amp; Pernikahan</option>
                    <option value="party">Pesta &amp; Acara Formal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#231B1E] mb-1">Label Tag</label>
                  <input
                    type="text"
                    value={lookForm.tag}
                    onChange={(e) => setLookForm({ ...lookForm, tag: e.target.value })}
                    placeholder="Pengajar Tamu / Favorit"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">URL Gambar (Foto)</label>
                <input
                  type="url"
                  value={lookForm.image}
                  onChange={(e) => setLookForm({ ...lookForm, image: e.target.value })}
                  required
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231B1E] mb-1">Deskripsi / Detail</label>
                <textarea
                  value={lookForm.description}
                  onChange={(e) => setLookForm({ ...lookForm, description: e.target.value })}
                  rows={3}
                  placeholder="Jelaskan konsep riasan atau materi pelatihan mengajar yang diberikan."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EEDADE] text-xs text-[#231B1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F5EAEB]">
                <button
                  type="button"
                  onClick={() => setLookModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#635256] hover:bg-[#FAF6F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#231B1E] hover:bg-[#C26B76] text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
