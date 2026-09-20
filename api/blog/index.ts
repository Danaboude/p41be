import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';
import { publicationDate, linkedinUrl, videoEmbedUrl } from '../../src/app/core/blog-utils';

export function validatePost(body: any) {
  if (!body || !['ARTICLE', 'LINKEDIN'].includes(body.kind || 'ARTICLE')) throw new Error('Choose Article or LinkedIn.');
  for (const key of ['title', 'excerpt', 'date', 'readTime']) {
    if (typeof body[key] !== 'string' || !body[key].trim()) throw new Error(`${key} is required.`);
  }
  const date = publicationDate(body.date);
  if (!date || (/^\d{4}-\d{2}-\d{2}$/.test(body.date) && date !== body.date)) throw new Error('Enter a valid publication date.');
  if (!Array.isArray(body.content) || !body.content.length || !body.content.every((p: any) => typeof p === 'string' && p.trim())) throw new Error('Add at least one content paragraph.');
  if (!Array.isArray(body.tags) || !body.tags.every((p: any) => typeof p === 'string')) throw new Error('Tags must be text.');
  if (body.sourceUrl && !linkedinUrl(body.sourceUrl)) throw new Error('Use an https://www.linkedin.com post link.');
  const videoUrl = body.videoUrl ? videoEmbedUrl(body.videoUrl) : null;
  if (body.videoUrl && !videoUrl) throw new Error('Use a Vimeo player or Streamable embed URL, without iframe HTML.');
  const slug = (body.slug || body.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')).trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Use lowercase letters, numbers and hyphens for the slug.');
  const image = typeof body.image === 'string' ? body.image.trim() : '';
  if (image && !/^(https:\/\/|\/?[a-zA-Z0-9])/.test(image)) throw new Error('Enter a valid image path or HTTPS URL.');
  return { title: body.title.trim(), slug, excerpt: body.excerpt.trim(), content: body.content,
    image: image || 'ives front look.jpg', date, readTime: body.readTime.trim(), tags: body.tags,
    kind: body.kind || 'ARTICLE', sourceUrl: body.sourceUrl || null, videoUrl,
    dateApproximate: body.dateApproximate === true };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method || '')) {
    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (req.method !== 'GET') {
    const secret = process.env['JWT_SECRET'];
    try {
      if (!secret || !req.headers.authorization?.startsWith('Bearer ')) throw new Error();
      jwt.verify(req.headers.authorization.slice(7), secret);
    } catch { return res.status(401).json({ message: 'Please log in again.' }); }
  }
  try {
    if (req.method === 'GET') {
      const identifier = req.query['id'] || req.query['slug'];
      if (identifier) {
        const post = await prisma.blogPost.findFirst({ where: { OR: [{ id: String(identifier) }, { slug: String(identifier) }] } });
        return post ? res.status(200).json(post) : res.status(404).json({ message: 'Post not found' });
      }
      const posts = await prisma.blogPost.findMany();
      posts.sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0) || b.createdAt.getTime() - a.createdAt.getTime());
      return res.status(200).json(posts);
    }
    if (req.method === 'DELETE') {
      if (typeof req.query['id'] !== 'string' || !req.query['id']) return res.status(400).json({ message: 'Post ID required.' });
      await prisma.blogPost.delete({ where: { id: req.query['id'] } });
      return res.status(204).end();
    }
    let data;
    try { data = validatePost(req.body); }
    catch (error: any) { return res.status(400).json({ message: error.message }); }
    if (req.method === 'POST') return res.status(201).json(await prisma.blogPost.create({ data }));
    if (typeof req.body.id !== 'string' || !req.body.id) return res.status(400).json({ message: 'Post ID required.' });
    return res.status(200).json(await prisma.blogPost.update({ where: { id: req.body.id }, data }));
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: 'That URL slug is already in use.' });
    if (error.code === 'P2025') return res.status(404).json({ message: 'Post not found.' });
    return res.status(500).json({ message: 'Unable to save or load posts. Please try again.' });
  }
}
