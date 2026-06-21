import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/gamification/leaderboard
export async function GET(request) {
  try {
    // Get all users from DB
    const res = await dbQuery('SELECT id, name, email, role, xp FROM users', []);
    const users = res.rows;

    const badgesRes = await dbQuery('SELECT "userId" FROM user_badges');
    const hacksRes = await dbQuery('SELECT "userId" FROM hackathon_registrations');
    const challRes = await dbQuery('SELECT "userId" FROM challenge_submissions WHERE correct = true');

    const badges = badgesRes.rows;
    const hacks = hacksRes.rows;
    const chall = challRes.rows;

    // Sort by XP descending
    const sorted = users
      .map(u => ({
        id: u.id,
        name: u.name,
        role: u.role,
        xp: u.xp || 0,
        level: Math.floor((u.xp || 0) / 500) + 1,
        badgeCount: badges.filter(b => b.userId === u.id).length,
        hackathonsJoined: hacks.filter(r => r.userId === u.id).length,
        challengesSolved: chall.filter(s => s.userId === u.id).length,
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((u, i) => ({ ...u, rank: i + 1 }));

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    const myRank = decoded ? sorted.find(u => u.id === decoded.userId)?.rank || null : null;

    return NextResponse.json({ leaderboard: sorted.slice(0, 50), myRank });
  } catch (err) {
    console.error('/api/gamification/leaderboard error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
