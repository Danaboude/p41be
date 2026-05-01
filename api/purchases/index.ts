import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
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
  
  if (method === 'GET') {
     console.log('[API/Purchases] GET request received');
     // Admin only route
     const decoded = verifyToken(req);
     console.log('[API/Purchases] Token decoded:', !!decoded);
     if (!decoded) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     
     try {
       console.log('[API/Purchases] Fetching from Prisma...');
       const [purchases, courses] = await Promise.all([
         prisma.purchase.findMany({ orderBy: { createdAt: 'desc' } }),
         prisma.course.findMany({ select: { id: true, title: true } })
       ]);
       
       const courseMap = Object.fromEntries(courses.map(c => [c.id, c.title]));
       const purchasesWithTitles = purchases.map(p => ({
         ...p,
         courseTitle: courseMap[p.courseId] || 'Unknown Course'
       }));

       console.log('[API/Purchases] Data merged. Count:', purchasesWithTitles.length);
       return res.status(200).json(purchasesWithTitles);
     } catch(e: any) {
        console.error('[API/Purchases] Crash in DB query:', e);
        return res.status(500).json({ error: e.message });
     }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
