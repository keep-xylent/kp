import React from 'react';
import { ChevronsDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
    
    <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      <img src="images/hero_bg.png" alt="CV. STARCON SEJAHTERA Project Site" className="w-full h-full object-cover object-center opacity-30 dark:opacity-40 scale-105 animate-pulse-slow" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-transparent dark:from-slate-950/90 dark:via-slate-950/70 dark:to-transparent"></div>
    </div>

    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 text-slate-900 dark:text-white">
      <div className="max-w-4xl animate-fade-in-up">
        
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full animate-ping"></span>
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Kontraktor Sipil Terpercaya</span>
        </div>
        
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight sm:leading-none mb-6">
          Membangun Masa Depan dengan <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-indigo-400">Kualitas</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Integritas</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8">
          Solusi Konstruksi Sipil dan Bangunan Profesional untuk Proyek Pemerintah, Swasta, dan Industri. Berpengalaman menyelesaikan berbagai mega-proyek nasional.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#kontak" className="text-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all">
            Hubungi Kami
          </a>
          <a href="#portofolio" className="text-center bg-slate-200/50 hover:bg-slate-300/50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 text-slate-800 dark:text-white font-bold px-8 py-4 rounded-lg backdrop-blur-sm transform hover:-translate-y-0.5 transition-all">
            Lihat Proyek
          </a>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
      <a href="#tentang" aria-label="Scroll Down">
        <ChevronsDown className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors" strokeWidth={2} />
      </a>
    </div>
  </section>
  );
}
