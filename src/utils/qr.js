import QRCode from 'qrcode';
import { getShareUrl } from './sharing';

/**
 * Generates high-contrast QR code data URL
 */
export async function generateQRDataURL(url = null, size = 300) {
  const targetUrl = url || getShareUrl();
  try {
    const dataUrl = await QRCode.toDataURL(targetUrl, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#070b09',
        light: '#ffffff',
      },
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    return null;
  }
}

/**
 * Downloads the QR code as PNG image
 */
export async function downloadQRCode(url = null, filename = 'Gokulnath_D_QR.png') {
  const targetUrl = url || getShareUrl();
  try {
    // Generate high resolution 800px for crisp download/printing
    const highResDataUrl = await QRCode.toDataURL(targetUrl, {
      width: 800,
      margin: 3,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#070b09',
        light: '#ffffff',
      },
    });

    const link = document.createElement('a');
    link.href = highResDataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to download QR code:', err);
    return false;
  }
}
