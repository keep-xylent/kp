import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="images/hero_bg.jpg" alt="CV. STARCON SEJAHTERA Project Site" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/85"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl animate-fade-in-up">

          <p className="text-sm font-semibold text-blue-800 dark:text-blue-400 tracking-wide uppercase mb-4">
            CV. Starcon Sejahtera
          </p>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6">
            Membangun Masa Depan<br className="hidden sm:block" /> dengan Kualitas &amp; Integritas
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
            Solusi konstruksi sipil dan bangunan profesional untuk proyek pemerintah, swasta, dan industri. Berpengalaman menyelesaikan berbagai mega-proyek nasional.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#kontak" className="inline-flex items-center justify-center bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold px-7 py-3 rounded-lg transition-colors text-sm">
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
            </a>
            <a href="#portofolio" className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-7 py-3 rounded-lg transition-colors text-sm">
              Lihat Portofolio
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
