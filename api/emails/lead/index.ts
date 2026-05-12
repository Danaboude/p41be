import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = process.env['RESEND_API_KEY'] ? new Resend(process.env['RESEND_API_KEY']) : null;
const TO_EMAIL = 'ivesds@aeriez.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { firstName, lastName, email, phone, address, subject } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!resend) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ error: 'Mail service unavailable' });
    }

    const emailContent = `
      <h2>New Lead from P41 Website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Address:</strong> ${address || 'N/A'}</p>
      <p><strong>Subject/Message:</strong> ${subject || 'N/A'}</p>
    `;

    const response = await resend.emails.send({
      from: 'P41 Website <leads@p41.be>',
      to: TO_EMAIL,
      subject: `New Lead: ${firstName} ${lastName} - ${email}`,
      html: emailContent,
      replyTo: email
    });

    return res.status(200).json({ success: true, id: response.data?.id });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: error.message });
  }
}
