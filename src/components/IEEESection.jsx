// src/components/IEEESection.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Award, Users2, Quote } from 'lucide-react';

export default function IEEESection() {
  const { leadership, profile } = useProfile();

  const visibleLeadership = (leadership || []).filter((l) => l.isVisible !== false);

  return (
    <section id="ieee" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Community & Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            IEEE &amp; Leadership
          </h2>
        </div>

        {/* Leadership Cards */}
        {visibleLeadership.map((item) => (
          <div key={item.id} className="relative p-6 sm:p-8 rounded-3xl bg-dark-900 border border-emerald-500/30 shadow-2xl overflow-hidden mb-8">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                    {item.positionTitle}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-dark-800 text-slate-300 border border-slate-700">
                    Year {item.year}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {item.organization}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  "{item.description}"
                </p>
              </div>

              <div className="shrink-0 p-4 rounded-2xl bg-dark-850 border border-slate-800 flex flex-col items-center justify-center text-center min-w-[130px]">
                <Users2 className="w-8 h-8 text-emerald-400 mb-1" />
                <span className="text-xs font-bold text-white">Student Branch</span>
                <span className="text-[11px] text-slate-400">CIS 2K26</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{profile.college}</span>
              <span className="text-slate-400 italic">Personal student leadership role</span>
            </div>
          </div>
        ))}

        {/* Networking Philosophy Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-dark-900 to-dark-900 border border-emerald-500/25 shadow-xl text-center relative overflow-hidden">
          <Quote className="w-10 h-10 text-emerald-500/20 mx-auto mb-3" />
          <p className="text-base sm:text-lg text-slate-200 font-medium italic max-w-2xl mx-auto leading-relaxed">
            "{profile.networkingPhilosophy}"
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 inline-flex flex-col items-center">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 font-bold uppercase">
              {profile.tagline}
            </span>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5">
              — {profile.name} • <span className="text-emerald-400 font-semibold">{profile.personalSignature}</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
