import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, dbQuery, getBadgeDefinitions } from '@/lib/db';

// GET /api/gamification/badges — current user's earned badges + all badge progress
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const res = await dbQuery('SELECT id, name, email, role, xp FROM users WHERE id = $1', [decoded.userId]);
    if (res.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const user = res.rows[0];

    const allBadges = getBadgeDefinitions();
    const userBadges = readTable('user_badges').filter(b => b.userId === decoded.userId);
    const earnedIds = userBadges.map(b => b.badgeId);

    const xp = user.xp || 0;
    const challengeSubs = readTable('challenge_submissions').filter(s => s.userId === decoded.userId);
    const hackRegistrations = readTable('hackathon_registrations').filter(r => r.userId === decoded.userId);

    // Build progress for each badge
    const badgeProgress = allBadges.map(badge => {
      const earned = earnedIds.includes(badge.id);
      const earnedAt = userBadges.find(b => b.badgeId === badge.id)?.earnedAt || null;

      let progress = 0;
      let progressMax = 1;
      let progressLabel = '';

      if (badge.xpRequired > 0) {
        progress = Math.min(xp, badge.xpRequired);
        progressMax = badge.xpRequired;
        progressLabel = `${xp} / ${badge.xpRequired} XP`;
      } else if (badge.id === 'first_challenge') {
        progress = Math.min(challengeSubs.length, 1);
        progressMax = 1;
        progressLabel = `${challengeSubs.length} / 1 challenge`;
      } else if (badge.id === 'streak_7') {
        const streak = computeStreak(decoded.userId);
        progress = Math.min(streak, 7);
        progressMax = 7;
        progressLabel = `${streak} / 7 days`;
      } else if (badge.id === 'streak_30') {
        const streak = computeStreak(decoded.userId);
        progress = Math.min(streak, 30);
        progressMax = 30;
        progressLabel = `${streak} / 30 days`;
      } else if (badge.id === 'hackathon_join') {
        progress = Math.min(hackRegistrations.length, 1);
        progressMax = 1;
        progressLabel = `${hackRegistrations.length} / 1 hackathon`;
      } else if (badge.id === 'first_login') {
        progress = 1;
        progressMax = 1;
        progressLabel = 'Completed';
      } else if (badge.id === 'project_submit') {
        const projectSubs = readTable('hackathon_submissions').filter(s => s.userId === decoded.userId);
        progress = Math.min(projectSubs.length, 1);
        progressMax = 1;
        progressLabel = `${projectSubs.length} / 1 project`;
      } else if (badge.id === 'first_apply') {
        const applications = readTable('applications').filter(a => a.userId === decoded.userId);
        progress = Math.min(applications.length, 1);
        progressMax = 1;
        progressLabel = `${applications.length} / 1 application`;
      }

      return {
        ...badge,
        earned,
        earnedAt,
        progress,
        progressMax,
        progressLabel,
        progressPct: progressMax > 0 ? Math.round((progress / progressMax) * 100) : 0,
      };
    });

    return NextResponse.json({
      badges: badgeProgress,
      totalEarned: earnedIds.length,
      totalAvailable: allBadges.length,
      xp: user.xp || 0,
      level: Math.floor((user.xp || 0) / 500) + 1,
    });
  } catch (err) {
    console.error('/api/gamification/badges error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function computeStreak(userId) {
  const subs = readTable('challenge_submissions')
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
