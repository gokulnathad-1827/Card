import React from 'react';
import { profileData } from '../data/profile';
import { GraduationCap, Award, Code2, Cpu } from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Award: Award,
  Code2: Code2,
  Cpu: Cpu,
};

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      {profileData.stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || Code2;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-lg shadow-black/40"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
              {stat.title}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1 leading-snug">
              {stat.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
