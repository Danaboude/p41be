// Public base URL for links in emails and payment redirects.
// VERCEL_URL is the per-deployment address, which sits behind Vercel's login wall,
// so production must use the real domain.
export const SITE_URL =
  process.env['SITE_URL'] ||
  (process.env['VERCEL_ENV'] === 'production'
    ? 'https://www.p41.be'
    : process.env['VERCEL_URL']
      ? `https://${process.env['VERCEL_URL']}`
      : 'http://localhost:3000');
