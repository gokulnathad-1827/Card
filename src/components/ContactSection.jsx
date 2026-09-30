// src/components/ContactSection.jsx
import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { getWhatsAppLink, getEmailLink } from '../utils/contact';
import { 
  Mail, 
  Globe, 
  MapPin, 
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

export default function ContactSection() {
  const { profile } = useProfile();
  const { showToast } = useToast();

  const handleWhatsApp = () => {
    showToast('Opening WhatsApp... 💬');
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: profile.linkedin || "#",
      icon: LinkedInIcon,
      category: "Professional",
      color: "hover:text-blue-400 hover:border-blue-500/40",
    },
    {
      name: "GitHub",
      url: profile.github || "#",
      icon: GitHubIcon,
      category: "Professional",
      color: "hover:text-purple-400 hover:border-purple-500/40",
    },
    {
      name: "Portfolio",
      url: profile.portfolio || "#",
      icon: Globe,
      category: "Professional",
      color: "hover:text-cyan-400 hover:border-cyan-500/40",
    },
    {
      name: "LeetCode",
      url: profile.leetcode || "#",
      icon: LeetCodeIcon,
      category: "Professional",
      color: "hover:text-amber-400 hover:border-amber-500/40",
    },
    {
      name: "Instagram",
      url: profile.instagram || "#",
      icon: InstagramIcon,
      category: "Social",
      color: "hover:text-pink-400 hover:border-pink-500/40",
    },
    {
      name: "Email",
      url: getEmailLink("Connecting via Digital Networking Profile", profile),
      icon: Mail,
      category: "Contact",
      color: "hover:text-amber-400 hover:border-amber-500/40",
    },
    {
      name: "WhatsApp",
      url: getWhatsAppLink(null, profile),
      icon: WhatsAppIcon,
      category: "Contact",
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
    },
  ];

  return (
    <section id="connect" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Let's Connect 🤝
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
            Interested in AI, technology, projects, hackathons, research, collaboration, or simply exchanging ideas?
          </p>
        </div>

        {/* Primary 4 Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-blue-500/30 hover:border-blue-400 text-blue-400 font-semibold text-sm transition-all group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-5 h-5" />
              </div>
              <span className="text-slate-100 group-hover:text-blue-300">Connect on LinkedIn</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppLink(null, profile)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 font-semibold text-sm transition-all group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <span className="text-slate-100 group-hover:text-emerald-300">Message on WhatsApp</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
          </a>

          {/* Email */}
          <a
            href={getEmailLink("Connecting via Digital Networking Profile", profile)}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-amber-500/30 hover:border-amber-400 text-amber-400 font-semibold text-sm transition-all group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-slate-100 group-hover:text-amber-300">Send Email</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
          </a>

          {/* GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-purple-500/30 hover:border-purple-400 text-purple-400 font-semibold text-sm transition-all group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <GitHubIcon className="w-5 h-5" />
              </div>
              <span className="text-slate-100 group-hover:text-purple-300">View GitHub</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
          </a>
        </div>

        {/* Social Links Icon Grid */}
        <div className="bg-dark-900/60 p-6 rounded-3xl border border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 text-center mb-4">
            Professional &amp; Social Channels
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-850 border border-slate-800 ${item.color} text-slate-300 text-xs font-medium transition-all group`}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Location Badges */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visible Location: <strong className="text-slate-200">{profile.visibleLocation}</strong></span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div>
              Campus: <span className="text-slate-300">{profile.college}</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div>
              Native: <span className="text-slate-300">{profile.native}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
