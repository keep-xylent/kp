import React from 'react';
import { AlertCircle, Loader2, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function ProjectsTab({
  error,
  loading,
  projects,
  openCreateProject,
  openEditProject,
  handleProjectDelete,
  openGalleryManager,
  categoryName,
  setCategoryName,
  editingCategory,
  setEditingCategory,
  handleCategorySubmit,
  handleCategoryDelete,
  categories,
}) {
  return (
    <div className="space-y-12 animate-fade-in-up">
      <div className="space-y-6">
        {/* Tab Title */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Proyek</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Daftar portofolio proyek konstruksi dan bangunan</p>
          </div>

          <button
            onClick={openCreateProject}
            className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Proyek
          </button>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* List loader */}
        {loading ? (
          <div className="flex flex-col items-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-xs font-medium mt-2">Menyinkronkan data proyek…</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900/50">
                  <th className="p-4 pl-6">Proyek</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Lokasi</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      Belum ada proyek. Klik "Tambah Proyek" untuk memulai.
                    </td>
                  </tr>
                ) : (
                  projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/20">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-950 overflow-hidden flex-shrink-0">
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
                          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs">{proj.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{proj.category_name || '-'}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{proj.address || '-'}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex text-xs font-semibold ${
                            proj.status === 'active'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-orange-600 dark:text-orange-400'
                          }`}
                        >
                          {proj.status === 'active' ? 'Publish' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openGalleryManager(proj)}
                            className="text-xs text-slate-600 dark:text-slate-300 hover:text-blue-300 font-semibold flex items-center gap-1 hover:bg-blue-500/10 px-2 py-1.5 rounded transition-all"
                            title="Kelola Galeri Foto"
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> Galeri
                          </button>

                          <button
                            onClick={() => openEditProject(proj)}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-semibold flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1.5 rounded transition-all"
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

      {/* CATEGORIES SECTION */}
      <div className="space-y-6 pt-4">
        {/* Tab Title */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Kategori</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Klasifikasi kategori proyek portofolio</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Edit form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {editingCategory ? 'Edit Kategori' : 'Kategori Baru'}
            </h3>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">Nama Kategori</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Contoh: Rumah Tinggal"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex-1"
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
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Categories list */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900/50">
                  <th className="p-4 pl-6">Kategori</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-500">
                      Belum ada kategori.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/20">
                      <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">{cat.name}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{cat.slug}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setCategoryName(cat.name);
                            }}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 px-2.5 py-1.5 rounded transition-all"
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
    </div>
  );
}
