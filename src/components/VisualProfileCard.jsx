// src/components/VisualProfileCard.jsx
import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { generateQRDataURL } from '../utils/qr';
import { Globe, MapPin } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './Icons';
import ProfilePhoto from './ProfilePhoto';

export default function VisualProfileCard({ className = "" }) {
  const { profile } = useProfile();
  const [qrSrc, setQrSrc] = useState(null);

  useEffect(() => {
    generateQRDataURL(profile.portfolio || null, 180).then((url) => {
      if (url) setQrSrc(url);
    });
  }, [profile.portfolio]);

  return (
    <div className={`relative max-w-sm w-full mx-auto ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/25 via-emerald-600/10 to-cyan-500/20 rounded-3xl blur-xl opacity-75" />

      {/* Main card body with tech border */}
      <div className="relative rounded-3xl bg-gradient-to-b from-dark-900 via-dark-850 to-dark-900 border border-emerald-500/35 p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header Strip */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              DIGITAL PROFILE • 2K26
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            OFFICIAL vCARD
          </span>
        </div>

        {/* Profile Card Body */}
        <div className="flex flex-col items-center text-center">
          <ProfilePhoto size="card" className="mb-4" />

          {/* Name & Title */}
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {profile.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">
            {profile.shortRole}
          </p>
          <p className="text-xs text-slate-300 mt-0.5">
            {profile.college}
          </p>

          {/* Tagline */}
          <p className="text-xs font-mono text-slate-400 mt-3 italic tracking-wide">
            "{profile.tagline}"
          </p>

          {/* Scannable QR section inside the card */}
          <div className="mt-5 p-3 rounded-2xl bg-dark-950/90 border border-emerald-500/25 flex items-center gap-4 w-full text-left">
            <div className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 shadow-md flex items-center justify-center">
              {qrSrc ? (
                <img 
                  src={qrSrc} 
                  alt={`Scan ${profile.name} QR Code`} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                SCAN TO CONNECT
              </span>
              <p className="text-xs text-slate-300 font-medium leading-tight mt-0.5">
                Instant digital profile &amp; contact access
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{profile.visibleLocation}</span>
              </div>
            </div>
          </div>

          {/* Footer Social Icons inside card */}
          <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-slate-800/80 w-full text-slate-400">
            <a 
              href={profile.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-dark-850 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-dark-850 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a 
              href={profile.portfolio} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-dark-850 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
              aria-label="Personal Portfolio"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
