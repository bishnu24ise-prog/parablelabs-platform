import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/challenges/[id]/submit
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const challengeId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const challenges = readTable('challenges');
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });

    const submissions = readTable('challenge_submissions');
    const alreadySubmitted = submissions.some(s => s.challengeId === challengeId && s.userId === decoded.userId);
    if (alreadySubmitted) {
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

    const newSub = {
      id: nextId(submissions),
      challengeId, challengeTitle: challenge.title,
      userId: decoded.userId, userName: decoded.name,
      code, correct, keywordsFound,
      xpAwarded: correct ? challenge.xpReward : Math.floor(challenge.xpReward * 0.2),
      submittedAt: new Date().toISOString()
    };
    submissions.push(newSub);
    writeTable('challenge_submissions', submissions);

    // Award XP
    await awardXP(decoded.userId, newSub.xpAwarded, `Challenge: ${challenge.title} (${correct ? 'correct' : 'partial'})`);

    // Award badges
    const userSubs = submissions.filter(s => s.userId === decoded.userId);
    if (userSubs.length === 1) await awardBadge(decoded.userId, 'first_challenge');

    // Check streak for badge
    const streakDays = computeStreak(decoded.userId, submissions);
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

function computeStreak(userId, submissions) {
  const subs = submissions
    .filter(s => s.userId === userId)
    .map(s => new Date(s.submittedAt).toDateString());
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
