// src/components/Footer.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Heart } from 'lucide-react';

export default function Footer() {
  const { profile } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-800/80 bg-dark-950 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>© {currentYear} <strong className="text-slate-200">{profile.name}</strong>.</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-emerald-400 font-mono font-semibold">{profile.personalSignature}</span>
        </div>

        {/* Center/Right: Subtitle */}
        <div className="flex items-center gap-1.5 text-slate-400 text-center">
          <span>Digital Networking Profile</span>
          <span className="text-slate-500">•</span>
          <span>{profile.college}</span>
        </div>

      </div>
    </footer>
  );
}
