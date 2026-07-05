import React, { useEffect, useState } from 'react';
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
import ProjectDetail from './components/ProjectDetail';
import AdminDashboard from './components/AdminDashboard';
import { getSettings } from './api/settings';

function App() {
  // null = show main site; number = show project detail for that ID
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(() => window.location.pathname === '/admin');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, [isAdminMode]);

  const handleViewDetail = (id) => {
    setActiveProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [contactCategory, setContactCategory] = useState("");

  const handleBackToPortfolio = (targetSection = 'portofolio', category = null) => {
    setActiveProjectId(null);
    if (category) {
      setContactCategory(category);
    }
    // Scroll to section after returning
    setTimeout(() => {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    // Force page to start from the top on load/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    // Intersection Observer for scroll-reveal animations
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [isAdminMode]);

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    window.history.pushState({}, '', '/');
  };

  if (isAdminMode) {
    return <AdminDashboard onExit={handleExitAdmin} />;
  }

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <Navbar settings={settings} />

      {/* Detail View */}
      {activeProjectId !== null && (
        <ProjectDetail
          projectId={activeProjectId}
          onBack={handleBackToPortfolio}
        />
      )}

      {/* Main Page View - hidden when detail is open */}
      <div className={activeProjectId !== null ? 'hidden' : ''}>
        <Hero />
        <Tentang />
        <Layanan />
        <Statistics />
        <Portofolio onViewDetail={handleViewDetail} />
        <Sertifikasi />
        <Kontak settings={settings} initialCategory={contactCategory} />
      </div>

      <Footer settings={settings} />
    </div>
  );
}

export default App;
