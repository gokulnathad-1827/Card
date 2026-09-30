// src/components/NetworkingSection.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { UserPlus, Share2, Calendar } from 'lucide-react';
import { LinkedInIcon } from './Icons';
import { downloadVCard } from '../utils/contact';
import { shareProfile } from '../utils/sharing';
import { useToast } from './Toast';

export default function NetworkingSection({ onOpenConnect }) {
  const { profile } = useProfile();
  const { showToast } = useToast();

  const handleVCard = () => {
    downloadVCard(profile);
    showToast(`Contact card downloaded! (${profile.name.replace(/\s+/g, '_')}.vcf) 📇`);
  };

  const handleShare = async () => {
    const res = await shareProfile(profile);
    if (res.method === 'copy') {
      showToast('Profile link copied! 📋');
    }
  };

  return (
    <section className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Event Networking Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-dark-900 via-dark-850 to-dark-900 border-2 border-emerald-500/40 shadow-2xl text-center overflow-hidden">
          {/* Subtle green ambient light */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/20 blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Event &amp; Conference Companion</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Met Me at an Event?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Great meeting you! Save my contact and let's stay connected beyond the event.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
            {/* Add to Contacts */}
            <button
              onClick={handleVCard}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add to Contacts</span>
            </button>

            {/* Share My Profile */}
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Share My Profile</span>
            </button>

            {/* Connect on LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-700 border border-blue-500/30 text-blue-400 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LinkedInIcon className="w-4 h-4 text-blue-400" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          <div className="mt-6 text-xs text-slate-400">
            Aishwarya 2K26 • IEEE Technical Events • Hackathons • Meetups
          </div>
        </div>

      </div>
    </section>
  );
}
