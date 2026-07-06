import React from 'react';
import { FolderKanban, Settings as SettingsIcon, ArrowLeft, X } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, activeGalleryProject, setActiveGalleryProject, onExit, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 space-y-2 flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out
      md:static md:translate-x-0 md:bg-white md:dark:bg-slate-900/50
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between mb-4 md:hidden">
        <span className="font-bold text-slate-900 dark:text-white">Menu</span>
        <button onClick={() => setIsSidebarOpen(false)} className="p-1 -mr-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => {
          setActiveGalleryProject(null);
          setActiveTab('projects');
          if (setIsSidebarOpen) setIsSidebarOpen(false);
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
          if (setIsSidebarOpen) setIsSidebarOpen(false);
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
