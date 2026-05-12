import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';
console.log('[API Blog] JWT Secret Length:', JWT_SECRET.length);

// Helper to verify token
const verifyToken = (req: VercelRequest) => {
  const authHeader = req.headers.authorization;
  console.log('[API Blog] Auth Header:', authHeader);
  const token = authHeader?.split(' ')[1];
  if (!token) {
    console.log('[API Blog] No token found');
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[API Blog] Token verified:', decoded);
    return decoded;
  } catch (e: any) {
    console.log('[API Blog] Token verification failed:', e.message);
    return null;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  // Public GET
  if (method === 'GET') {
    const { id, slug } = req.query;
    try {
      if (id || slug) {
        const identifier = String(id || slug);
        const post = await prisma.blogPost.findFirst({ 
          where: {
            OR: [
              { id: identifier },
              { slug: identifier }
            ]
          }
        });
        return res.status(200).json(post);
      }
      const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(posts);
    } catch (e: any) {
      return res.status(500).json({ message: 'Error fetching blog posts', error: e.message });
    }
  }

  // Protected and Restricted Methods
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized', reason: 'Invalid or missing token' });
  }

  try {
    switch (method) {
      case 'POST':
        const newPost = await prisma.blogPost.create({ data: req.body });
        return res.status(201).json(newPost);
      
      case 'PUT':
        const { id: updateId, ...updateData } = req.body;
        const updatedPost = await prisma.blogPost.update({
          where: { id: String(updateId) },
          data: updateData
        });
        return res.status(200).json(updatedPost);

      case 'DELETE':
        const { id: deleteId } = req.query;
        await prisma.blogPost.delete({ where: { id: String(deleteId) } });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e: any) {
    console.error('API Blog Error:', e);
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}
