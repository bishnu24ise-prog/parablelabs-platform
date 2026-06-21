import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/profile — returns current user's full profile
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const res = await dbQuery('SELECT id, name, email, role, onboarded, profile_data, xp FROM users WHERE id = $1', [decoded.userId]);
    if (res.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const user = res.rows[0];
    const profile = typeof user.profile_data === 'string' ? JSON.parse(user.profile_data || '{}') : (user.profile_data || {});

    // Calculate level from XP
    const xp = user.xp || 0;
    const level = Math.floor(xp / 500) + 1;

    // Count hackathons joined
    const registrationsRes = await dbQuery('SELECT id FROM hackathon_registrations WHERE "userId" = $1', [user.id]);
    const submissionsRes = await dbQuery('SELECT id FROM hackathon_submissions WHERE "userId" = $1', [user.id]);
    const applicationsRes = await dbQuery('SELECT id FROM applications WHERE "userId" = $1', [user.id]);
    const challengeSubsRes = await dbQuery('SELECT id, correct FROM challenge_submissions WHERE "userId" = $1', [user.id]);
    const streakData = await computeStreak(user.id);

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp,
      level,
      onboarded: user.onboarded,
      bio: profile.bio || '',
      skills: profile.skills || [],
      github: profile.github || '',
      linkedin: profile.linkedin || '',
      portfolio: profile.portfolio || '',
      university: profile.university || '',
      company: profile.company || '',
      gradYear: profile.gradYear || '',
      experience: profile.experience || '',
      stats: {
        hackathonsJoined: registrationsRes.rows.length,
        projectsSubmitted: submissionsRes.rows.length,
        applicationsSubmitted: applicationsRes.rows.length,
        challengesSolved: challengeSubsRes.rows.filter(c => c.correct).length,
        currentStreak: streakData.streak,
      }
    });
  } catch (err) {
    console.error('/api/profile GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/profile — update current user's profile fields
export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { bio, skills, github, linkedin, portfolio } = body;

    await dbQuery('UPDATE users SET profile_data = $1 WHERE id = $2', [
      JSON.stringify({ bio, skills, github, linkedin, portfolio }),
      decoded.userId
    ]);

    return NextResponse.json({ success: true, message: 'Profile updated.' });
  } catch (err) {
    console.error('/api/profile PUT error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function computeStreak(userId) {
  const subsRes = await dbQuery('SELECT "submittedAt" FROM challenge_submissions WHERE "userId" = $1 AND correct = true', [userId]);
  const subs = subsRes.rows.map(s => new Date(s.submittedAt).toDateString());
  const uniqueDays = [...new Set(subs)].sort();

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (uniqueDays.includes(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return { streak };
}
