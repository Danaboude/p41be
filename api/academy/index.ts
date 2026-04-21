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
    const { id } = req.query;
    try {
      if (id) {
        const course = await prisma.course.findUnique({ where: { id: String(id) } });
        return res.status(200).json(course);
      }
      const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(courses);
    } catch (e) {
      return res.status(500).json({ message: 'Error fetching courses' });
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
        const newCourse = await prisma.course.create({ data: req.body });
        return res.status(201).json(newCourse);
      
      case 'PUT':
        const { id: updateId, ...updateData } = req.body;
        const updatedCourse = await prisma.course.update({
          where: { id: String(updateId) },
          data: updateData
        });
        return res.status(200).json(updatedCourse);

      case 'DELETE':
        const { id: deleteId } = req.query;
        await prisma.course.delete({ where: { id: String(deleteId) } });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e: any) {
    console.error('API Course Error:', e);
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}
