/** Keystatic / publicPath image values → usable URL */
export function mediaUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;

  // Normalize leading slash variants coming from CMS/runtime values.
  const normalized = value.replace(/^\/+/, '');

  if (normalized.startsWith('site/')) return `/${normalized}`;

  // Handle legacy paths like "/branding/logo.png" and "branding/logo.png".
  return `/site/${normalized}`;
}

/**
 * Build a Netlify Image CDN URL for resized/compressed images.
 * Falls back to original URL for non-local paths.
 */
export function optimizedImageSrc(
  src: string,
  width: number,
  options?: { quality?: number; format?: 'webp' | 'avif' | 'jpg' | 'png' }
): string {
  if (import.meta.env.DEV) return src;
  if (!src.startsWith('/')) return src;
  const quality = options?.quality ?? 68;
  const format = options?.format ?? 'webp';
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}&fm=${format}`;
}

/** Build srcset string from widths for responsive image delivery. */
export function optimizedImageSrcSet(
  src: string,
  widths: number[],
  options?: { quality?: number; format?: 'webp' | 'avif' | 'jpg' | 'png' }
): string {
  if (import.meta.env.DEV) return widths.map((w) => `${src} ${w}w`).join(', ');
  return widths.map((w) => `${optimizedImageSrc(src, w, options)} ${w}w`).join(', ');
}
