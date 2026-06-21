import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'MFA code is required.' },
        { status: 400 }
      );
    }

    // Read the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: 'Session expired. Please log in again.' },
        { status: 401 }
      );
    }

    // Verify and decode the temporary token
    let decoded;
    try {
      decoded = jwt.verify(sessionCookie.value, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid session. Please log in again.' },
        { status: 401 }
      );
    }

    if (!decoded.mfa_pending) {
      return NextResponse.json(
        { error: 'MFA verification not pending.' },
        { status: 400 }
      );
    }

    // Verify OTP code (accept '123456' for simplicity as per requirements)
    if (code !== '123456') {
      return NextResponse.json(
        { error: 'Invalid MFA verification code. Hint: Use 123456.' },
        { status: 400 }
      );
    }

    // Fetch latest user details (e.g. onboarded status) from database
    const userRes = await dbQuery('SELECT * FROM users WHERE id = $1', [decoded.userId]);
    if (userRes.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      );
    }

    const user = userRes.rows[0];

    // Create fully authenticated JWT Session Token
    const verifiedToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        mfa_pending: false
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Save fully authenticated session in cookie
    cookieStore.set('session', verifiedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({
      success: true,
      message: 'MFA verified successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboarded: user.onboarded
      }
    });

  } catch (error) {
    console.error('Error in MFA verification API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during verification.' },
      { status: 500 }
    );
  }
}
