// src/components/PublicProfile.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import IEEESection from './IEEESection';
import NetworkingSection from './NetworkingSection';
import QRSection from './QRSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import ConnectModal from './ConnectModal';
import MobileStickyBar from './MobileStickyBar';
import { useProfile } from '../context/ProfileContext';

export default function PublicProfile() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const { loading, error } = useProfile();

  const handleOpenConnect = () => {
    setIsConnectOpen(true);
  };

  const handleCloseConnect = () => {
    setIsConnectOpen(false);
  };

  const handleScrollToQR = () => {
    const el = document.getElementById('qr');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col relative selection:bg-emerald-500 selection:text-dark-950 font-sans">
      
      {/* Navigation Bar */}
      <Navbar onOpenConnect={handleOpenConnect} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* SCREEN 1: Hero (Mobile first view / Desktop two-column view) */}
        <Hero onOpenConnect={handleOpenConnect} onOpenQR={handleScrollToQR} />

        {/* SCREEN 2: About Me + Quick Stats */}
        <About />

        {/* SCREEN 2 Continued: What I Work With (Skills) */}
        <Skills />

        {/* SCREEN 3: Featured Projects */}
        <Projects />

        {/* SCREEN 3 Continued: IEEE & Leadership + Networking Philosophy */}
        <IEEESection />

        {/* SCREEN 4: Met Me at an Event? */}
        <NetworkingSection onOpenConnect={handleOpenConnect} />

        {/* SCREEN 4: Scan. Connect. Stay in touch. (QR Code) */}
        <QRSection />

        {/* SCREEN 4: Let's Connect + Social Links Grid */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Action Bar (Hidden on desktop) */}
      <MobileStickyBar onOpenConnect={handleOpenConnect} />

      {/* Primary Connect Modal / Mobile Bottom Sheet */}
      <ConnectModal isOpen={isConnectOpen} onClose={handleCloseConnect} />

    </div>
  );
}
