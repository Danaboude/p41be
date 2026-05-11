import { put } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const filename = req.headers['x-filename'] as string || 'image.png';
    const contentType = req.headers['content-type'] || 'image/png';

    // Read the stream into a buffer to prevent "disturbed or locked" errors in undici
    const body = await buffer(req);

    // Upload directly to Vercel Blob
    const blob = await put(filename, body, {
      access: 'private',
      contentType: contentType,
      addRandomSuffix: true
    });

    console.log('Upload Success:', blob);
    return res.status(200).json(blob);
  } catch (error: any) {
    console.error('Upload Error:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle raw binary data directly
  },
};
