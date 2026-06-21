import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

async function computeStreak(userId) {
  const subsRes = await dbQuery('SELECT "submittedAt" FROM challenge_submissions WHERE "userId" = $1', [userId]);
  const subs = subsRes.rows.map(s => new Date(s.submittedAt).toDateString());
  const uniqueDays = [...new Set(subs)].sort().reverse();

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = d.toDateString();
    if (uniqueDays.includes(ds)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

// GET /api/challenges — list challenges with user completion status
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const challengesRes = await dbQuery('SELECT * FROM challenges');
    const challenges = challengesRes.rows.map(c => {
      if (typeof c.expectedKeywords === 'string') {
        try { c.expectedKeywords = JSON.parse(c.expectedKeywords); } catch { c.expectedKeywords = []; }
      }
      return c;
    });

    let subs = [];
    let streak = 0;
    if (decoded) {
      const subsRes = await dbQuery('SELECT "challengeId" FROM challenge_submissions WHERE "userId" = $1', [decoded.userId]);
      subs = subsRes.rows;
      streak = await computeStreak(decoded.userId);
    }

    const today = new Date().toDateString();
    const enriched = challenges.map(c => ({
      ...c,
      completed: subs.some(s => s.challengeId === c.id),
      isToday: c.date === today,
    }));

    // Sort: today first, then by date desc
    enriched.sort((a, b) => {
      if (a.isToday) return -1;
      if (b.isToday) return 1;
      return new Date(b.date) - new Date(a.date);
    });

    return NextResponse.json({ challenges: enriched, streak });
  } catch (err) {
    console.error('/api/challenges GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
