import React from 'react';
import { FileText, Activity, CreditCard, ShieldCheck } from 'lucide-react';

const sertifikasiData = [
  {
    icon: FileText,
    code: 'SBU',
    label: 'Sertifikat Badan Usaha',
    desc: 'Terdaftar resmi pada Lembaga Pengembangan Jasa Konstruksi (LPJK) Klasifikasi BG & SI.',
  },
  {
    icon: Activity,
    code: 'NIB',
    label: 'Nomor Induk Berusaha',
    desc: 'Beroperasi secara legal penuh di bawah koordinasi BKPM (OSS RBA Elektronik).',
  },
  {
    icon: CreditCard,
    code: 'NPWP',
    label: 'Wajib Pajak Badan',
    desc: 'Ketaatan administrasi perpajakan negara secara disiplin, tertib, dan berkala.',
  },
  {
    icon: ShieldCheck,
    code: 'Standard K3',
    label: 'Sertifikat SMK3',
    desc: 'Sertifikasi Sistem Manajemen Keselamatan dan Kesehatan Kerja di lingkungan proyek.',
  },
];

export default function Sertifikasi() {
  return (
    <section id="sertifikasi" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 reveal">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">Sertifikasi & Legalitas</h2>
        <p className="text-slate-500 dark:text-slate-400">Kredibilitas dan legalitas usaha yang terjamin</p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sertifikasiData.map((item) => (
          <div key={item.code} className="reveal bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-center">
            <div className="w-12 h-12 bg-blue-800/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center mx-auto mb-5 text-blue-800 dark:text-blue-400">
              <item.icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-1">{item.code}</h4>
            <span className="inline-block text-xs font-medium text-blue-800 dark:text-blue-400 bg-blue-800/5 dark:bg-blue-400/10 px-3 py-1 rounded-md mb-4">{item.label}</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
  );
}
