import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/challenges/[id]/submit
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const challengeId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const challengeRes = await dbQuery('SELECT title, "expectedKeywords", "xpReward" FROM challenges WHERE id = $1', [challengeId]);
    if (challengeRes.rows.length === 0) return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
    const challenge = challengeRes.rows[0];
    if (typeof challenge.expectedKeywords === 'string') {
      try { challenge.expectedKeywords = JSON.parse(challenge.expectedKeywords); } catch { challenge.expectedKeywords = []; }
    }

    const subRes = await dbQuery('SELECT id FROM challenge_submissions WHERE "challengeId" = $1 AND "userId" = $2', [challengeId, decoded.userId]);
    if (subRes.rows.length > 0) {
      return NextResponse.json({ error: 'You have already submitted this challenge.' }, { status: 400 });
    }

    const body = await request.json();
    const { code } = body;
    if (!code || code.trim().length < 10) {
      return NextResponse.json({ error: 'Please write some code before submitting.' }, { status: 400 });
    }

    // Rule-based "correctness" check: does the code contain expected keywords?
    const codeUpper = code.toUpperCase();
    const keywordsFound = (challenge.expectedKeywords || []).filter(kw => 
      codeUpper.includes(kw.toUpperCase())
    );
    const correct = keywordsFound.length >= Math.ceil((challenge.expectedKeywords || []).length / 2);

    const xpAwarded = correct ? challenge.xpReward : Math.floor(challenge.xpReward * 0.2);

    const insertRes = await dbQuery(
      `INSERT INTO challenge_submissions 
       ("challengeId", "challengeTitle", "userId", "userName", code, correct, "keywordsFound", "xpAwarded") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [challengeId, challenge.title, decoded.userId, decoded.name, code, correct, JSON.stringify(keywordsFound), xpAwarded]
    );
    const newSub = insertRes.rows[0];

    // Award XP
    await awardXP(decoded.userId, newSub.xpAwarded, `Challenge: ${challenge.title} (${correct ? 'correct' : 'partial'})`);

    // Award badges
    const userSubsRes = await dbQuery('SELECT id FROM challenge_submissions WHERE "userId" = $1', [decoded.userId]);
    if (userSubsRes.rows.length === 1) await awardBadge(decoded.userId, 'first_challenge');

    // Check streak for badge
    const streakDays = await computeStreak(decoded.userId);
    if (streakDays >= 7) await awardBadge(decoded.userId, 'streak_7');
    if (streakDays >= 30) await awardBadge(decoded.userId, 'streak_30');

    return NextResponse.json({
      success: true,
      correct,
      xpAwarded: newSub.xpAwarded,
      message: correct 
        ? `Great work! You earned ${newSub.xpAwarded} XP!`
        : `Partial solution — ${newSub.xpAwarded} XP awarded. Try including: ${challenge.expectedKeywords?.join(', ')}`,
      submission: newSub
    });
  } catch (err) {
    console.error('/api/challenges/[id]/submit error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function computeStreak(userId) {
  const subsRes = await dbQuery('SELECT "submittedAt" FROM challenge_submissions WHERE "userId" = $1', [userId]);
  const subs = subsRes.rows.map(s => new Date(s.submittedAt).toDateString());
  const uniqueDays = [...new Set(subs)].sort().reverse();

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (uniqueDays.includes(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return streak;
}
