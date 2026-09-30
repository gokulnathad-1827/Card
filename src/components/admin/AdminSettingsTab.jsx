// src/components/admin/AdminSettingsTab.jsx
import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../api/client';
import { ShieldCheck, Key, Database, RefreshCw, Check, AlertCircle } from 'lucide-react';

export default function AdminSettingsTab({ onToast }) {
  const { dbEngine, isOffline, refetch } = useProfile();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }
    if (newPassword.length < 4) {
      setErrorMsg('New password must be at least 4 characters long');
      return;
    }

    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await api.updatePassword(currentPassword, newPassword);
      if (res && res.success) {
        setSuccessMsg('Admin password updated successfully! Please use your new password next time.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (onToast) onToast('Password updated successfully!');
      } else {
        setErrorMsg(res?.error || 'Failed to update password');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Database & System Info */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>System & Database Status</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Database Engine</span>
            <span className="text-sm font-bold text-emerald-400 uppercase mt-1 block">
              {dbEngine === 'supabase' ? '⚡ Supabase PostgreSQL' : '💾 Local File DB (JSON Engine)'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Backend Connection</span>
            <span className={`text-sm font-bold mt-1 block ${isOffline ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isOffline ? 'Offline / Static Client' : 'Active REST API Server'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Admin Session</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block">
              Authenticated JWT
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Database Connection</span>
          </button>
        </div>
      </div>

      {/* Security & Password Form */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Admin Security Credentials</span>
        </h2>
        <p className="text-xs text-slate-400">
          Change your admin account password. Default username is <code className="text-emerald-400">admin</code>.
        </p>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
            <span>{loading ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
