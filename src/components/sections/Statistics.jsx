import React, { useEffect, useRef, useState } from 'react';
import { getSettings } from '../../api/settings';

const Counter = ({ target, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (target === undefined || target === null) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const duration = 2000;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        } else {
          setCount(0);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export default function Statistics() {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const settings = await getSettings();
        if (settings) {
          setStatsData([
            { target: parseInt(settings.stats_projects) || 214, suffix: '+', label: 'Proyek Selesai' },
            { target: parseInt(settings.stats_years) || 9, suffix: '+', label: 'Tahun Pengalaman' },
            { target: parseInt(settings.stats_clients) || 74, suffix: '+', label: 'Klien Puas' },
            { target: parseInt(settings.stats_quality) || 99, suffix: '%', label: 'Komitmen Kualitas' },
          ]);
        }
      } catch (err) {
        console.error("Gagal memuat statistik", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="statistics" className="py-16 lg:py-20 bg-slate-900 dark:bg-slate-900 text-white min-h-[250px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {statsData && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {statsData.map((item) => (
              <div key={item.label} className="text-center reveal">
                <div className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2">
                  <Counter target={item.target} suffix={item.suffix} />
                </div>
                <p className="text-sm text-slate-400 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

