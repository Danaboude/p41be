import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';
const resend = process.env['RESEND_API_KEY'] ? new Resend(process.env['RESEND_API_KEY']) : null;

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
  
  if (method === 'POST') {
     // Admin only route
     const decoded = verifyToken(req);
     if (!decoded) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     
     try {
       const { to, subject, htmlBody } = req.body;
       if (!to || !subject || !htmlBody) {
          return res.status(400).json({ error: 'Missing to, subject, or htmlBody' });
       }

       if (!resend) {
         return res.status(500).json({ error: 'Resend API key missing' });
       }

       const response = await resend.emails.send({
           from: `${process.env['FROM_NAME'] || 'P41 Academy'} <${process.env['FROM_EMAIL'] || 'ives@p41.be'}>`,
           to,
           subject,
           html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
               <div style="text-align: center; padding: 20px;">
                 <img src="https://p41.be/logo.jpg" alt="P41" style="max-height: 80px;" />
               </div>
               <div style="padding: 20px;">
                 ${htmlBody}
               </div>
               <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
               <p style="color: #888; font-size: 12px; text-align: center;">Best regards,<br/>Ives De Saeger - P41</p>
             </div>
           `
       });

       return res.status(200).json(response);
     } catch(e: any) {
        return res.status(500).json({ error: e.message });
     }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
