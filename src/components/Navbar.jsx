import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ onAdminClick }) {
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

  const navLinks = [
    { href: '#tentang', label: 'Tentang' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#sertifikasi', label: 'Sertifikasi' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <a href="#hero" className="flex items-center space-x-3">
            <img src="/images/logo_dark.png" alt="STARCON Logo" className="h-9 dark:hidden" />
            <img src="/images/logo_light.png" alt="STARCON Logo" className="h-9 hidden dark:block" />
          </a>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none" aria-label="Toggle Theme">
              {isDarkMode ? <Sun className="w-[18px] h-[18px]" strokeWidth={2} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={2} />}
            </button>
            
            <button
              onClick={onAdminClick}
              className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              Admin Panel
            </button>

            <a href="#kontak" className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              Hubungi Kami
            </a>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button onClick={toggleDarkMode} className="p-2 text-slate-500 dark:text-slate-400 rounded-lg">
              {isDarkMode ? <Sun className="w-[18px] h-[18px]" strokeWidth={2} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={2} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300 rounded-lg focus:outline-none" aria-label="Open Navigation Menu">
              {isMobileMenuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden bg-white/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onAdminClick && onAdminClick();
            }}
            className="block w-full text-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 py-2.5 rounded-lg text-sm font-medium"
          >
            Admin Panel
          </button>
          <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="block mx-1 mt-2 text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-2.5 rounded-lg text-sm">
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}
