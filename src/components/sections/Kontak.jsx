import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Marker for Leaflet
const customMarkerIcon = new L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color: #1e40af; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(30, 64, 175, 0.6);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function Kontak({ settings, initialCategory }) {
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <section id="kontak" className="py-20 lg:py-28 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">Hubungi Kami</h2>
          <p className="text-slate-500 dark:text-slate-400">Konsultasikan kebutuhan proyek Anda bersama tim kami</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column — Map */}
          <div className="lg:col-span-5 reveal-left h-full flex flex-col">
            {/* Map */}
            <div className="flex-grow w-full min-h-[400px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-900 shadow-sm">
              <MapContainer 
                center={[-7.385345, 112.717253]} 
                zoom={14} 
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
              >
                {/* TileLayer is styled by global CSS for dark mode */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-7.385345, 112.717253]} icon={customMarkerIcon}>
                  <Popup>
                    <div className="text-center font-sans">
                      <strong className="text-slate-900 block mb-1">Griya Permata Gedangan</strong>
                      <span className="text-slate-500 text-xs">Sidoarjo, Jawa Timur</span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              
              {/* Floating Location Label (Clickable) */}
              <a 
                href="https://maps.google.com/?q=-7.385345,112.717253" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50 flex items-center space-x-2 transition-colors cursor-pointer shadow-sm" 
                style={{ zIndex: 10 }}
              >
                <MapPin className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" strokeWidth={2.5} />
                <span className="font-semibold text-xs text-slate-900 dark:text-white">Griya Permata Gedangan</span>
              </a>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 reveal-right">
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">Formulir Penawaran</h4>

            {/* Success Alert */}
            <div id="form-success-alert" className="hidden mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-start space-x-3 text-sm">
              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <strong className="font-semibold block">Pesan Terkirim!</strong>
                <span>Tim kami akan menanggapi pesan Anda dalam waktu 1x24 jam.</span>
              </div>
            </div>

            <form id="contact-form" className="space-y-5" noValidate>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-medium text-slate-500 dark:text-slate-400">Nama Lengkap *</label>
                  <input type="text" id="form-name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 transition-all" placeholder="Masukkan nama Anda" />
                  <span className="error-msg text-xs text-red-500 hidden">Nama lengkap wajib diisi</span>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-medium text-slate-500 dark:text-slate-400">Email Bisnis *</label>
                  <input type="email" id="form-email" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 transition-all" placeholder="contoh@perusahaan.com" />
                  <span className="error-msg text-xs text-red-500 hidden">Masukkan format email yang valid</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="form-phone" className="text-xs font-medium text-slate-500 dark:text-slate-400">No. Telepon / WhatsApp</label>
                  <input type="tel" id="form-phone" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 transition-all" placeholder="08123456789" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-medium text-slate-500 dark:text-slate-400">Kategori Layanan *</label>
                  <select 
                    id="form-subject" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 transition-all"
                  >
                    <option value="">Pilih kategori</option>
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
                <label htmlFor="form-message" className="text-xs font-medium text-slate-500 dark:text-slate-400">Detail Kebutuhan Proyek *</label>
                <textarea id="form-message" rows="4" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 transition-all" placeholder="Jelaskan rencana proyek Anda (lokasi, volume, estimasi anggaran)"></textarea>
                <span className="error-msg text-xs text-red-500 hidden">Tuliskan deskripsi pesan Anda</span>
              </div>

              <button type="submit" className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold py-3 rounded-lg transition-colors text-sm">
                Kirim Formulir Penawaran
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
