// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminProfileTab from './AdminProfileTab';
import AdminSkillsTab from './AdminSkillsTab';
import AdminProjectsTab from './AdminProjectsTab';
import AdminLeadershipTab from './AdminLeadershipTab';
import AdminSettingsTab from './AdminSettingsTab';
import { api } from '../../api/client';
import { useProfile } from '../../context/ProfileContext';
import { 
  User, 
  Cpu, 
  FolderGit2, 
  Award, 
  Settings, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [toastMessage, setToastMessage] = useState(null);

  const { refetch, dbEngine } = useProfile();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        return;
      }

      try {
        const res = await api.verifyAuth();
        if (res && res.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
          setIsAuthenticated(false);
        }
      } catch (err) {
        // If offline or local dev, keep token if exists
        setIsAuthenticated(Boolean(token));
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Verifying admin credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'leadership', label: 'Leadership', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-emerald-500 text-dark-950 font-bold text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-dark-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              GD
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white leading-tight">Admin Dashboard</h1>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>DB: {dbEngine}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-emerald-400 font-semibold text-xs border border-emerald-500/25 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Preview Public Profile</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs border border-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-2 border-t border-slate-800/60 pt-2 pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-dark-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'profile' && <AdminProfileTab onToast={showToast} />}
        {activeTab === 'skills' && <AdminSkillsTab onToast={showToast} />}
        {activeTab === 'projects' && <AdminProjectsTab onToast={showToast} />}
        {activeTab === 'leadership' && <AdminLeadershipTab onToast={showToast} />}
        {activeTab === 'settings' && <AdminSettingsTab onToast={showToast} />}
      </main>
    </div>
  );
}
