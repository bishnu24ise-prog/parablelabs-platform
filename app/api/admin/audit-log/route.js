import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable } from '@/lib/db';

// GET /api/admin/audit-log
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (decoded.role !== 'Platform Admin') {
      return NextResponse.json({ error: 'Platform Admin access required' }, { status: 403 });
    }

    const log = readTable('audit_log');
    log.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return NextResponse.json({ log, total: log.length });
  } catch (err) {
    console.error('/api/admin/audit-log error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
