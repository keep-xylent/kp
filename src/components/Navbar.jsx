import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-24">
          
          <a href="#hero" className="flex items-center space-x-3 group">
            <img src="/images/logo_dark.png" alt="STARCON Logo" className="h-14 dark:hidden" />
            <img src="/images/logo_light.png" alt="STARCON Logo" className="h-14 hidden dark:block" />
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#tentang" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tentang Kami</a>
            <a href="#layanan" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Layanan</a>
            <a href="#portofolio" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Portofolio</a>
            <a href="#sertifikasi" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sertifikasi</a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none" aria-label="Toggle Theme">
              {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
            </button>
            
            <a href="#kontak" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all">
              Hubungi Kami
            </a>
          </div>

          <div className="flex items-center space-x-3 lg:hidden">
            <button onClick={toggleDarkMode} className="p-2 text-slate-500 dark:text-slate-400 rounded-lg">
              {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none" aria-label="Open Navigation Menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
          <a href="#tentang" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Tentang Kami</a>
          <a href="#layanan" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Layanan</a>
          <a href="#portofolio" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Portofolio</a>
          <a href="#sertifikasi" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Sertifikasi</a>
          <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="block mx-3 my-2 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md">Hubungi Kami</a>
        </div>
      </div>
    </nav>
  );
}
