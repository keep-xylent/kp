import React from 'react';
import { Building2, Map, Network, Droplets, Wrench, ClipboardCheck } from 'lucide-react';

const layananData = [
  {
    icon: Building2,
    title: 'Konstruksi Gedung',
    desc: 'Pembangunan gedung perkantoran, hotel, apartemen, perumahan eksklusif, ruko, dan fasilitas industri dari tahap pembersihan lahan hingga serah terima kunci.',
  },
  {
    icon: Map,
    title: 'Pembangunan Jalan',
    desc: 'Jasa pengaspalan jalan raya (hotmix), pembetonan jalan (rigid pavement), pengerasan jalan tanah, serta penataan jalan kawasan industri dan perumahan.',
  },
  {
    icon: Network,
    title: 'Pembangunan Jembatan',
    desc: 'Konstruksi jembatan beton bertulang, jembatan baja rangka, jembatan gantung skala kecil-menengah untuk kawasan perkotaan maupun pedesaan terpencil.',
  },
  {
    icon: Droplets,
    title: 'Infrastruktur Drainase',
    desc: 'Pembuatan saluran air (box culvert), tanggul penahan banjir, irigasi sawah, instalasi pipa pembuangan, kolam retensi, dan normalisasi sungai perkotaan.',
  },
  {
    icon: Wrench,
    title: 'Renovasi Bangunan',
    desc: 'Pekerjaan restorasi, penambahan struktur lantai, retrofit ketahanan gempa, perubahan tata letak interior, serta pengecatan ulang gedung operasional aktif.',
  },
  {
    icon: ClipboardCheck,
    title: 'Perencanaan & Pengawasan',
    desc: 'Jasa konsultansi engineering (DED/Detail Engineering Design), perhitungan struktur bangunan (SAP2000), estimasi biaya proyek (RAB), dan pengawasan berkala.',
  },
];

export default function Layanan() {
  return (
    <section id="layanan" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 reveal">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">Layanan Konstruksi</h2>
        <p className="text-slate-500 dark:text-slate-400">Solusi konstruksi terintegrasi untuk berbagai kebutuhan proyek</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layananData.map((item) => (
          <div key={item.title} className="reveal bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 bg-blue-800/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-400 mb-5">
              <item.icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-semibold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
  );
}
