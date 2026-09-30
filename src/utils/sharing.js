// src/utils/sharing.js
import { profileData as fallbackProfile } from '../data/profile';

/**
 * Returns the effective live URL for sharing and QR codes.
 * Dynamically resolves location origin or portfolio URL.
 */
export function getShareUrl(customProfile = null) {
  const p = customProfile || fallbackProfile;
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return window.location.href.split('#')[0];
    }
  }
  return p.portfolio || 'https://gokulnathad.vercel.app/';
}

/**
 * Shares profile using Web Share API or falls back to clipboard copy.
 */
export async function shareProfile(customProfile = null) {
  const p = customProfile || fallbackProfile;
  const url = getShareUrl(p);
  const shareData = {
    title: `${p.name || 'Gokulnath D'} | ${p.shortRole || 'Digital Profile'}`,
    text: `Connect with ${p.name || 'Gokulnath D'} — ${p.headline || 'Digital Profile'}`,
    url: url
  };

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        return await copyProfileLink(url);
      }
      return { success: false, method: 'cancelled' };
    }
  }

  return await copyProfileLink(url);
}

/**
 * Copies the profile URL to clipboard.
 */
export async function copyProfileLink(customUrl = null) {
  const url = customUrl || getShareUrl();
  try {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return { success: true, method: 'copy' };
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return { success: successful, method: 'copy' };
    }
  } catch (err) {
    console.error('Clipboard error:', err);
    return { success: false, method: 'copy' };
  }
}
