// src/components/QRSection.jsx
import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { generateQRDataURL, downloadQRCode } from '../utils/qr';
import { getShareUrl, shareProfile } from '../utils/sharing';
import { downloadVCard } from '../utils/contact';
import { QrCode, Download, Share2, UserPlus, Check, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

export default function QRSection() {
  const { profile } = useProfile();
  const [qrSrc, setQrSrc] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const url = getShareUrl(profile);
    setShareUrl(url);
    generateQRDataURL(url, 260).then((dataUrl) => {
      if (dataUrl) setQrSrc(dataUrl);
    });
  }, [profile]);

  const handleDownloadQR = async () => {
    const filename = `${profile.name.replace(/\s+/g, '_')}_QR.png`;
    const success = await downloadQRCode(shareUrl, filename);
    if (success) {
      showToast('QR Code downloaded! 🖼️');
    }
  };

  const handleShare = async () => {
    const res = await shareProfile(profile);
    if (res.method === 'copy') {
      showToast('Profile link copied to clipboard! 📋');
    }
  };

  const handleVCard = () => {
    downloadVCard(profile);
    showToast(`vCard downloaded! (${profile.name.replace(/\s+/g, '_')}.vcf) 📇`);
  };

  return (
    <section id="qr" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Card Frame */}
        <div className="p-6 sm:p-10 rounded-3xl bg-dark-900 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Column: QR Code Display */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative p-4 rounded-3xl bg-white shadow-2xl border-4 border-emerald-400/20 group">
              {qrSrc ? (
                <img 
                  src={qrSrc} 
                  alt={`Scan ${profile.name} Digital Card`} 
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                  Generating QR Code...
                </div>
              )}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-dark-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                Official QR
              </div>
            </div>
            
            <p className="text-[11px] font-mono text-slate-400 mt-5">
              High-Resolution 300 DPI Vector QR
            </p>
          </div>

          {/* Right Column: Copy & Actions */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              <span>Instant Digital Access</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scan. Connect. Stay in touch.
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Open your smartphone camera or QR scanner to open this digital networking card instantly on any mobile device.
            </p>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono text-emerald-400">
              <span className="truncate">{shareUrl}</span>
              <button 
                onClick={handleShare}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-sans text-xs font-semibold transition-colors shrink-0"
              >
                Copy
              </button>
            </div>

            {/* Actions Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleDownloadQR}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save QR Image</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-white font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share Profile</span>
              </button>

              <button
                onClick={handleVCard}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-emerald-300 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save vCard</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
