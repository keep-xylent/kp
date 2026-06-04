import React from 'react';
import { Eye, Zap, ShieldCheck, Award, Star, Clock, ShieldAlert } from 'lucide-react';

export default function Tentang() {
  return (
    <section id="tentang" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      
      <div className="text-center max-w-3xl mx-auto mb-16 reveal">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Tentang Kami</h2>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">CV. STARCON SEJAHTERA</h3>
        <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6 reveal-left">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            <strong className="text-blue-600 dark:text-blue-400 font-semibold">CV. Starcon Sejahtera</strong> adalah perusahaan yang bergerak di bidang jasa Kontraktor dan Perdagangan Umum (Barang dan Jasa). Berdiri sebagai badan usaha secara resmi pada tahun 2013 oleh sekumpulan tenaga muda yang ahli di bidangnya, profesional dan dinamis yang terintegrasi dalam disiplin kerja.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Kami, CV. Starcon Sejahtera berusaha untuk eksis sebagai salah satu Perusahaan Kontraktor di Indonesia yang mampu menangani pekerjaan-pekerjaan arsitektur, konstruksi sipil, baja, mekanikal elektrikal dan Pengadaan Barang dan Jasa Penunjang dengan akurasi, presisi, mutu dan kualitas sesuai dengan permintaan para Klien kami.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Hingga saat ini kami telah berhasil membangun kerjasama dengan beberapa klien kami dalam berbagai bentuk proyek pekerjaan dengan baik, untuk itu dengan mengucapkan rasa syukur, kami dengan bangga dapat menampilkan Profil Perusahaan kami, dengan harapan dapat mempresentasikan secara singkat aksebilitas perusahaan kami dan membuka pintu kerjasama sebagai mitra kepercayaan Anda. Terima Kasih.
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Eye className="h-6 w-6" strokeWidth={2} />
              </div>
              <h4 className="font-heading font-bold text-lg text-slate-955 dark:text-white mb-2">Visi Kami</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Menjadi kontraktor sipil terdepan di Indonesia yang menghasilkan karya konstruksi berkualitas tinggi dengan standard kelas dunia.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Zap className="h-6 w-6" strokeWidth={2} />
              </div>
              <h4 className="font-heading font-bold text-lg text-slate-955 dark:text-white mb-2">Misi Kami</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Menyediakan layanan konstruksi berintegritas, mengutamakan keselamatan kerja (K3), dan memberikan ketepatan waktu serta kepuasan optimal bagi mitra kerja.
              </p>
            </div>
          </div>
        </div>

        
        <div className="relative reveal-right">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 scale-95 opacity-10"></div>
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-800">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop" alt="Pekerjaan Konstruksi Gedung Sipil" className="w-full h-[400px] object-cover scale-100 hover:scale-105 transition-transform duration-700" />
            
            <div className="absolute bottom-6 left-6 right-6 glass-card p-5 rounded-2xl flex items-center space-x-4 border border-white/20">
              <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0 animate-bounce">
                <ShieldCheck className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Keselamatan Kerja Utama (K3)</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tersertifikasi & Berkomitmen Penuh dalam Keselamatan Lapangan</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      
      <div className="mt-24">
        <h4 className="font-heading font-extrabold text-2xl text-center text-slate-900 dark:text-white mb-12 reveal">Nilai-Nilai Perusahaan Kami</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          
          <div className="reveal bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center scale-hover shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <ShieldCheck className="h-6 w-6" strokeWidth={2} />
            </div>
            <h5 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Integritas</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400">Jujur, transparan, dan dapat dipercaya dalam setiap kesepakatan proyek.</p>
          </div>

          
          <div className="reveal bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center scale-hover shadow-sm" >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <Award className="h-6 w-6" strokeWidth={2} />
            </div>
            <h5 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Profesionalisme</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400">Bekerja dengan keahlian maksimal dan standard engineering yang tinggi.</p>
          </div>

          
          <div className="reveal bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center scale-hover shadow-sm" >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <Star className="h-6 w-6" strokeWidth={2} />
            </div>
            <h5 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Kualitas</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400">Material berstandard nasional dan pengerjaan yang kokoh dan rapi.</p>
          </div>

          
          <div className="reveal bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center scale-hover shadow-sm" >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <Clock className="h-6 w-6" strokeWidth={2} />
            </div>
            <h5 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Ketepatan Waktu</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400">Perencanaan matang (Gantt Chart) untuk penyelesaian tepat waktu.</p>
          </div>

          
          <div className="reveal bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center scale-hover shadow-sm" >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <ShieldAlert className="h-6 w-6" strokeWidth={2} />
            </div>
            <h5 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Keselamatan Kerja</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400">Nir-kecelakaan kerja (Zero Accident) dengan penerapan K3 yang ketat.</p>
          </div>

        </div>
      </div>

    </div>
  </section>
  );
}
