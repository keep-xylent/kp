import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export default function Portofolio() {
  return (
    <section id="portofolio" className="py-24 border-t border-slate-200 dark:border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-12 reveal">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Galeri Proyek</h2>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Portofolio Pekerjaan Kami</h3>
        <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-12 reveal">
        <button className="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-blue-600 text-white" data-filter="all">Semua</button>
        <button className="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700" data-filter="gedung">Gedung</button>
        <button className="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700" data-filter="jalan">Jalan</button>
        <button className="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700" data-filter="jembatan">Jembatan</button>
        <button className="filter-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700" data-filter="infrastruktur">Infrastruktur</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="portfolio-item reveal bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between" data-category="gedung">
          <div className="relative overflow-hidden group h-64">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" alt="Pembangunan Kantor Bupati" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
              <span className="text-white bg-blue-600 px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Selengkapnya</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Gedung</span>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2">Pembangunan Gedung Kantor Bupati Utama</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Pembangunan struktur beton bertulang 4 lantai modern dengan fasad kaca hemat energi.</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> Samarinda, Kaltim</span>
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-500" /> 2025</span>
            </div>
          </div>
        </div>

        <div className="portfolio-item reveal bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between" data-category="jalan">
          <div className="relative overflow-hidden group h-64">
            <img src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop" alt="Pelebaran Jalan Trans" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
              <span className="text-white bg-blue-600 px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Selengkapnya</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Jalan</span>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2">Pelebaran Jalan Trans Sulawesi</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Pekerjaan pelebaran jalan nasional sepanjang 12 KM menggunakan aspal hotmix bermutu AC-WC.</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> Mamuju, Sulawesi Barat</span>
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-500" /> 2024</span>
            </div>
          </div>
        </div>

        <div className="portfolio-item reveal bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between" data-category="jembatan">
          <div className="relative overflow-hidden group h-64">
            <img src="https://images.unsplash.com/photo-1545624446-43a77ab172c2?q=80&w=600&auto=format&fit=crop" alt="Jembatan Rangka Baja" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
              <span className="text-white bg-blue-600 px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Selengkapnya</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Jembatan</span>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2">Jembatan Beton Pelengkung Sungai Cimanuk</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Konstruksi jembatan penghubung antar desa dengan bentang 60 Meter fondasi tiang pancang.</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> Garut, Jawa Barat</span>
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-500" /> 2024</span>
            </div>
          </div>
        </div>

        <div className="portfolio-item reveal bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between" data-category="infrastruktur">
          <div className="relative overflow-hidden group h-64">
            <img src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop" alt="Drainase Perkotaan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
              <span className="text-white bg-blue-600 px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">Selengkapnya</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Infrastruktur</span>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2">Sistem Drainase & Pintu Air Kawasan Industri</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Pembangunan drainase beton U-Ditch 150x150 cm penanggulangan genangan air.</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> Bekasi, Jawa Barat</span>
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-blue-500" /> 2023</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
  );
}
