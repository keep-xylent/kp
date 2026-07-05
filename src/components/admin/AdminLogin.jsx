import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLogin({
  email,
  setEmail,
  password,
  setPassword,
  authError,
  authLoading,
  handleLogin,
  onExit,
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 p-8 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">STARCON Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Log in untuk mengelola portofolio proyek</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {authError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@starcon.id"
              required
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 disabled:bg-slate-900/50 dark:disabled:bg-white/50 text-white dark:text-slate-900 font-semibold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In'}
          </button>
        </form>

        <button
          onClick={onExit}
          className="w-full mt-6 text-center text-xs font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ← Kembali ke Website Utama
        </button>
      </div>
    </div>
  );
}
