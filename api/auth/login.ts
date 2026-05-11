import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Login request received. Method:', req.method);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    let isValid = false;
    let userId = '';

    if (user) {
      isValid = await bcrypt.compare(password, user.passwordHash);
      userId = user.id;
    } else {
      // Fallback to .env credentials
      const adminEmail = process.env['ADMIN_EMAIL'];
      const adminPassword = process.env['ADMIN_PASSWORD'];
      
      if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
        isValid = true;
        userId = 'admin-env';
      }
    }

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: userId,
        email: email,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
