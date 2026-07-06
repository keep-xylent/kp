import React from 'react';
import { Sun, Moon, LogOut, Menu } from 'lucide-react';

export default function AdminHeader({ toggleDarkMode, isDarkMode, handleLogout, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className="h-16 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-6 flex items-center justify-between z-10 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <img src="/images/logo_dark.png" alt="Logo" className="h-7 dark:hidden" />
          <img src="/images/logo_light.png" alt="Logo" className="h-7 hidden dark:block" />
          <span className="font-bold text-slate-900 dark:text-white tracking-tight">DASHBOARD</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline-block">Halo, Admin</span>
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"
        >
          <LogOut className="w-3.5 h-3.5" /> Log Out
        </button>
      </div>
    </header>
  );
}
