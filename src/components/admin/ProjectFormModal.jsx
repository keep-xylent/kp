import React from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function ProjectFormModal({
  projectFormOpen,
  setProjectFormOpen,
  editingProject,
  handleProjectSubmit,
  projectTitle,
  setProjectTitle,
  projectCategoryId,
  setProjectCategoryId,
  categories,
  projectStatus,
  setProjectStatus,
  projectAddress,
  setProjectAddress,
  projectDescription,
  setProjectDescription,
  thumbnailPreview,
  projectThumbnailUrl,
  setProjectThumbnailUrl,
  setThumbnailPreview,
  setProjectThumbnail,
  handleThumbnailChange,
  formLoading,
}) {
  if (!projectFormOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setProjectFormOpen(false)} />

      {/* Form Modal Box */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {editingProject ? 'Edit Detail Proyek' : 'Tambah Proyek Baru'}
          </h3>
          <button
            onClick={() => setProjectFormOpen(false)}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable Form) */}
        <form onSubmit={handleProjectSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Judul Proyek</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Contoh: Gedung Kantor Bupati Utama"
              required
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Kategori</label>
              <select
                value={projectCategoryId}
                onChange={(e) => setProjectCategoryId(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Status Publikasi</label>
              <select
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
              >
                <option value="active">Aktif (Tampil di Portfolio)</option>
                <option value="draft">Draft (Disembunyikan)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Alamat / Lokasi Proyek</label>
            <input
              type="text"
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
              placeholder="Contoh: Surabaya, Jawa Timur"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Deskripsi Proyek</label>
            <textarea
              rows="4"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Jelaskan detail proyek, material yang digunakan, tantangan, dll..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Thumbnail Proyek</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-28 h-28 rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0 flex items-center justify-center">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-700" />
                )}
              </div>
              <div className="flex-1 space-y-3 w-full">
                <input
                  type="text"
                  placeholder="Tempel URL gambar online di sini..."
                  value={projectThumbnailUrl}
                  onChange={(e) => {
                    setProjectThumbnailUrl(e.target.value);
                    setThumbnailPreview(e.target.value);
                    setProjectThumbnail(null);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium">ATAU</span>
                  <input
                    type="file"
                    accept="image/*"
                    id="thumbnail-file"
                    onChange={(e) => {
                      handleThumbnailChange(e);
                      setProjectThumbnailUrl('');
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="thumbnail-file"
                    className="inline-flex bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Pilih File Lokal
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setProjectFormOpen(false)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs px-5 py-3 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs px-5 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-2"
            >
              {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingProject ? 'Simpan Perubahan' : 'Tambah Proyek'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
