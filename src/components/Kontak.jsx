import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Marker for Leaflet
const customMarkerIcon = new L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function Kontak() {
  return (
    <section id="kontak" className="py-24 border-t border-slate-200 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Kontak Kami</h2>
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">Konsultasikan Proyek Anda</h3>
          <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">


          <div className="lg:col-span-5 space-y-8 reveal-left">
            <h4 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Informasi Kantor</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Hubungi kantor representatif kami atau kunjungi alamat kami untuk berdiskusi langsung mengenai RAB, desain perencanaan sipil, atau tender proyek.
            </p>


            <div className="space-y-4">


              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-xl flex-shrink-0">
                  <MapPin className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">Alamat Kantor</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Griya Permata Gedangan Blok I3 No.9 Gedangan, Kabupaten Sidoarjo, Jawa Timur - 61254, Indonesia
                  </p>
                </div>
              </div>


              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-xl flex-shrink-0">
                  <Phone className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">Telepon & WhatsApp</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Telepon: (021) 555-8899 <br />
                    WhatsApp: +62 812-3456-7890 (Fast Response)
                  </p>
                </div>
              </div>


              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-xl flex-shrink-0">
                  <Mail className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">E-mail Resmi</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    info@starconsejahtera.co.id <br />
                    tender@starconsejahtera.co.id
                  </p>
                </div>
              </div>

            </div>


            <div className="h-64 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-200 dark:bg-slate-900 group">
              <MapContainer 
                center={[-7.4235029, 112.7225139]} 
                zoom={14} 
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
              >
                {/* CartoDB Dark Matter theme for Leaflet */}
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[-7.4235029, 112.7225139]} icon={customMarkerIcon}>
                  <Popup>
                    <div className="text-center font-sans">
                      <strong className="text-slate-900 block mb-1">Griya Permata Gedangan</strong>
                      <span className="text-slate-500 text-xs">Sidoarjo, Jawa Timur</span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              
              {/* Floating Location Card (Elegant) */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center space-x-3 pointer-events-none transition-all" style={{ zIndex: 10 }}>
                <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-full flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white tracking-wide">Griya Permata Gedangan</h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Sidoarjo, Jawa Timur</p>
                </div>
              </div>
              
              {/* Tombol Open Map */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 10 }}>
                 <a href="https://maps.google.com/?q=Griya+Permata+Gedangan+Sidoarjo" target="_blank" rel="noopener noreferrer" className="bg-blue-600/95 backdrop-blur-sm hover:bg-blue-700 text-white text-[11px] font-bold px-4 py-2.5 rounded-xl shadow-lg pointer-events-auto transition-all flex items-center">
                   <MapPin className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} /> Buka di Aplikasi Maps
                 </a>
              </div>
            </div>
          </div>


          <div className="lg:col-span-7 h-fit bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm reveal-right">
            <h4 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-6">Formulir Pesan</h4>


            <div id="form-success-alert" className="hidden mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-emerald-800 dark:text-emerald-300 flex items-start space-x-3 text-sm">
              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <strong className="font-bold block">Pesan Terkirim!</strong>
                <span>Terima kasih telah menghubungi kami. Tim kami akan segera menanggapi pesan Anda dalam waktu 1x24 jam.</span>
              </div>
            </div>

            <form id="contact-form" className="space-y-6" novalidate="true">


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nama Lengkap *</label>
                  <input type="text" id="form-name" className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400/70 dark:placeholder:text-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Masukkan nama Anda" />
                  <span className="error-msg text-xs text-red-500 hidden">Nama lengkap wajib diisi</span>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Bisnis *</label>
                  <input type="email" id="form-email" className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400/70 dark:placeholder:text-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="contoh@perusahaan.com" />
                  <span className="error-msg text-xs text-red-500 hidden">Masukkan format email yang valid</span>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="form-phone" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">No. Telepon / WhatsApp</label>
                  <input type="tel" id="form-phone" className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400/70 dark:placeholder:text-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Contoh: 08123456789" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kategori Layanan *</label>
                  <select id="form-subject" className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400/70 dark:placeholder:text-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option value=""> --- </option>
                    <option value="gedung">Konstruksi Gedung / Kantor</option>
                    <option value="jalan">Pekerjaan Jalan / Beton</option>
                    <option value="jembatan">Pembangunan Jembatan</option>
                    <option value="infrastruktur">Sistem Irigasi / Drainase</option>
                    <option value="renovasi">Renovasi Bangunan Komersial</option>
                    <option value="desain">Perencanaan & Pengawasan Proyek</option>
                    <option value="lainnya">Pertanyaan Umum / Tender Lain</option>
                  </select>
                  <span className="error-msg text-xs text-red-500 hidden">Silakan pilih salah satu kategori</span>
                </div>
              </div>


              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Detail Kebutuhan Proyek *</label>
                <textarea id="form-message" rows="5" className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400/70 dark:placeholder:text-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Jelaskan kebutuhan rencana proyek Anda (Lokasi, perkiraan volume, estimasi anggaran, dll)"></textarea>
                <span className="error-msg text-xs text-red-500 hidden">Tuliskan deskripsi pesan Anda</span>
              </div>


              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all text-center">
                Kirim Formulir Penawaran
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
