import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './lib/prisma';
import { SITE_FILMS } from '../src/app/core/films';

const base = 'https://www.p41.be';
const staticPaths = ['/', '/about', '/consultancy', '/time-study', '/teamplanner', '/academy', '/blog', '/contact', '/privacy'];

const day = (d: Date) => d.toISOString().slice(0, 10);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Google video sitemap entries for the self-hosted films shown on a page.
const videoTags = (path: string) => SITE_FILMS.filter(f => f.page === path).map(f =>
  '<video:video>'
  + `<video:thumbnail_loc>${esc(base + f.poster)}</video:thumbnail_loc>`
  + `<video:title>${esc(f.name)}</video:title>`
  + `<video:description>${esc(f.description)}</video:description>`
  + `<video:content_loc>${esc(base + f.file)}</video:content_loc>`
  + `<video:duration>${f.durationSec}</video:duration>`
  + `<video:publication_date>${f.uploadDate}</video:publication_date>`
  + '<video:family_friendly>yes</video:family_friendly>'
  + '</video:video>'
).join('');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.setHeader('Allow', 'GET, HEAD'); return res.status(405).end(); }
  try {
    const [posts, courses] = await Promise.all([
      prisma.blogPost.findMany({ select: { id: true, slug: true, updatedAt: true } }),
      prisma.course.findMany({ select: { id: true, updatedAt: true } })
    ]);
    const urls: { loc: string; path?: string; lastmod?: string }[] = [
      ...staticPaths.map(p => ({ loc: base + p, path: p })),
      ...posts.map(p => ({ loc: `${base}/blog/${encodeURIComponent(p.slug || p.id)}`, lastmod: day(p.updatedAt) })),
      ...courses.map(c => ({ loc: `${base}/academy/${encodeURIComponent(c.id)}`, lastmod: day(c.updatedAt) }))
    ];
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
      + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n'
      + urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}${u.path ? videoTags(u.path) : ''}</url>`).join('\n')
      + '\n</urlset>\n';
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch {
    return res.status(503).end('Sitemap temporarily unavailable');
  }
}
