import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/talent/search — search users for recruiter talent view
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['Recruiter', 'Company Admin', 'Platform Admin', 'Mentor'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const role = searchParams.get('role');
    const skill = searchParams.get('skill');

    const res = await dbQuery('SELECT id, name, email, role, xp, profile_data FROM users', []);
    let users = res.rows.filter(u => !['Recruiter', 'Company Admin', 'Platform Admin'].includes(u.role));

    const hacksRes = await dbQuery('SELECT "userId" FROM hackathon_registrations');
    const hacks = hacksRes.rows;

    const challRes = await dbQuery('SELECT "userId" FROM challenge_submissions WHERE correct = true');
    const chall = challRes.rows;

    if (role) users = users.filter(u => u.role === role);
    if (q) {
      const ql = q.toLowerCase();
      users = users.filter(u => u.name.toLowerCase().includes(ql) || u.email.toLowerCase().includes(ql));
    }
    if (skill) {
      users = users.filter(u => {
        const pd = typeof u.profile_data === 'string' ? JSON.parse(u.profile_data || '{}') : (u.profile_data || {});
        const skills = pd.skills || [];
        return skills.some(s => s.toLowerCase().includes(skill.toLowerCase()));
      });
    }

    const enriched = users.map(u => {
      const pd = typeof u.profile_data === 'string' ? JSON.parse(u.profile_data || '{}') : (u.profile_data || {});
      return {
        id: u.id, name: u.name, email: u.email, role: u.role,
        xp: u.xp || 0, level: Math.floor((u.xp || 0) / 500) + 1,
        skills: pd.skills || [],
        university: pd.university || '',
        company: pd.company || '',
        bio: pd.bio || '',
        hackathonsJoined: hacks.filter(r => r.userId === u.id).length,
        challengesSolved: chall.filter(s => s.userId === u.id).length,
      };
    });

    return NextResponse.json({ talent: enriched, total: enriched.length });
  } catch (err) {
    console.error('/api/talent/search error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
