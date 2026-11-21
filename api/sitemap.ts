import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './lib/prisma';

const base = 'https://www.p41.be';
const staticPaths = ['/', '/about', '/consultancy', '/time-study', '/teamplanner', '/academy', '/blog', '/contact', '/privacy'];

const day = (d: Date) => d.toISOString().slice(0, 10);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.setHeader('Allow', 'GET, HEAD'); return res.status(405).end(); }
  try {
    const [posts, courses] = await Promise.all([
      prisma.blogPost.findMany({ select: { id: true, slug: true, updatedAt: true } }),
      prisma.course.findMany({ select: { id: true, updatedAt: true } })
    ]);
    const urls: { loc: string; lastmod?: string }[] = [
      ...staticPaths.map(p => ({ loc: base + p })),
      ...posts.map(p => ({ loc: `${base}/blog/${encodeURIComponent(p.slug || p.id)}`, lastmod: day(p.updatedAt) })),
      ...courses.map(c => ({ loc: `${base}/academy/${encodeURIComponent(c.id)}`, lastmod: day(c.updatedAt) }))
    ];
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
      + urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')
      + '\n</urlset>\n';
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch {
    return res.status(503).end('Sitemap temporarily unavailable');
  }
}
