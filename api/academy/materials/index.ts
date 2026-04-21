import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';

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

  // Protect Admin Routes
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GET: Fetch materials for a course
  if (method === 'GET') {
    try {
      const { courseId } = req.query;
      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ error: 'Missing courseId' });
      }
      const materials = await prisma.courseMaterial.findMany({
        where: { courseId }
      });
      return res.status(200).json(materials);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to fetch materials' });
    }
  }

  // POST: Add new manual material
  if (method === 'POST') {
    try {
      const { courseId, name, url, type } = req.body;
      
      if (!courseId || !name || !url || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const material = await prisma.courseMaterial.create({
        data: {
          courseId,
          name,
          url,
          type,
          size: 0 // Size not applicable for external links
        }
      });
      return res.status(200).json(material);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to save material' });
    }
  }

  // DELETE: Remove material
  if (method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Missing material ID' });
      
      await prisma.courseMaterial.delete({ where: { id } });
      return res.status(200).json({ success: true });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to delete material' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
