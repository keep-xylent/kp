import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectGallery,
  uploadGallery,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGallery,
} from '../api/projects';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';
import {
  FolderKanban,
  Tags,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MoveUp,
  MoveDown,
  Upload,
  X,
  Eye,
  Check,
} from 'lucide-react';

export default function AdminDashboard({ onExit }) {
  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('starcon_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // General Dashboard State
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'categories'
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Project Form State
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null for create
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('active');
  const [projectThumbnail, setProjectThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Gallery Mode State
  const [activeGalleryProject, setActiveGalleryProject] = useState(null); // project object
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  // Category Management State
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  // Autoload data on mount/tab change
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [projData, catData] = await Promise.all([
        getProjects({ status: 'all' }), // Fetch both active and draft
        getCategories(),
      ]);
      setProjects(projData || []);
      setCategories(catData || []);
    } catch (err) {
      setError(err.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  /* ── 1. Authentication Handlers ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await api.post('/api/login', { email, password });
      if (res.data.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('starcon_admin_user', JSON.stringify(userData));
      }
    } catch (err) {
      setAuthError(err.message || 'Email atau password salah');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('starcon_admin_user');
  };

  /* ── 2. Project CRUD Handlers ── */
  const openCreateProject = () => {
    setEditingProject(null);
    setProjectTitle('');
    setProjectCategoryId(categories[0]?.id || '');
    setProjectAddress('');
    setProjectDescription('');
    setProjectStatus('active');
    setProjectThumbnail(null);
    setThumbnailPreview('');
    setProjectFormOpen(true);
  };

  const openEditProject = (proj) => {
    setEditingProject(proj);
    setProjectTitle(proj.title || '');
    setProjectCategoryId(proj.category_id || '');
    setProjectAddress(proj.address || '');
    setProjectDescription(proj.description || '');
    setProjectStatus(proj.status || 'active');
    setProjectThumbnail(null);
    setThumbnailPreview(proj.thumbnail || '');
    setProjectFormOpen(true);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File gambar terlalu besar (maksimal 5 MB)');
        return;
      }
      setProjectThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectTitle || !projectCategoryId) {
      alert('Judul dan Kategori wajib diisi');
      return;
    }

    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectTitle);
      formData.append('category_id', projectCategoryId);
      formData.append('address', projectAddress);
      formData.append('description', projectDescription);
      formData.append('status', projectStatus);
      if (projectThumbnail) {
        formData.append('thumbnail', projectThumbnail);
      }

      if (editingProject) {
        await updateProject(editingProject.id, formData);
        showSuccess('Proyek berhasil diperbarui');
      } else {
        await createProject(formData);
        showSuccess('Proyek berhasil ditambahkan');
      }

      setProjectFormOpen(false);
      fetchData();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan proyek');
    } finally {
      setFormLoading(false);
    }
  };

  const handleProjectDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini? Seluruh gambar galeri proyek juga akan terhapus secara permanen.')) {
      try {
        await deleteProject(id);
        showSuccess('Proyek berhasil dihapus');
        fetchData();
      } catch (err) {
        alert(err.message || 'Gagal menghapus proyek');
      }
    }
  };

  /* ── 3. Category CRUD Handlers ── */
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name: categoryName.trim() });
        showSuccess('Kategori berhasil diperbarui');
      } else {
        await createCategory({ name: categoryName.trim() });
        showSuccess('Kategori berhasil ditambahkan');
      }
      setCategoryName('');
      setEditingCategory(null);
      fetchData();
    } catch (err) {
      alert(err.message || 'Gagal menyimpan kategori');
    }
  };

  const handleCategoryDelete = async (id) => {
    if (window.confirm('Hapus kategori ini? Proyek dengan kategori ini akan dibatasi.')) {
      try {
        await deleteCategory(id);
        showSuccess('Kategori berhasil dihapus');
        fetchData();
      } catch (err) {
        alert(err.message || 'Gagal menghapus kategori');
      }
    }
  };

  /* ── 4. Gallery Manager Handlers ── */
  const openGalleryManager = async (proj) => {
    setActiveGalleryProject(proj);
    setGalleryLoading(true);
    try {
      const items = await getProjectGallery(proj.id);
      setGalleryItems(items || []);
    } catch (err) {
      alert(err.message || 'Gagal memuat galeri');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setGalleryLoading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
      }

      await uploadGallery(activeGalleryProject.id, formData);
      showSuccess(`${files.length} gambar berhasil diunggah`);
      
      // reload
      const items = await getProjectGallery(activeGalleryProject.id);
      setGalleryItems(items || []);
    } catch (err) {
      alert(err.message || 'Gagal mengunggah galeri');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleGalleryItemDelete = async (id) => {
    if (window.confirm('Hapus foto ini dari galeri? File asli akan dihapus dari server.')) {
      setGalleryLoading(true);
      try {
        await deleteGalleryItem(id);
        showSuccess('Foto berhasil dihapus');
        
        // reload
        const items = await getProjectGallery(activeGalleryProject.id);
        setGalleryItems(items || []);
      } catch (err) {
        alert(err.message || 'Gagal menghapus foto');
      } finally {
        setGalleryLoading(false);
      }
    }
  };

  const handleGalleryItemUpdate = async (id, data) => {
    try {
      const formData = new FormData();
      if (data.title !== undefined)       formData.append('title', data.title);
      if (data.description !== undefined) formData.append('description', data.description);

      await updateGalleryItem(id, formData);
      showSuccess('Informasi foto diperbarui');

      // reload
      const items = await getProjectGallery(activeGalleryProject.id);
      setGalleryItems(items || []);
    } catch (err) {
      alert(err.message || 'Gagal memperbarui foto');
    }
  };

  /* Native HTML5 Drag and Drop for Reordering */
  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const items = [...galleryItems];
    const dragged = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(index, 0, dragged);

    setGalleryItems(items);
    setDraggedItemIndex(null);

    // Persist to API
    try {
      const orderedIds = items.map((item) => item.id);
      await reorderGallery(activeGalleryProject.id, orderedIds);
      showSuccess('Urutan foto berhasil disimpan');
    } catch (err) {
      alert(err.message || 'Gagal menyimpan urutan galeri');
    }
  };

  // Helper alert message
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  /* ────────────────────────────────────────────────────────
     AUTH INTERFACE (Login Form)
     ──────────────────────────────────────────────────────── */
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">STARCON Dashboard</h2>
            <p className="text-slate-400 text-sm mt-2">Log in untuk mengelola portofolio proyek</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@starcon.id"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In'}
            </button>
          </form>

          <button
            onClick={onExit}
            className="w-full mt-6 text-center text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Kembali ke Website Utama
          </button>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────
     MAIN ADMIN INTERFACE
     ──────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-tight">STARCON Admin</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            {user.role}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">Halo, {user.name}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 space-y-2 flex-shrink-0">
          <button
            onClick={() => {
              setActiveGalleryProject(null);
              setActiveTab('projects');
            }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'projects' && !activeGalleryProject
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FolderKanban className="w-4 h-4" /> Kelola Proyek
          </button>

          <button
            onClick={() => {
              setActiveGalleryProject(null);
              setActiveTab('categories');
            }}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Tags className="w-4 h-4" /> Kelola Kategori
          </button>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={onExit}
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Web
            </button>
          </div>
        </aside>

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Notifications */}
          {successMsg && (
            <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white font-medium text-xs px-4 py-3 rounded-xl shadow-lg border border-green-500 flex items-center gap-2 animate-fade-in-up">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ──────────────────────────────────────────────────
             GALLERY MANAGER VIEW
             ────────────────────────────────────────────────── */}
          {activeGalleryProject ? (
            <div className="space-y-6">
              {/* Back to Project list */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveGalleryProject(null)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
                </button>
              </div>

              {/* Title & Upload Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-white">{activeGalleryProject.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">Kelola foto-foto galeri dan seret-geser untuk merubah urutan tampil</p>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="gallery-input"
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="gallery-input"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" /> Upload Foto Galeri
                  </label>
                </div>
              </div>

              {/* Gallery loader */}
              {galleryLoading ? (
                <div className="flex flex-col items-center py-20 text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-xs font-medium mt-2">Menyinkronkan galeri…</p>
                </div>
              ) : (
                <>
                  {galleryItems.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                      <ImageIcon className="w-12 h-12 text-slate-600 mb-2" strokeWidth={1} />
                      <p className="text-sm">Belum ada foto galeri untuk proyek ini</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {galleryItems.map((item, idx) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDrop={(e) => handleDrop(e, idx)}
                          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col group cursor-move hover:border-slate-700 transition-all"
                        >
                          {/* Image Thumbnail */}
                          <div className="relative aspect-video bg-slate-950 overflow-hidden">
                            <img
                              src={item.image_url || item.image}
                              alt={item.title || 'Foto proyek'}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-xxs text-slate-400 font-semibold uppercase tracking-wider">
                              Order: {item.sort_order || idx + 1}
                            </div>
                          </div>

                          {/* Detail inputs */}
                          <div className="p-4 flex-1 space-y-3">
                            <div>
                              <label className="block text-xxs font-bold uppercase text-slate-500 tracking-wide mb-1">Judul Gambar</label>
                              <input
                                type="text"
                                defaultValue={item.title || ''}
                                onBlur={(e) => handleGalleryItemUpdate(item.id, { title: e.target.value })}
                                placeholder="Tulis judul gambar..."
                                className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-xxs font-bold uppercase text-slate-500 tracking-wide mb-1">Deskripsi Gambar</label>
                              <textarea
                                rows="2"
                                defaultValue={item.description || ''}
                                onBlur={(e) => handleGalleryItemUpdate(item.id, { description: e.target.value })}
                                placeholder="Tulis deskripsi gambar..."
                                className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500 resize-none"
                              />
                            </div>
                          </div>

                          {/* Delete bar */}
                          <div className="h-10 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end px-3">
                            <button
                              onClick={() => handleGalleryItemDelete(item.id)}
                              className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus Foto
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {/* ──────────────────────────────────────────────────
                 PROJECTS TAB VIEW
                 ────────────────────────────────────────────────── */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Tab Title */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">Kelola Proyek</h2>
                      <p className="text-xs text-slate-400 mt-1">Daftar portofolio proyek konstruksi dan bangunan</p>
                    </div>

                    <button
                      onClick={openCreateProject}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Tambah Proyek
                    </button>
                  </div>

                  {/* List loader */}
                  {loading ? (
                    <div className="flex flex-col items-center py-20 text-slate-500">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <p className="text-xs font-medium mt-2">Menyinkronkan data proyek…</p>
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-xs text-slate-400 font-semibold bg-slate-900/50">
                            <th className="p-4 pl-6">Proyek</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Lokasi</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 pr-6 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-sm">
                          {projects.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="p-8 text-center text-slate-500">
                                Belum ada proyek. Klik "Tambah Proyek" untuk memulai.
                              </td>
                            </tr>
                          ) : (
                            projects.map((proj) => (
                              <tr key={proj.id} className="hover:bg-slate-800/20">
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0">
                                      {proj.thumbnail ? (
                                        <img
                                          src={proj.thumbnail}
                                          alt={proj.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                                          <ImageIcon className="w-5 h-5" />
                                        </div>
                                      )}
                                    </div>
                                    <span className="font-semibold text-white truncate max-w-xs">{proj.title}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-slate-400">{proj.category_name || '-'}</td>
                                <td className="p-4 text-slate-400">{proj.address || '-'}</td>
                                <td className="p-4">
                                  <span
                                    className={`inline-flex px-2 py-0.5 rounded text-xxs font-bold uppercase tracking-wide ${
                                      proj.status === 'active'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                    }`}
                                  >
                                    {proj.status}
                                  </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                  <div className="inline-flex items-center gap-2">
                                    <button
                                      onClick={() => openGalleryManager(proj)}
                                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 hover:bg-blue-500/10 px-2 py-1.5 rounded transition-all"
                                      title="Kelola Galeri Foto"
                                    >
                                      <ImageIcon className="w-3.5 h-3.5" /> Galeri
                                    </button>

                                    <button
                                      onClick={() => openEditProject(proj)}
                                      className="text-xs text-slate-400 hover:text-slate-200 font-semibold flex items-center gap-1 hover:bg-slate-800 px-2 py-1.5 rounded transition-all"
                                      title="Edit Detail Proyek"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" /> Edit
                                    </button>

                                    <button
                                      onClick={() => handleProjectDelete(proj.id)}
                                      className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 hover:bg-red-500/10 px-2 py-1.5 rounded transition-all"
                                      title="Hapus Proyek"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────────────────────────────────────────
                 CATEGORIES TAB VIEW
                 ────────────────────────────────────────────────── */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  {/* Tab Title */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">Kelola Kategori</h2>
                      <p className="text-xs text-slate-400 mt-1">Klasifikasi kategori proyek portofolio</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add/Edit form */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
                      <h3 className="font-semibold text-white text-base">
                        {editingCategory ? 'Edit Kategori' : 'Kategori Baru'}
                      </h3>
                      <form onSubmit={handleCategorySubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs text-slate-400 font-medium mb-2">Nama Kategori</label>
                          <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Contoh: Rumah Tinggal"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex-1"
                          >
                            {editingCategory ? 'Simpan Perubahan' : 'Tambah'}
                          </button>
                          {editingCategory && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCategory(null);
                                setCategoryName('');
                              }}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                            >
                              Batal
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Categories list */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-xs text-slate-400 font-semibold bg-slate-900/50">
                            <th className="p-4 pl-6">Kategori</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4 pr-6 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
                          {categories.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="p-8 text-center text-slate-500">
                                Belum ada kategori.
                              </td>
                            </tr>
                          ) : (
                            categories.map((cat) => (
                              <tr key={cat.id} className="hover:bg-slate-800/20">
                                <td className="p-4 pl-6 font-medium text-white">{cat.name}</td>
                                <td className="p-4 text-slate-400">{cat.slug}</td>
                                <td className="p-4 pr-6 text-right">
                                  <div className="inline-flex items-center gap-2">
                                    <button
                                      onClick={() => {
                                        setEditingCategory(cat);
                                        setCategoryName(cat.name);
                                      }}
                                      className="text-xs text-slate-400 hover:text-white font-semibold hover:bg-slate-800 px-2.5 py-1.5 rounded transition-all"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleCategoryDelete(cat.id)}
                                      className="text-xs text-red-400 hover:text-red-300 font-semibold hover:bg-red-500/10 px-2.5 py-1.5 rounded transition-all"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ──────────────────────────────────────────────────
         PROJECT FORM MODAL (Add/Edit Project)
         ────────────────────────────────────────────────── */}
      {projectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setProjectFormOpen(false)} />

          {/* Form Modal Box */}
          <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Detail Proyek' : 'Tambah Proyek Baru'}
              </h3>
              <button
                onClick={() => setProjectFormOpen(false)}
                className="text-slate-400 hover:text-white rounded-lg p-1 hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form onSubmit={handleProjectSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Judul Proyek</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Contoh: Gedung Kantor Bupati Utama"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Kategori</label>
                  <select
                    value={projectCategoryId}
                    onChange={(e) => setProjectCategoryId(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Status Publikasi</label>
                  <select
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Aktif (Tampil di Portfolio)</option>
                    <option value="draft">Draft (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Alamat / Lokasi Proyek</label>
                <input
                  type="text"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                  placeholder="Contoh: Surabaya, Jawa Timur"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Deskripsi Proyek</label>
                <textarea
                  rows="4"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Jelaskan detail proyek, material yang digunakan, tantangan, dll..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Thumbnail Proyek</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-28 h-28 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0 flex items-center justify-center">
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-700" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="thumbnail-file"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail-file"
                      className="inline-flex bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Pilih Foto Baru
                    </label>
                    <p className="text-xxs text-slate-500">Maksimal 5 MB. Format: JPG, PNG, WEBP</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-800 pt-5 flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setProjectFormOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingProject ? 'Simpan Perubahan' : 'Tambah Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
