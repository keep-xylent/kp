import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tentang from './components/Tentang';
import Layanan from './components/Layanan';
import Statistics from './components/Statistics';
import Portofolio from './components/Portofolio';
import Sertifikasi from './components/Sertifikasi';
import Kontak from './components/Kontak';
import Footer from './components/Footer';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll || 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Memaksa halaman selalu mulai dari paling atas (Hero) saat pertama kali dimuat/direfresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Hapus hash fragment (#layanan dll) dari URL agar browser tidak memaksa lompat ke bawah
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Gunakan timeout kecil untuk menimpa perilaku scroll bawaan browser
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Menghapus class active saat elemen keluar dari layar
          // agar animasi diputar ulang saat di-scroll kembali
          entry.target.classList.remove('active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Gunakan setTimeout kecil untuk memastikan DOM sudah dirender sepenuhnya
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-slate-50 to-cyan-100 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-900 animate-gradient text-slate-800 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 z-[100] origin-left"
        style={{ transform: `scaleX(${scrollProgress})`, width: '100%', transition: 'transform 0.1s ease-out' }}
      ></div>
        <Navbar />
  <Hero />
  <Tentang />
  <Layanan />
  <Statistics />
  <Portofolio />
  <Sertifikasi />
  <Kontak />
  <Footer />
    </div>
  );
}
export default App;
