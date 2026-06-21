import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(sessionCookie.value, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (decoded.mfa_pending) {
      return NextResponse.json({ error: 'MFA pending verification' }, { status: 401 });
    }

    const onboardingData = await request.json();

    // Update user in database
    await dbQuery(
      'UPDATE users SET onboarded = $1, profile_data = $2 WHERE id = $3',
      [true, JSON.stringify(onboardingData), decoded.userId]
    );

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully.'
    });

  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred saving onboarding details.' },
      { status: 500 }
    );
  }
}
