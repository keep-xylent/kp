import React from 'react';
import { Loader2 } from 'lucide-react';

export default function SettingsTab({ settingsData, setSettingsData, handleSettingsSubmit, settingsLoading }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pengaturan Website</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Konfigurasi statistik beranda dan preferensi website</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 w-full">
        <form onSubmit={handleSettingsSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section: Nilai Statistik (Compact) */}
            <div className="space-y-5 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                Nilai Statistik
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Proyek Selesai</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={settingsData.stats_projects || ''}
                      onChange={(e) => setSettingsData({...settingsData, stats_projects: e.target.value})}
                      disabled={settingsData.stats_mode === 'auto'}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                    />
                    <label className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={settingsData.stats_mode === 'auto'}
                        onChange={(e) => setSettingsData({...settingsData, stats_mode: e.target.checked ? 'auto' : 'manual'})}
                        className="w-3.5 h-3.5 accent-slate-900 dark:accent-slate-100"
                      />
                      <span className="text-xxs text-slate-500 font-medium whitespace-nowrap">Auto (DB)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Pengalaman (Th)</label>
                  <input
                    type="number"
                    value={settingsData.stats_years || ''}
                    onChange={(e) => setSettingsData({...settingsData, stats_years: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Klien Puas</label>
                  <input
                    type="number"
                    value={settingsData.stats_clients || ''}
                    onChange={(e) => setSettingsData({...settingsData, stats_clients: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Komitmen Kualitas (%)</label>
                  <input
                    type="number"
                    value={settingsData.stats_quality || ''}
                    onChange={(e) => setSettingsData({...settingsData, stats_quality: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section: Info Personal */}
            <div className="space-y-5 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-full">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                Info Personal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Nomor WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+628123456789"
                    value={settingsData.contact_wa || ''}
                    onChange={(e) => setSettingsData({...settingsData, contact_wa: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Telepon Kantor</label>
                  <input
                    type="text"
                    placeholder="(021) 555-8899"
                    value={settingsData.contact_phone || ''}
                    onChange={(e) => setSettingsData({...settingsData, contact_phone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Alamat Email</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    value={settingsData.contact_email || ''}
                    onChange={(e) => setSettingsData({...settingsData, contact_email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Username Instagram</label>
                  <input
                    type="text"
                    placeholder="@username_ig"
                    value={settingsData.contact_ig || ''}
                    onChange={(e) => setSettingsData({...settingsData, contact_ig: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">Alamat Kantor</label>
                  <textarea
                    rows="3"
                    placeholder="Alamat lengkap..."
                    value={settingsData.contact_address || ''}
                    onChange={(e) => setSettingsData({...settingsData, contact_address: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              disabled={settingsLoading}
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 disabled:bg-slate-900/50 dark:disabled:bg-white/50 text-white dark:text-slate-900 px-8 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
            >
              {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
