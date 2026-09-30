// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Share2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { shareProfile } from '../utils/sharing';
import { useToast } from './Toast';

export default function Navbar({ onOpenConnect }) {
  const { profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'IEEE', href: '#ieee' },
    { name: 'Connect', href: '#connect' },
  ];

  const handleShare = async () => {
    const res = await shareProfile(profile);
    if (res.method === 'copy') {
      showToast('Profile link copied! 📋');
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-dark-950/85 backdrop-blur-md border-b border-emerald-500/15 py-3 shadow-lg shadow-black/40' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Name */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 text-white font-extrabold tracking-wider text-base sm:text-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-dark-950 transition-all">
              <span className="text-xs font-black">GD</span>
            </div>
            <span className="group-hover:text-emerald-400 transition-colors">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-medium text-slate-300">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-emerald-400 transition-colors py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-800">
              <button
                onClick={handleShare}
                aria-label="Share profile"
                className="p-2 rounded-lg bg-dark-800/80 hover:bg-dark-700 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenConnect}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all hover:shadow-glow-sm"
              >
                <span>Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Trigger Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenConnect}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-dark-950 font-bold text-xs"
            >
              <span>Connect</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg bg-dark-800 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-dark-950 flex flex-col md:hidden animate-fade-in font-sans">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/80">
            <a 
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 text-white font-extrabold tracking-wider text-base"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xs">
                GD
              </div>
              <span>{profile.name}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-lg bg-dark-850 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-slate-200 hover:text-emerald-400 font-semibold text-lg py-3.5 border-b border-slate-800/60 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Bottom Actions */}
            <div className="pt-6 mt-auto space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all"
              >
                <span>🤝 Let's Connect</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
