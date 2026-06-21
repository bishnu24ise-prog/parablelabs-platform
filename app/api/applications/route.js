import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable } from '@/lib/db';

// GET /api/applications — current user's applications
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const applications = readTable('applications').filter(a => a.userId === decoded.userId);
    applications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    return NextResponse.json({ applications });
  } catch (err) {
    console.error('/api/applications GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
