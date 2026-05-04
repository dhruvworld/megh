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
