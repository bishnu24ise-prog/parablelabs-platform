import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, dbQuery } from '@/lib/db';

// GET /api/admin/users — all users (Platform Admin only)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (decoded.role !== 'Platform Admin') {
      return NextResponse.json({ error: 'Platform Admin access required' }, { status: 403 });
    }

    const res = await dbQuery('SELECT id, name, email, role, xp, onboarded, created_at FROM users', []);
    const users = res.rows.map(u => ({
      ...u,
      xp: u.xp || 0,
      level: Math.floor((u.xp || 0) / 500) + 1,
      badgeCount: readTable('user_badges').filter(b => b.userId === u.id).length,
    }));

    const stats = {
      total: users.length,
      byRole: {
        Student: users.filter(u => u.role === 'Student').length,
        Professional: users.filter(u => u.role === 'Professional').length,
        Mentor: users.filter(u => u.role === 'Mentor').length,
        Recruiter: users.filter(u => u.role === 'Recruiter').length,
        'Company Admin': users.filter(u => u.role === 'Company Admin').length,
        'Platform Admin': users.filter(u => u.role === 'Platform Admin').length,
      }
    };

    return NextResponse.json({ users, stats });
  } catch (err) {
    console.error('/api/admin/users GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
