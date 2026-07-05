import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable full-screen lightbox/modal.
 * Props:
 *   images  – array of { image_url, title, description }
 *   index   – currently open index (or null to close)
 *   onClose – called when lightbox closes
 *   onNav   – called with new index on prev/next
 */
export default function Lightbox({ images = [], index, onClose, onNav }) {
  const isOpen = index !== null && index !== undefined && images.length > 0;
  const current = isOpen ? images[index] : null;

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   onNav(Math.max(0, index - 1));
      if (e.key === 'ArrowRight')  onNav(Math.min(images.length - 1, index + 1));
    },
    [isOpen, index, images.length, onClose, onNav]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !current) return null;

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox galeri proyek"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-4 max-h-[95vh]">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 right-0 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
          aria-label="Tutup lightbox"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Counter */}
        <div className="absolute -top-3 left-0 text-xs text-white/60 font-medium bg-black/40 px-3 py-1 rounded-full z-20">
          {index + 1} / {images.length}
        </div>

        {/* Image wrapper */}
        <div className="relative w-full flex items-center justify-center">
          {/* Prev button */}
          <button
            onClick={() => hasPrev && onNav(index - 1)}
            disabled={!hasPrev}
            className="absolute left-0 z-20 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed ml-2"
            aria-label="Gambar sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
          </button>

          {/* Main image */}
          <img
            key={current.image_url}
            src={current.image_url || current.image}
            alt={current.title || 'Galeri proyek'}
            className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl animate-fade-in-up"
          />

          {/* Next button */}
          <button
            onClick={() => hasNext && onNav(index + 1)}
            disabled={!hasNext}
            className="absolute right-0 z-20 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed mr-2"
            aria-label="Gambar berikutnya"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* Caption */}
        {(current.title || current.description) && (
          <div className="mt-4 text-center max-w-2xl px-4">
            {current.title && (
              <h3 className="text-white font-semibold text-base mb-1">
                {current.title}
              </h3>
            )}
            {current.description && (
              <p className="text-white/60 text-sm leading-relaxed">
                {current.description}
              </p>
            )}
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-w-full px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onNav(i)}
                className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                  i === index
                    ? 'border-white scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={img.image_url || img.image}
                  alt={img.title || `Gambar ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
