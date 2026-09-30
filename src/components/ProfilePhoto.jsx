// src/components/ProfilePhoto.jsx
import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { User } from 'lucide-react';

export default function ProfilePhoto({ className = "", size = "normal" }) {
  const { profile } = useProfile();
  const [imageError, setImageError] = useState(false);

  const photoUrl = profile.photoPath || profile.profile_photo || "/profile.jpg";
  const photoAlt = profile.photoAlt || `${profile.name} - Profile Photo`;

  // Size variations
  const sizeClasses = {
    compact: "w-24 h-24 sm:w-28 sm:h-28",
    normal: "w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52",
    large: "w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64",
    card: "w-24 h-24 sm:w-28 sm:h-28"
  };

  return (
    <div className={`relative group inline-block ${className}`}>
      {/* Subtle outer tech halo */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 rounded-[28px] blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Outer border wrapper */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.normal} rounded-2xl sm:rounded-3xl p-1 bg-dark-900 border-2 border-emerald-500/40 shadow-xl shadow-black/80 overflow-hidden`}>
        {!imageError ? (
          <img
            src={photoUrl}
            alt={photoAlt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top rounded-[14px] sm:rounded-[22px] transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full rounded-[14px] sm:rounded-[22px] bg-dark-850 flex flex-col items-center justify-center text-emerald-400 p-3 text-center border border-emerald-500/20">
            <User className="w-10 h-10 mb-1 opacity-80" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {profile.name}
            </span>
          </div>
        )}

        {/* Live online/active networking indicator dot */}
        <div 
          className="absolute bottom-2 right-2 flex items-center justify-center"
          title="Active for Networking"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-dark-950"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
