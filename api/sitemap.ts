import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './lib/prisma';
const base = 'https://www.p41.be';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).end(); }
  try {
    const posts = await prisma.blogPost.findMany({ select: { id: true, slug: true } });
    const paths = ['', '/about', '/consultancy', '/academy', '/blog', '/contact', '/privacy', '/time-study', '/teamplanner', ...posts.map(p => '/blog/' + encodeURIComponent(p.slug || p.id))];
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(p => `<url><loc>${base}${p || '/'}</loc></url>`).join('') + '</urlset>';
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).send(xml);
  } catch { return res.status(503).end('Sitemap temporarily unavailable'); }
}
