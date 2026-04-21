import { put } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const filename = req.headers['x-filename'] as string || 'image.png';
    const contentType = req.headers['content-type'] || 'image/png';

    // Upload directly to Vercel Blob
    const blob = await put(filename, req, {
      access: 'public',
      contentType: contentType
    });

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
