// src/utils/contact.js
import { profileData as fallbackProfile } from '../data/profile';

/**
 * Generates and downloads a valid vCard (.vcf) file using dynamic profile data.
 */
export function downloadVCard(customProfile = null) {
  const p = customProfile || fallbackProfile;
  const name = p.name || 'Gokulnath D';
  const phone = p.phoneFormatted || p.phone || '+91 7639499348';
  const cleanPhone = phone.replace(/\s+/g, '');

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN;CHARSET=UTF-8:${name}`,
    `N;CHARSET=UTF-8:${name.split(' ').reverse().join(';')};;;`,
    `ORG;CHARSET=UTF-8:${p.college || 'Karpagam College of Engineering'}`,
    `TITLE;CHARSET=UTF-8:${p.shortRole || 'AI & Data Science Student'}`,
    `TEL;TYPE=CELL,VOICE:${cleanPhone}`,
    `EMAIL;TYPE=WORK,INTERNET:${p.email || 'gokulnath.ad.1827@gmail.com'}`,
    `URL;TYPE=WORK:${p.portfolio || 'https://gokulnathad.vercel.app/'}`,
    `URL;TYPE=LinkedIn:${p.linkedin || ''}`,
    `URL;TYPE=GitHub:${p.github || ''}`,
    `NOTE;CHARSET=UTF-8:${p.headline || ''} | Native: ${p.native || ''}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = `${name.replace(/[^a-zA-Z0-9]+/g, '_')}.vcf`;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Returns formatted WhatsApp link with pre-filled message using dynamic profile data
 */
export function getWhatsAppLink(customMessage = null, customProfile = null) {
  const p = customProfile || fallbackProfile;
  const msg = customMessage || p.whatsappMessage || "Hi Gokulnath! We met at Aishwarya 2K26. Great connecting with you!";
  const rawPhone = p.phoneFormatted || p.phone || '7639499348';
  let cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Returns tel: link
 */
export function getCallLink(customProfile = null) {
  const p = customProfile || fallbackProfile;
  const phone = p.phoneFormatted || p.phone || '+91 7639499348';
  return `tel:${phone.replace(/\s+/g, '')}`;
}

/**
 * Returns mailto: link
 */
export function getEmailLink(subject = "Connecting via Digital Networking Profile", customProfile = null) {
  const p = customProfile || fallbackProfile;
  const email = p.email || 'gokulnath.ad.1827@gmail.com';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
