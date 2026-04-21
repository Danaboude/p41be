import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  if (method === 'GET') {
    try {
      const { purchaseId } = req.query;

      if (!purchaseId || typeof purchaseId !== 'string') {
        return res.status(400).json({ error: 'Missing purchase ID' });
      }

      // Find the purchase and ensure it is paid
      const purchase = await prisma.purchase.findUnique({
        where: { id: purchaseId },
      });

      if (!purchase) {
        return res.status(404).json({ error: 'Purchase not found' });
      }

      if (purchase.status !== 'PAID') {
        return res.status(403).json({ error: 'Purchase is pending or failed. Cannot access materials.' });
      }

      // Fetch the associated course and its materials
      const course = await prisma.course.findUnique({
        where: { id: purchase.courseId },
        include: { materials: true }, // We added this relationship in schema.prisma
      });

      if (!course) {
        return res.status(404).json({ error: 'Course no longer exists' });
      }

      return res.status(200).json({
        course: {
           id: course.id,
           title: course.title,
           subtitle: course.subtitle,
        },
        materials: course.materials,
        purchase: {
           name: purchase.name,
           email: purchase.email,
        }
      });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
