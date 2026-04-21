import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';

// Helper to verify token
const verifyToken = (req: VercelRequest) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
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
        const post = await prisma.blogPost.findUnique({ 
          where: id ? { id: String(id) } : { id: String(slug) } // Using slug as id in this simplified schema for now or adding slug field
        });
        return res.status(200).json(post);
      }
      const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(posts);
    } catch (e) {
      return res.status(500).json({ message: 'Error fetching blog posts' });
    }
  }

  // Protected and Restricted Methods
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
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
