/** Keystatic / publicPath image values → usable URL */
export function mediaUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return value;
  if (value.startsWith('site/')) return `/${value}`;
  return `/site/${value}`;
}
