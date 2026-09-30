// src/components/Hero.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import ProfilePhoto from './ProfilePhoto';
import ConnectActions from './ConnectActions';
import VisualProfileCard from './VisualProfileCard';
import { MapPin, BookOpen, Sparkles } from 'lucide-react';

export default function Hero({ onOpenConnect, onOpenQR }) {
  const { profile } = useProfile();

  return (
    <section 
      id="home" 
      className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-72 bg-gradient-to-b from-emerald-500/15 via-emerald-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* MOBILE HERO (VISIBLE ON < LG SCREENS) */}
        <div className="lg:hidden flex flex-col items-center text-center max-w-md mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Digital Networking Profile</span>
          </div>

          {/* Profile Photo */}
          <div className="mb-4">
            <ProfilePhoto size="normal" />
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {profile.name}
          </h1>

          {/* Headline */}
          <p className="text-emerald-400 font-semibold text-sm sm:text-base leading-snug mb-1">
            {profile.shortRole || "AI & Data Science Student"}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm font-normal mb-3">
            AI/ML Enthusiast | Full-Stack Developer
          </p>

          {/* College + Year */}
          <div className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 bg-dark-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full mb-3 max-w-full">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{profile.college}</span>
            <span className="text-emerald-400 font-bold">·</span>
            <span className="text-emerald-400 font-medium whitespace-nowrap">{profile.year}</span>
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-mono text-slate-400 italic mb-1">
            {profile.tagline}
          </p>

          {/* Personal Signature */}
          <div className="text-[11px] font-mono tracking-widest text-emerald-500/80 uppercase font-semibold mb-4">
            ⚡ {profile.personalSignature}
          </div>

          {/* Connect Action Group */}
          <ConnectActions onOpenConnect={onOpenConnect} onOpenQR={onOpenQR} />
        </div>

        {/* DESKTOP HERO (VISIBLE ON >= LG SCREENS) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Bio, Credentials & CTAs */}
          <div className="col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Real-World Tech & IEEE Networking</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                {profile.name}
              </h1>
              <p className="text-xl font-semibold text-emerald-400">
                {profile.headline}
              </p>
            </div>

            <div className="space-y-2.5 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-white">{profile.degree}</strong> ({profile.year})</span>
                <span className="text-slate-500">•</span>
                <span>{profile.college}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>📍 {profile.visibleLocation}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Native: {profile.native}</span>
              </div>
            </div>

            <p className="text-slate-300 text-base leading-relaxed bg-dark-900/60 p-4 rounded-2xl border border-slate-800">
              Welcome to my digital networking hub. Connect directly with me for AI/ML projects, full-stack collaborations, IEEE technical activities, hackathons, and innovative engineering ideas.
            </p>

            <div className="pt-2">
              <p className="text-sm font-mono text-emerald-400/90 italic mb-2">
                "{profile.tagline}"
              </p>
              <div className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold mb-5">
                Personal Mantra: <span className="text-emerald-400 font-bold">{profile.personalSignature}</span>
              </div>

              <div className="max-w-md">
                <ConnectActions onOpenConnect={onOpenConnect} onOpenQR={onOpenQR} />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Profile Card */}
          <div className="col-span-5 flex justify-center">
            <VisualProfileCard />
          </div>
        </div>

      </div>
    </section>
  );
}
