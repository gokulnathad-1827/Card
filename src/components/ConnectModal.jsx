// src/components/ConnectModal.jsx
import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { getWhatsAppLink, getEmailLink, getCallLink, downloadVCard } from '../utils/contact';
import { shareProfile } from '../utils/sharing';
import { 
  X, 
  MessageSquare, 
  Mail, 
  PhoneCall, 
  UserPlus, 
  Share2, 
  FileText, 
  Globe, 
  Check, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { 
  LinkedInIcon, 
  GitHubIcon, 
  WhatsAppIcon, 
  InstagramIcon, 
  LeetCodeIcon 
} from './Icons';
import { useToast } from './Toast';

export default function ConnectModal({ isOpen, onClose }) {
  const { profile } = useProfile();
  const { showToast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleVCard = () => {
    downloadVCard(profile);
    showToast(`vCard downloaded! (${profile.name.replace(/\s+/g, '_')}.vcf) 📇`);
  };

  const handleShare = async () => {
    const res = await shareProfile(profile);
    if (res.method === 'copy') {
      setCopiedLink(true);
      showToast('Profile link copied to clipboard! 📋');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const resumeLink = profile.resumeUrl || profile.resume || "https://drive.google.com/file/d/1BIJLPu0KMZcQcoaJEBM9fVk1u7V0lnQE/view?usp=sharing";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-dark-950/80 backdrop-blur-md animate-fade-in">
      {/* Modal backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Container */}
      <div className="relative w-full max-w-lg bg-dark-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-dark-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              GD
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white leading-tight">
                Connect with {profile.name}
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                {profile.shortRole}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close connect sheet"
            className="p-2 rounded-xl bg-dark-850 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Action 1: Add to Contacts */}
          <button
            onClick={handleVCard}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-sm transition-all shadow-lg shadow-emerald-950/50 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-dark-950/20 text-dark-950">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">Add to Contacts (vCard)</span>
                <span className="text-[11px] font-normal opacity-80 block mt-0.5">
                  Save phone, email &amp; portfolio directly
                </span>
              </div>
            </div>
            <Sparkles className="w-4 h-4 shrink-0 opacity-80 group-hover:scale-110 transition-transform" />
          </button>

          {/* Core Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp */}
            <a
              href={getWhatsAppLink(null, profile)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition-colors group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-slate-100 font-bold block truncate">WhatsApp</span>
                <span className="text-[10px] text-slate-400 block truncate">Direct message</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-blue-500/30 text-blue-400 font-semibold text-xs transition-colors group"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-slate-100 font-bold block truncate">LinkedIn</span>
                <span className="text-[10px] text-slate-400 block truncate">Professional profile</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={getEmailLink("Connecting via Digital Networking Profile", profile)}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-amber-500/30 text-amber-400 font-semibold text-xs transition-colors group"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-slate-100 font-bold block truncate">Email</span>
                <span className="text-[10px] text-slate-400 block truncate">{profile.email}</span>
              </div>
            </a>

            {/* Call */}
            <a
              href={getCallLink(profile)}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-purple-500/30 text-purple-400 font-semibold text-xs transition-colors group"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-slate-100 font-bold block truncate">Phone Call</span>
                <span className="text-[10px] text-slate-400 block truncate">{profile.phoneFormatted || profile.phone}</span>
              </div>
            </a>
          </div>

          {/* Secondary Actions: Resume & Share */}
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View Resume</span>
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-emerald-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Card'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
