// src/components/ConnectActions.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { getWhatsAppLink } from '../utils/contact';
import { LinkedInIcon, WhatsAppIcon } from './Icons';
import { QrCode, Handshake } from 'lucide-react';
import { useToast } from './Toast';

export default function ConnectActions({ onOpenConnect, onOpenQR }) {
  const { profile } = useProfile();
  const { showToast } = useToast();

  const handleWhatsApp = () => {
    showToast('Opening WhatsApp... 💬');
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Connect Button */}
      <button
        onClick={onOpenConnect}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-base shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer tracking-wide"
      >
        <Handshake className="w-5 h-5 text-dark-950" />
        <span>CONNECT WITH ME</span>
      </button>

      {/* Secondary Quick Action Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {/* Connect Action Sheet Trigger */}
        <button
          onClick={onOpenConnect}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>💛 Connect</span>
        </button>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink(null, profile)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-800 hover:border-emerald-500/30 text-slate-200 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* LinkedIn */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-800 hover:border-blue-500/30 text-slate-200 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <LinkedInIcon className="w-4 h-4 text-blue-400 shrink-0" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
