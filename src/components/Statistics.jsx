import React, { useEffect, useRef, useState } from 'react';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quart
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        } else {
          setCount(0); // Reset saat keluar dari layar
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={elementRef} className="counter-val">{count}</span>;
};

export default function Statistics() {
  return (
    <section id="statistics" className="py-20 relative bg-transparent text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-slate-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">

          <div className="space-y-2 reveal">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-blue-500">
              <Counter target={215} />+
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">Proyek Selesai</p>
          </div>


          <div className="space-y-2 reveal" >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-blue-500">
              <Counter target={10} />+
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">Tahun Pengalaman</p>
          </div>


          <div className="space-y-2 reveal" >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-blue-500">
              <Counter target={75} />+
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">Klien Puas</p>
          </div>


          <div className="space-y-2 reveal" >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-blue-500">
              <Counter target={100} />%
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">Komitmen Kualitas</p>
          </div>
        </div>

      </div>
    </section>
  );
}
