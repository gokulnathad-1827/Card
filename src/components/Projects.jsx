// src/components/Projects.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import ProjectCard from './ProjectCard';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { GitHubIcon } from './Icons';

export default function Projects() {
  const { projects, profile } = useProfile();

  const visibleProjects = (projects || []).filter((p) => p.isVisible !== false);

  return (
    <section id="projects" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Applied Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Practical AI and full-stack software solutions built for healthcare, education, and personal creative impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>

        {/* GitHub Repositories Link */}
        <div className="mt-8 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 text-xs font-semibold transition-all hover:shadow-glow-sm"
          >
            <GitHubIcon className="w-4 h-4 text-emerald-400" />
            <span>Explore All Repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

      </div>
    </section>
  );
}
