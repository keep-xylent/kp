import React from 'react';
import { FolderKanban, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, activeGalleryProject, setActiveGalleryProject, onExit }) {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 space-y-2 flex-shrink-0 overflow-y-auto">
      <button
        onClick={() => {
          setActiveGalleryProject(null);
          setActiveTab('projects');
        }}
        className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
          activeTab === 'projects' && !activeGalleryProject
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
        }`}
      >
        <FolderKanban className="w-4 h-4" /> Kelola
      </button>

      <button
        onClick={() => {
          setActiveGalleryProject(null);
          setActiveTab('settings');
        }}
        className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
          activeTab === 'settings'
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
        }`}
      >
        <SettingsIcon className="w-4 h-4" /> Pengaturan
      </button>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
        <button
          onClick={onExit}
          className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Web
        </button>
      </div>
    </aside>
  );
}
