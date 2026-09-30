// src/components/About.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import QuickStats from './QuickStats';
import { FileText, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

export default function About() {
  const { profile } = useProfile();

  const resumeLink = profile.resumeUrl || profile.resume || "https://drive.google.com/file/d/1BIJLPu0KMZcQcoaJEBM9fVk1u7V0lnQE/view?usp=sharing";

  return (
    <section id="about" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            A Little About Me
          </h2>
        </div>

        {/* Narrative Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800/90 shadow-xl space-y-4">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {profile.aboutMe}
          </p>

          {/* Location Badges */}
          <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-850 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Campus: <strong className="text-slate-200">{profile.visibleLocation}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-850 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Native: <strong className="text-slate-200">{profile.native}</strong></span>
            </div>
          </div>

          {/* Action: View / Download Resume */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-300">
              Want a comprehensive academic and project breakdown?
            </div>
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 text-xs sm:text-sm font-semibold transition-all hover:shadow-glow-sm active:scale-[0.98] group"
            >
              <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>View My Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-300 transition-colors" />
            </a>
          </div>
        </div>

        {/* Quick Profile Stats Cards */}
        <QuickStats />

      </div>
    </section>
  );
}
