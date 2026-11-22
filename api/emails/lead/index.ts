import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = process.env['RESEND_API_KEY'] ? new Resend(process.env['RESEND_API_KEY']) : null;
const TO_EMAIL = 'ives@p41.be';

const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { firstName, lastName, email, phone, address, subject, message, source, website } = req.body || {};

    // Hidden honeypot field: real visitors leave it empty.
    if (website) return res.status(200).json({ success: true });

    if (!firstName || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!resend) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ error: 'Mail service unavailable' });
    }

    const emailContent = `
      <h2>New ${source === 'contact' ? 'contact message' : 'lead'} from the P41 website</h2>
      <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone) || 'N/A'}</p>
      <p><strong>Address:</strong> ${esc(address) || 'N/A'}</p>
      <p><strong>Subject:</strong> ${esc(subject) || 'N/A'}</p>
      ${message ? `<p><strong>Message:</strong><br>${esc(message).split(String.fromCharCode(10)).join('<br>')}</p>` : ''}
    `;

    const response = await resend.emails.send({
      from: 'P41 Website <leads@p41.be>',
      to: TO_EMAIL,
      subject: `${source === 'contact' ? 'Contact' : 'New Lead'}: ${String(firstName).slice(0, 80)} ${String(lastName ?? '').slice(0, 80)} - ${String(email).slice(0, 120)}`,
      html: emailContent,
      replyTo: String(email)
    });

    return res.status(200).json({ success: true, id: response.data?.id });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: error.message });
  }
}
