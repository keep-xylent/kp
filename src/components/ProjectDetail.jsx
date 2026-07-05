import React, { useState } from 'react';
import { useProjectDetail } from '../hooks/useProjectDetail';
import Lightbox from './ui/Lightbox';
import { MapPin, Calendar, Tag, ArrowLeft, Loader2, AlertCircle, Images } from 'lucide-react';

/**
 * Project detail page component.
 * Props:
 *   projectId – numeric ID of the project
 *   onBack    – callback to return to portfolio list
 */
export default function ProjectDetail({ projectId, onBack }) {
  const { project, loading, error } = useProjectDetail(projectId);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4 text-slate-500 dark:text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin" strokeWidth={1.5} />
          <p className="text-sm font-medium">Memuat detail proyek…</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <AlertCircle className="w-12 h-12 text-red-400" strokeWidth={1.5} />
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            {error || 'Proyek tidak ditemukan'}
          </p>
          <button
            onClick={onBack}
            className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Portofolio
          </button>
        </div>
      </div>
    );
  }

  const gallery = project.gallery || [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20">

      {/* ── Hero / Header ── */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Kembali
        </button>

        {/* Category badge */}
        {project.category_name && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full uppercase tracking-wide">
              {project.category_name}
            </span>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight drop-shadow-lg">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left – Description */}
          <div className="lg:col-span-2 space-y-8">

            {/* Meta info */}
            <div className="flex flex-wrap gap-4">
              {project.address && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-blue-500" strokeWidth={2} />
                  <span>{project.address}</span>
                </div>
              )}
              {project.created_at && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-blue-500" strokeWidth={2} />
                  <span>
                    {new Date(project.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'long',
                    })}
                  </span>
                </div>
              )}
              {project.category_name && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Tag className="w-4 h-4 flex-shrink-0 text-blue-500" strokeWidth={2} />
                  <span>{project.category_name}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <div>
                <h2 className="font-heading font-semibold text-lg text-slate-900 dark:text-white mb-3">
                  Deskripsi Proyek
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>
            )}
          </div>

          {/* Right – Info card */}
          <div>
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white text-base">
                Informasi Proyek
              </h3>
              <dl className="space-y-4 text-sm">
                {project.title && (
                  <div>
                    <dt className="text-slate-400 dark:text-slate-500 mb-1">Nama Proyek</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-medium">{project.title}</dd>
                  </div>
                )}
                {project.category_name && (
                  <div>
                    <dt className="text-slate-400 dark:text-slate-500 mb-1">Kategori</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-medium">{project.category_name}</dd>
                  </div>
                )}
                {project.address && (
                  <div>
                    <dt className="text-slate-400 dark:text-slate-500 mb-1">Lokasi</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-medium">{project.address}</dd>
                  </div>
                )}
                {project.created_at && (
                  <div>
                    <dt className="text-slate-400 dark:text-slate-500 mb-1">Tahun</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-medium">
                      {new Date(project.created_at).getFullYear()}
                    </dd>
                  </div>
                )}
                {gallery.length > 0 && (
                  <div>
                    <dt className="text-slate-400 dark:text-slate-500 mb-1">Total Foto</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-medium">{gallery.length} gambar</dd>
                  </div>
                )}
              </dl>

              <a
                href="#kontak"
                onClick={onBack}
                className="block w-full text-center bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                Konsultasi Proyek Ini
              </a>
            </div>
          </div>
        </div>

        {/* ── Gallery Section ── */}
        {gallery.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <Images className="w-5 h-5 text-blue-500" strokeWidth={2} />
              <h2 className="font-heading font-semibold text-xl text-slate-900 dark:text-white">
                Galeri Proyek
              </h2>
              <span className="ml-1 text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {gallery.length} foto
              </span>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {gallery.map((item, i) => (
                <button
                  key={item.id ?? i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Lihat gambar: ${item.title || `Foto ${i + 1}`}`}
                >
                  <img
                    src={item.image_url || item.image}
                    alt={item.title || `Foto proyek ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                    {item.title && (
                      <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-left leading-tight line-clamp-2">
                        {item.title}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Empty gallery message */}
        {gallery.length === 0 && (
          <div className="mt-14 flex flex-col items-center gap-3 py-16 text-slate-400 dark:text-slate-600 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <Images className="w-10 h-10" strokeWidth={1} />
            <p className="text-sm">Belum ada foto galeri untuk proyek ini</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNav={setLightboxIndex}
      />
    </div>
  );
}
