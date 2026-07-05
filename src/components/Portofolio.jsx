import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

export default function Portofolio({ onViewDetail }) {
  const { projects, categories, loading, error, refetch } = useProjects({ status: 'active' });
  const [activeFilter, setActiveFilter] = useState('all');

  /* Build filter list dynamically from API categories */
  const filters = useMemo(() => {
    const cats = categories.map((c) => ({ key: c.slug, label: c.name }));
    return [{ key: 'all', label: 'Semua' }, ...cats];
  }, [categories]);

  /* Apply active filter */
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category_slug === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="portofolio" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Portofolio Proyek
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Dokumentasi proyek-proyek yang telah kami selesaikan
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20 text-slate-400 dark:text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin" strokeWidth={1.5} />
            <p className="text-sm">Memuat proyek…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" strokeWidth={1.5} />
            <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
            <button
              onClick={refetch}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <RefreshCw className="w-4 h-4" /> Coba Lagi
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10 reveal">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`filter-btn px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === f.key
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <p className="text-center text-slate-400 dark:text-slate-500 py-16 text-sm">
                Belum ada proyek untuk kategori ini.
              </p>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="portfolio-item animate-fade-in-up bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  data-category={project.category_slug}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden group h-56">
                    <img
                      src={project.thumbnail || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop`}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold text-white bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-md uppercase tracking-wide">
                        {project.category_name || project.category_slug}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h4 className="font-heading font-semibold text-base text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        {project.address && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {project.address.split(',').slice(-1)[0]?.trim()}
                          </span>
                        )}
                        {project.created_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(project.created_at).getFullYear()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onViewDetail && onViewDetail(project.id)}
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
