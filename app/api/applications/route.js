import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/applications — current user's applications
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const appRes = await dbQuery('SELECT * FROM applications WHERE "userId" = $1 ORDER BY "appliedAt" DESC', [decoded.userId]);
    const applications = appRes.rows;

    return NextResponse.json({ applications });
  } catch (err) {
    console.error('/api/applications GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
