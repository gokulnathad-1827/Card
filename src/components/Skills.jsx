// src/components/Skills.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Brain, Laptop, Database, CloudCog, Sparkles } from 'lucide-react';

const categoryIconMap = {
  "AI & Machine Learning": Brain,
  "Development": Laptop,
  "Data": Database,
  "Cloud & Automation": CloudCog,
};

const skillIconMap = {
  "Artificial Intelligence": "🤖",
  "Machine Learning": "🧠",
  "Python": "🐍",
  "LangChain": "🔗",
  "RAG": "⚡",
  "Java": "☕",
  "React.js": "⚛️",
  "Full-Stack Development": "🌐",
  "SQL": "🗄️",
  "Databases": "💾",
  "Cloud": "☁️",
  "DevOps": "🛠️",
  "n8n": "⚙️",
};

export default function Skills() {
  const { skills } = useProfile();

  const visibleSkills = (skills || []).filter((s) => s.isVisible !== false);

  // Group by category
  const categories = ['AI & Machine Learning', 'Development', 'Data', 'Cloud & Automation'];
  const groupedCategories = categories.map((catName) => {
    const catSkills = visibleSkills.filter((s) => s.category === catName);
    return {
      title: catName,
      skills: catSkills
    };
  }).filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What I Work With
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Practical technical skills applied across AI research, full-stack systems, databases, and workflow automation.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {groupedCategories.map((cat, idx) => {
            const Icon = categoryIconMap[cat.title] || Brain;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-900/90 border border-slate-800 hover:border-emerald-500/35 transition-all duration-300 shadow-xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {cat.skills.length} core technologies
                    </span>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-emerald-500/40 text-xs font-medium text-slate-200 transition-colors"
                    >
                      <span className="text-sm">{skillIconMap[skill.name] || "⚡"}</span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
