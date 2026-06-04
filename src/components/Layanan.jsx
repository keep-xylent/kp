import React from 'react';
import { Building2, Map, Network, Droplets, Wrench, ClipboardCheck } from 'lucide-react';

export default function Layanan() {
  return (
    <section id="layanan" className="py-24 bg-transparent relative border-t border-slate-200 dark:border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      
      <div className="text-center max-w-3xl mx-auto mb-16 reveal">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Layanan Kami</h2>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Solusi Konstruksi Terintegrasi</h3>
        <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Building2 className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Konstruksi Gedung</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Pembangunan gedung perkantoran, hotel, apartemen, perumahan eksklusif, ruko, dan fasilitas industri dari tahap pembersihan lahan hingga serah terima kunci.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between" >
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Map className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Pembangunan Jalan</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Jasa pengaspalan jalan raya (hotmix), pembetonan jalan (rigid pavement), pengerasan jalan tanah, serta penataan jalan kawasan industri dan perumahan.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between" >
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Network className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Pembangunan Jembatan</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Konstruksi jembatan beton bertulang, jembatan baja rangka, jembatan gantung skala kecil-menengah untuk kawasan perkotaan maupun pedesaan terpencil.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between" >
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Droplets className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Infrastruktur Drainase</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Pembuatan saluran air (box culvert), tanggul penahan banjir, irigasi sawah, instalasi pipa pembuangan, kolam retensi, dan normalisasi sungai perkotaan.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between" >
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Wrench className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Renovasi Bangunan</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Pekerjaan restorasi, penambahan struktur lantai, retrofit ketahanan gempa, perubahan tata letak interior, serta pengecatan ulang gedung operasional aktif.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 scale-hover shadow-sm flex flex-col justify-between" >
          <div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <ClipboardCheck className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">Perencanaan & Pengawasan</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Jasa konsultansi engineering (DED/Detail Engineering Design), perhitungan struktur bangunan (SAP2000), estimasi biaya proyek (RAB), dan pengawasan berkala.
            </p>
          </div>
          <span className="block text-blue-600 dark:text-blue-400 text-xs font-bold mt-6 tracking-wider uppercase">Selengkapnya &rarr;</span>
        </div>

      </div>

    </div>
  </section>
  );
}
