import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false });
    }

    let decoded;
    try {
      decoded = jwt.verify(sessionCookie.value, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ authenticated: false });
    }

    if (decoded.mfa_pending) {
      return NextResponse.json({ authenticated: false, mfaPending: true });
    }

    // Query database to fetch fresh user state (e.g. onboarded status, profile_data)
    const userRes = await dbQuery('SELECT id, name, email, role, onboarded, profile_data FROM users WHERE id = $1', [decoded.userId]);
    if (userRes.rows.length === 0) {
      return NextResponse.json({ authenticated: false });
    }

    const user = userRes.rows[0];

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboarded: user.onboarded,
        profileData: user.profile_data
      }
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ authenticated: false, error: 'Database/Server error' });
  }
}
