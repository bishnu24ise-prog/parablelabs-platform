import { NextResponse } from 'next/server';
import { dbQuery, initDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

export async function POST(request) {
  try {
    await initDb();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find user by email
    const findRes = await dbQuery('SELECT * FROM users WHERE email = $1', [email]);
    if (findRes.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const user = findRes.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Create temporary JWT token with mfa_pending = true
    const tempToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        mfa_pending: true
      },
      JWT_SECRET,
      { expiresIn: '15m' } // MFA pending state expires in 15 minutes
    );

    // Save temporary session in cookie
    const cookieStore = await cookies();
    cookieStore.set('session', tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 // 15 minutes
    });

    return NextResponse.json({
      success: true,
      message: 'MFA code sent to your email. Please verify.',
      mfaPending: true
    });

  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
