import React from 'react';
import { ArrowLeft, Loader2, Plus, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

export default function GalleryView({
  activeGalleryProject,
  setActiveGalleryProject,
  newGalleryImageUrl,
  setNewGalleryImageUrl,
  handleAddGalleryUrl,
  handleGalleryUpload,
  galleryLoading,
  galleryItems,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleGalleryItemUpdate,
  handleGalleryItemDelete,
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveGalleryProject(null)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeGalleryProject.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kelola foto-foto galeri dan seret-geser untuk merubah urutan tampil</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm focus-within:border-slate-400 dark:focus-within:border-slate-500 transition-colors">
            <input
              type="text"
              placeholder="Tempel URL gambar..."
              value={newGalleryImageUrl}
              onChange={(e) => setNewGalleryImageUrl(e.target.value)}
              className="px-4 py-2 text-sm bg-transparent border-none focus:outline-none w-48 sm:w-64 text-slate-900 dark:text-white"
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddGalleryUrl(); }}
            />
            <button
              onClick={handleAddGalleryUrl}
              disabled={!newGalleryImageUrl.trim()}
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 px-4 py-2 text-sm font-semibold transition-colors border-l border-slate-200 dark:border-slate-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> URL
            </button>
          </div>
          <span className="text-slate-400 text-xs font-semibold px-1">ATAU</span>
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
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-lg transition-colors whitespace-nowrap"
            >
              <Upload className="w-4 h-4" /> Upload Foto
            </label>
          </div>
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
            <div className="flex flex-col items-center py-20 text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
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
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col group cursor-move hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Image Thumbnail */}
                  <div className="relative aspect-video bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    <img
                      src={item.image_url || item.image}
                      alt={item.title || 'Foto proyek'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-50 dark:bg-slate-950/80 px-2 py-0.5 rounded text-xxs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
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
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:border-slate-900 dark:focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xxs font-bold uppercase text-slate-500 tracking-wide mb-1">Deskripsi Gambar</label>
                      <textarea
                        rows="2"
                        defaultValue={item.description || ''}
                        onBlur={(e) => handleGalleryItemUpdate(item.id, { description: e.target.value })}
                        placeholder="Tulis deskripsi gambar..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:border-slate-900 dark:focus:border-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Delete bar */}
                  <div className="h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-end px-3">
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
  );
}
