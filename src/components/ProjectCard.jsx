import React from 'react';
import { Activity, Sparkles, Heart, FolderGit2 } from 'lucide-react';

const iconMap = {
  Activity: Activity,
  Sparkles: Sparkles,
  Heart: Heart,
};

export default function ProjectCard({ project }) {
  const Icon = iconMap[project.icon] || FolderGit2;

  return (
    <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1">
      <div>
        {/* Top Strip */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-dark-950 transition-all">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-dark-800 text-emerald-300 border border-emerald-500/25">
            {project.badge}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors mb-2.5">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {project.description}
        </p>
      </div>

      {/* Technology Tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-dark-850 text-slate-300 border border-slate-800 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
