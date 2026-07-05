import React from 'react';
import { Eye, Zap, ShieldCheck, Award, Star, Clock, ShieldAlert } from 'lucide-react';

export default function Tentang() {
  return (
    <section id="tentang" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 reveal">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">Tentang Perusahaan</h2>
        <p className="text-slate-500 dark:text-slate-400">Mengenal lebih dekat CV. Starcon Sejahtera</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left — Text Content */}
        <div className="space-y-6 reveal-left">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white font-semibold">CV. Starcon Sejahtera</strong> adalah perusahaan yang bergerak di bidang jasa Kontraktor dan Perdagangan Umum (Barang dan Jasa). Berdiri sebagai badan usaha secara resmi pada tahun 2013 oleh sekumpulan tenaga muda yang ahli di bidangnya, profesional dan dinamis yang terintegrasi dalam disiplin kerja.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Kami, CV. Starcon Sejahtera berusaha untuk eksis sebagai salah satu Perusahaan Kontraktor di Indonesia yang mampu menangani pekerjaan-pekerjaan arsitektur, konstruksi sipil, baja, mekanikal elektrikal dan Pengadaan Barang dan Jasa Penunjang dengan akurasi, presisi, mutu dan kualitas sesuai dengan permintaan para Klien kami.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Hingga saat ini kami telah berhasil membangun kerjasama dengan beberapa klien kami dalam berbagai bentuk proyek pekerjaan dengan baik, untuk itu dengan mengucapkan rasa syukur, kami dengan bangga dapat menampilkan Profil Perusahaan kami, dengan harapan dapat mempresentasikan secara singkat aksebilitas perusahaan kami dan membuka pintu kerjasama sebagai mitra kepercayaan Anda. Terima Kasih.
          </p>

          {/* Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 bg-blue-800/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-400">
                  <Eye className="h-5 w-5" strokeWidth={2} />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">Visi</h4>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Menjadi kontraktor sipil terdepan di Indonesia yang menghasilkan karya konstruksi berkualitas tinggi dengan standard kelas dunia.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 bg-blue-800/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-400">
                  <Zap className="h-5 w-5" strokeWidth={2} />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">Misi</h4>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Menyediakan layanan konstruksi berintegritas, mengutamakan keselamatan kerja (K3), dan memberikan ketepatan waktu serta kepuasan optimal bagi mitra kerja.
              </p>
            </div>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative reveal-right">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop" alt="Pekerjaan Konstruksi Gedung Sipil" className="w-full h-[420px] object-cover" />
            
            {/* Floating K3 Card */}
            <div className="absolute bottom-5 left-5 right-5 glass-card p-4 rounded-xl flex items-center space-x-4">
              <div className="bg-blue-800 dark:bg-blue-600 text-white rounded-lg p-2.5 flex-shrink-0">
                <ShieldCheck className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white text-sm">Keselamatan Kerja Utama (K3)</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tersertifikasi & Berkomitmen Penuh</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Company Values */}
      <div className="mt-20">
        <h4 className="font-heading font-bold text-xl text-center text-slate-900 dark:text-white mb-10 reveal">Nilai-Nilai Perusahaan</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 reveal">
          
          {[
            { icon: ShieldCheck, title: 'Integritas', desc: 'Jujur, transparan, dan dapat dipercaya dalam setiap kesepakatan proyek.' },
            { icon: Award, title: 'Profesionalisme', desc: 'Bekerja dengan keahlian maksimal dan standard engineering yang tinggi.' },
            { icon: Star, title: 'Kualitas', desc: 'Material berstandard nasional dan pengerjaan yang kokoh dan rapi.' },
            { icon: Clock, title: 'Ketepatan Waktu', desc: 'Perencanaan matang (Gantt Chart) untuk penyelesaian tepat waktu.' },
            { icon: ShieldAlert, title: 'Keselamatan Kerja', desc: 'Nir-kecelakaan kerja (Zero Accident) dengan penerapan K3 yang ketat.' },
          ].map((item) => (
            <div key={item.title} className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="w-10 h-10 bg-blue-800/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-800 dark:text-blue-400 mx-auto mb-3">
                <item.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h5 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-1.5">{item.title}</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  </section>
  );
}
