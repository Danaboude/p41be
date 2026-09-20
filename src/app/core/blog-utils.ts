export function publicationDate(value: string): string | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

export function linkedinUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['linkedin.com', 'www.linkedin.com'].includes(url.hostname) && !url.username && !url.password;
  } catch { return false; }
}

// Only these explicit video embed endpoints can become iframe resource URLs.
export function videoEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    if (url.hostname === 'player.vimeo.com' && /^\/video\/\d+$/.test(url.pathname)) {
      const hash = url.searchParams.get('h');
      return `https://player.vimeo.com${url.pathname}${hash && /^[a-zA-Z0-9]+$/.test(hash) ? '?h=' + hash : ''}`;
    }
    if (url.hostname === 'streamable.com' && /^\/e\/[a-zA-Z0-9]+$/.test(url.pathname)) return `https://streamable.com${url.pathname}`;
    return null;
  } catch { return null; }
}
