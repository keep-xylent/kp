import React from 'react';
import { FileText, Activity, CreditCard } from 'lucide-react';

export default function Sertifikasi() {
  return (
    <section id="sertifikasi" className="py-24 bg-transparent border-t border-slate-200 dark:border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      
      <div className="text-center max-w-3xl mx-auto mb-16 reveal">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Legalitas Resmi</h2>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Sertifikasi & Kredibilitas Usaha</h3>
        <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:shadow-md transition-shadow text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <FileText className="h-8 w-8" strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">SBU</h4>
          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full w-max mx-auto mb-4">Sertifikat Badan Usaha</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Terdaftar resmi pada Lembaga Pengembangan Jasa Konstruksi (LPJK) Klasifikasi BG & SI.</p>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:shadow-md transition-shadow text-center" >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <Activity className="h-8 w-8" strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">NIB</h4>
          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full w-max mx-auto mb-4">Nomor Induk Berusaha</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Beroperasi secara legal penuh di bawah koordinasi BKPM (OSS RBA Elektronik).</p>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:shadow-md transition-shadow text-center" >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <CreditCard className="h-8 w-8" strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">NPWP</h4>
          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full w-max mx-auto mb-4">Wajib Pajak Badan</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Ketaatan administrasi perpajakan negara secara disiplin, tertib, dan berkala.</p>
        </div>

        
        <div className="reveal bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 hover:shadow-md transition-shadow text-center" >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">Standard K3</h4>
          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full w-max mx-auto mb-4">Sertifikat SMK3</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Sertifikasi Sistem Manajemen Keselamatan dan Kesehatan Kerja di lingkungan proyek.</p>
        </div>

      </div>

    </div>
  </section>
  );
}
