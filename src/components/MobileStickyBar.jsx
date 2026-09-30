// src/components/MobileStickyBar.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { getWhatsAppLink, downloadVCard } from '../utils/contact';
import { UserPlus, MessageSquare, Handshake } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useToast } from './Toast';

export default function MobileStickyBar({ onOpenConnect }) {
  const { profile } = useProfile();
  const { showToast } = useToast();

  const handleVCard = () => {
    downloadVCard(profile);
    showToast(`vCard downloaded! (${profile.name.replace(/\s+/g, '_')}.vcf) 📇`);
  };

  const handleWhatsApp = () => {
    showToast('Opening WhatsApp... 💬');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-dark-950/90 backdrop-blur-xl border-t border-slate-800/80 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Primary Connect Button */}
        <button
          onClick={onOpenConnect}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-emerald-500 active:bg-emerald-400 text-dark-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95"
        >
          <Handshake className="w-4 h-4" />
          <span>Connect</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={getWhatsAppLink(null, profile)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-dark-850 border border-slate-800 text-emerald-400 font-bold text-xs active:bg-dark-800"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>

        {/* Add to Contacts */}
        <button
          onClick={handleVCard}
          className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-dark-850 border border-slate-800 text-slate-200 font-bold text-xs active:bg-dark-800"
          aria-label="Add to contacts"
          title="Download vCard"
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
}
