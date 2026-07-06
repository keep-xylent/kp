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
import { getSettings, updateSettings } from '../api/settings';
import { Check, AlertCircle } from 'lucide-react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import SettingsTab from '../components/admin/SettingsTab';
import ProjectsTab from '../components/admin/ProjectsTab';
import ProjectFormModal from '../components/admin/ProjectFormModal';
import GalleryView from '../components/admin/GalleryView';
import ConfirmModal from '../components/admin/ConfirmModal';

export default function AdminDashboard({ onExit }) {
  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('starcon_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // General Dashboard State
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'settings'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
  const [projectThumbnailUrl, setProjectThumbnailUrl] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Gallery Mode State
  const [activeGalleryProject, setActiveGalleryProject] = useState(null); // project object
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  // Category Management State
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  // Settings State
  const [settingsData, setSettingsData] = useState({
    stats_mode: 'auto',
    stats_projects: '',
    stats_years: '',
    stats_clients: '',
    stats_quality: '',
    contact_wa: '',
    contact_phone: '',
    contact_email: '',
    contact_ig: '',
    contact_address: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const hideConfirm = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

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
      const [projData, catData, settings] = await Promise.all([
        getProjects({ status: 'all' }), // Fetch both active and draft
        getCategories(),
        getSettings()
      ]);
      setProjects(projData || []);
      setCategories(catData || []);
      if (settings) setSettingsData(settings);
    } catch (err) {
      console.error("fetchData error:", err);
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
    setProjectThumbnailUrl('');
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
    setProjectThumbnailUrl((proj.thumbnail && proj.thumbnail.startsWith('http')) ? proj.thumbnail : '');
    setProjectFormOpen(true);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('File gambar terlalu besar (maksimal 5 MB)');
        return;
      }
      setProjectThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectTitle || !projectCategoryId) {
      showError('Judul dan Kategori wajib diisi');
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
      } else if (projectThumbnailUrl) {
        formData.append('thumbnail', projectThumbnailUrl);
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
      showError(err.message || 'Gagal menyimpan proyek');
    } finally {
      setFormLoading(false);
    }
  };

  const handleProjectDelete = (id) => {
    showConfirm(
      'Hapus Proyek',
      'Apakah Anda yakin ingin menghapus proyek ini? Seluruh gambar galeri proyek juga akan terhapus secara permanen.',
      async () => {
        try {
          await deleteProject(id);
          showSuccess('Proyek berhasil dihapus');
          fetchData();
        } catch (err) {
          showError(err.message || 'Gagal menghapus proyek');
        }
      }
    );
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
      showError(err.message || 'Gagal menyimpan kategori');
    }
  };

  const handleCategoryDelete = (id) => {
    showConfirm(
      'Hapus Kategori',
      'Hapus kategori ini? Proyek dengan kategori ini akan dibatasi.',
      async () => {
        try {
          await deleteCategory(id);
          showSuccess('Kategori berhasil dihapus');
          fetchData();
        } catch (err) {
          showError(err.message || 'Gagal menghapus kategori');
        }
      }
    );
  };

  /* ── 5. Gallery Manager Handlers ── */
  const openGalleryManager = async (proj) => {
    setActiveGalleryProject(proj);
    setGalleryLoading(true);
    try {
      const items = await getProjectGallery(proj.id);
      setGalleryItems(items || []);
    } catch (err) {
      showError(err.message || 'Gagal memuat galeri');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleAddGalleryUrl = async () => {
    if (!newGalleryImageUrl.trim()) return;
    setGalleryLoading(true);
    try {
      const formData = new FormData();
      formData.append('image_url', newGalleryImageUrl.trim());

      await uploadGallery(activeGalleryProject.id, formData);
      showSuccess('URL gambar berhasil ditambahkan ke galeri');
      setNewGalleryImageUrl('');
      
      const items = await getProjectGallery(activeGalleryProject.id);
      setGalleryItems(items || []);
    } catch (err) {
      showError(err.message || 'Gagal menambahkan URL gambar');
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
      
      const items = await getProjectGallery(activeGalleryProject.id);
      setGalleryItems(items || []);
    } catch (err) {
      showError(err.message || 'Gagal mengunggah galeri');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleGalleryItemDelete = (id) => {
    showConfirm(
      'Hapus Foto',
      'Hapus foto ini dari galeri? File asli akan dihapus dari server.',
      async () => {
        setGalleryLoading(true);
        try {
          await deleteGalleryItem(id);
          showSuccess('Foto berhasil dihapus');
          
          const items = await getProjectGallery(activeGalleryProject.id);
          setGalleryItems(items || []);
        } catch (err) {
          showError(err.message || 'Gagal menghapus foto');
        } finally {
          setGalleryLoading(false);
        }
      }
    );
  };

  const handleGalleryItemUpdate = async (id, data) => {
    try {
      const formData = new FormData();
      if (data.title !== undefined)       formData.append('title', data.title);
      if (data.description !== undefined) formData.append('description', data.description);

      await updateGalleryItem(id, formData);
      showSuccess('Informasi foto diperbarui');

      const items = await getProjectGallery(activeGalleryProject.id);
      setGalleryItems(items || []);
    } catch (err) {
      showError(err.message || 'Gagal memperbarui foto');
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
      showError(err.message || 'Gagal menyimpan urutan galeri');
    }
  };

  /* ── 6. Settings Handlers ── */
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const updated = await updateSettings(settingsData);
      setSettingsData(updated);
      showSuccess('Pengaturan berhasil disimpan');
    } catch (err) {
      showError(err.message || 'Gagal menyimpan pengaturan');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Helper alert message
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 3000);
  };

  /* ────────────────────────────────────────────────────────
     AUTH INTERFACE (Login Form)
     ──────────────────────────────────────────────────────── */
  if (!user) {
    return (
      <AdminLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        authError={authError}
        authLoading={authLoading}
        handleLogin={handleLogin}
        onExit={onExit}
      />
    );
  }

  /* ────────────────────────────────────────────────────────
     MAIN ADMIN INTERFACE
     ──────────────────────────────────────────────────────── */
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden">
      <AdminHeader
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeGalleryProject={activeGalleryProject}
          setActiveGalleryProject={setActiveGalleryProject}
          onExit={onExit}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Notifications */}
          {successMsg && (
            <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white font-medium text-xs px-4 py-3 rounded-xl shadow-lg border border-green-500 flex items-center gap-2 animate-fade-in-up">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white font-medium text-xs px-4 py-3 rounded-xl shadow-lg border border-red-500 flex items-center gap-2 animate-fade-in-up">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeGalleryProject ? (
            <GalleryView
              activeGalleryProject={activeGalleryProject}
              setActiveGalleryProject={setActiveGalleryProject}
              newGalleryImageUrl={newGalleryImageUrl}
              setNewGalleryImageUrl={setNewGalleryImageUrl}
              handleAddGalleryUrl={handleAddGalleryUrl}
              handleGalleryUpload={handleGalleryUpload}
              galleryLoading={galleryLoading}
              galleryItems={galleryItems}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleGalleryItemUpdate={handleGalleryItemUpdate}
              handleGalleryItemDelete={handleGalleryItemDelete}
            />
          ) : (
            <>
              {activeTab === 'projects' && (
                <ProjectsTab
                  error={error}
                  loading={loading}
                  projects={projects}
                  openCreateProject={openCreateProject}
                  openEditProject={openEditProject}
                  handleProjectDelete={handleProjectDelete}
                  openGalleryManager={openGalleryManager}
                  categoryName={categoryName}
                  setCategoryName={setCategoryName}
                  editingCategory={editingCategory}
                  setEditingCategory={setEditingCategory}
                  handleCategorySubmit={handleCategorySubmit}
                  handleCategoryDelete={handleCategoryDelete}
                  categories={categories}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab
                  settingsData={settingsData}
                  setSettingsData={setSettingsData}
                  handleSettingsSubmit={handleSettingsSubmit}
                  settingsLoading={settingsLoading}
                />
              )}
            </>
          )}
        </main>
      </div>

      <ProjectFormModal
        projectFormOpen={projectFormOpen}
        setProjectFormOpen={setProjectFormOpen}
        editingProject={editingProject}
        handleProjectSubmit={handleProjectSubmit}
        projectTitle={projectTitle}
        setProjectTitle={setProjectTitle}
        projectCategoryId={projectCategoryId}
        setProjectCategoryId={setProjectCategoryId}
        categories={categories}
        projectStatus={projectStatus}
        setProjectStatus={setProjectStatus}
        projectAddress={projectAddress}
        setProjectAddress={setProjectAddress}
        projectDescription={projectDescription}
        setProjectDescription={setProjectDescription}
        thumbnailPreview={thumbnailPreview}
        projectThumbnailUrl={projectThumbnailUrl}
        setProjectThumbnailUrl={setProjectThumbnailUrl}
        setThumbnailPreview={setThumbnailPreview}
        setProjectThumbnail={setProjectThumbnail}
        handleThumbnailChange={handleThumbnailChange}
        formLoading={formLoading}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={hideConfirm}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}
