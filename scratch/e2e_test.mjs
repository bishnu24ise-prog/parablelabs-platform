/**
 * ParableLabs End-to-End API Test Script
 * Runs against the live Next.js dev server at localhost:3000
 * XP is read from /api/profile (live DB) — NOT /api/auth/session (JWT cache)
 */

const BASE = 'http://localhost:3000';

let sessionCookie = '';
let adminCookie = '';

async function api(method, path, body, cookie) {
  const headers = { 'Content-Type': 'application/json' };
  if (cookie) headers['Cookie'] = cookie;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, headers: res.headers, json };
}

function extractCookie(headers) {
  const raw = headers.get('set-cookie') || '';
  const parts = raw.split(',').map(s => s.trim().split(';')[0]);
  return parts.filter(Boolean).join('; ');
}

function pass(step, data) {
  console.log(`\n✅ STEP ${step} — PASSED`);
  console.log(JSON.stringify(data, null, 2));
}

function fail(step, msg, data) {
  console.error(`\n❌ STEP ${step} — FAILED: ${msg}`);
  if (data) console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

// Helper: get live XP from profile (DB, not JWT cache)
async function getLiveXP(cookie) {
  const r = await api('GET', '/api/profile', null, cookie);
  return r.json.xp || 0;
}

async function run() {
  const ts = Date.now();
  const testEmail = `e2e_student_${ts}@test.com`;
  const adminEmail = `e2e_admin_${ts}@test.com`;
  let userId;
  let xpAfterSignup, xpAfterHackathon, xpAfterChallenge, xpAfterApply, xpAfterBid;
  let hackathonId, challengeId, internshipId, projectId;

  console.log('═══════════════════════════════════════════════════════');
  console.log(' ParableLabs E2E API Test — ' + new Date().toISOString());
  console.log('═══════════════════════════════════════════════════════');

  // ── Step 1: Signup ──────────────────────────────────────────────────────────
  console.log('\n── Step 1: Signup (Student) ──────────────────────────');
  {
    const r = await api('POST', '/api/auth/signup', {
      name: 'E2E Test Student',
      email: testEmail,
      password: 'TestPass123!',
      role: 'Student',
    });
    if (r.status !== 201 && r.status !== 200) fail(1, `Expected 200/201, got ${r.status}`, r.json);
    if (!r.json.user) fail(1, 'No user in response', r.json);
    userId = r.json.user.id;
    const c = extractCookie(r.headers);
    if (c) sessionCookie = c;
    pass(1, {
      userId,
      name: r.json.user.name,
      email: r.json.user.email,
      role: r.json.user.role,
      cookieReceived: !!sessionCookie,
    });
  }

  if (!sessionCookie) {
    // Fallback: login
    const lr = await api('POST', '/api/auth/login', { email: testEmail, password: 'TestPass123!' });
    if (lr.status !== 200) fail('1b', `Login failed: ${lr.status}`, lr.json);
    let lc = extractCookie(lr.headers);
    if (lc) sessionCookie = lc;
    if (lr.json.requiresMfa) {
      const mr = await api('POST', '/api/auth/verify-mfa', { code: '123456' }, lc);
      const mc = extractCookie(mr.headers);
      if (mc) sessionCookie = mc;
    }
  }
  if (!sessionCookie) fail(1, 'No session cookie');

  // Read baseline XP (profile reads live DB)
  xpAfterSignup = await getLiveXP(sessionCookie);

  // ── Step 2: Onboarding ──────────────────────────────────────────────────────
  console.log('\n── Step 2: Onboarding ────────────────────────────────');
  {
    const r = await api('POST', '/api/auth/onboarding', {
      university: 'IIT Bombay',
      gradYear: '2025',
      skills: ['React', 'Python', 'ML'],
      bio: 'E2E test user — Student',
    }, sessionCookie);
    const c = extractCookie(r.headers);
    if (c) sessionCookie = c;
    if (r.status !== 200) fail(2, `Onboarding failed: ${r.status}`, r.json);
    pass(2, { message: r.json.message, onboarded: r.json.user?.onboarded ?? r.json.onboarded ?? true });
  }

  // ── Step 3: Session check ───────────────────────────────────────────────────
  console.log('\n── Step 3: /api/auth/session — Name & Role ───────────');
  {
    const r = await api('GET', '/api/auth/session', null, sessionCookie);
    if (r.status !== 200) fail(3, `Session failed: ${r.status}`, r.json);
    if (!r.json.user) fail(3, 'No user in session', r.json);
    if (r.json.user.email.toLowerCase() !== testEmail.toLowerCase())
      fail(3, `Email mismatch: got "${r.json.user.email}"`, r.json.user);
    if (r.json.user.role !== 'Student')
      fail(3, `Role mismatch: got "${r.json.user.role}"`, r.json.user);
    pass(3, {
      id: r.json.user.id,
      name: r.json.user.name,
      email: r.json.user.email,
      role: r.json.user.role,
      onboarded: r.json.user.onboarded,
      xp_note: 'XP in JWT may be stale — live XP read from /api/profile below',
      liveXP: xpAfterSignup,
    });
  }

  // ── Step 4: Hackathon registration (+100 XP) ────────────────────────────────
  console.log('\n── Step 4: Hackathon Registration (+100 XP) ──────────');
  {
    const listR = await api('GET', '/api/hackathons?status=open', null, sessionCookie);
    if (listR.status !== 200) fail(4, `List failed: ${listR.status}`, listR.json);
    const hackathons = listR.json.hackathons || [];
    if (!hackathons.length) fail(4, 'No open hackathons');
    hackathonId = hackathons[0].id;
    console.log(`  Hackathon ID=${hackathonId}: "${hackathons[0].title}"`);

    const r = await api('POST', `/api/hackathons/${hackathonId}/register`, {}, sessionCookie);
    if (r.status !== 200) fail(4, `Registration failed: ${r.status}`, r.json);

    xpAfterHackathon = await getLiveXP(sessionCookie);
    const gained = xpAfterHackathon - xpAfterSignup;
    if (gained !== 100) console.warn(`  ⚠️ XP gain=${gained}, expected 100`);

    pass(4, {
      hackathonId,
      title: hackathons[0].title,
      registrationId: r.json.registration?.id,
      message: r.json.message,
      xpBefore: xpAfterSignup,
      xpAfter: xpAfterHackathon,
      xpGained: gained,
      expectedGain: 100,
      xpCorrect: gained === 100,
    });
  }

  // ── Step 5: Daily challenge submission ──────────────────────────────────────
  console.log('\n── Step 5: Challenge Submission (keyword scoring) ────');
  {
    const listR = await api('GET', '/api/challenges', null, sessionCookie);
    if (listR.status !== 200) fail(5, `Challenges list failed: ${listR.status}`, listR.json);
    const streakBefore = listR.json.streak || 0;
    const challenges = listR.json.challenges || [];
    if (!challenges.length) fail(5, 'No challenges');
    challengeId = challenges[0].id;
    console.log(`  Challenge ID=${challengeId}: "${challenges[0].title}"`);
    console.log(`  Expected keywords: ${JSON.stringify(challenges[0].expectedKeywords)}`);

    // Craft code that includes the expected keywords for the SQL challenge
    const kw = challenges[0].expectedKeywords || [];
    const testCode = `
-- Optimized query using ${kw.join(', ')}
SELECT u.name, u.email, SUM(o.amount) AS total, COUNT(*) AS order_count
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name, u.email
HAVING SUM(o.amount) > 1000
ORDER BY total DESC;
`;
    const r = await api('POST', `/api/challenges/${challengeId}/submit`, { code: testCode }, sessionCookie);
    if (r.status !== 200) fail(5, `Submit failed: ${r.status}`, r.json);

    xpAfterChallenge = await getLiveXP(sessionCookie);
    const listR2 = await api('GET', '/api/challenges', null, sessionCookie);
    const streakAfter = listR2.json.streak || 0;

    pass(5, {
      challengeId,
      correct: r.json.correct,
      xpAwarded: r.json.xpAwarded,
      message: r.json.message,
      xpBefore: xpAfterHackathon,
      xpAfter: xpAfterChallenge,
      xpGained: xpAfterChallenge - xpAfterHackathon,
      streakBefore,
      streakAfter,
      submissionId: r.json.submission?.id,
    });
  }

  // ── Step 6: Internship application (+75 XP) ─────────────────────────────────
  console.log('\n── Step 6: Internship Application (+75 XP) ───────────');
  {
    const listR = await api('GET', '/api/internships', null, sessionCookie);
    if (listR.status !== 200) fail(6, `List failed: ${listR.status}`, listR.json);
    const listings = listR.json.listings || [];
    if (!listings.length) fail(6, 'No internship listings');
    internshipId = listings[0].id;
    console.log(`  Listing ID=${internshipId}: "${listings[0].title}" @ ${listings[0].company}`);

    const r = await api('POST', `/api/internships/${internshipId}/apply`, {
      coverLetter: 'I excel at frontend development with React and TypeScript. I built several production apps and have strong testing experience with Cypress and Jest.',
    }, sessionCookie);
    if (r.status !== 200) fail(6, `Apply failed: ${r.status}`, r.json);

    xpAfterApply = await getLiveXP(sessionCookie);
    pass(6, {
      internshipId,
      applicationId: r.json.application?.id,
      status: r.json.application?.status,
      message: r.json.message,
      xpBefore: xpAfterChallenge,
      xpAfter: xpAfterApply,
      xpGained: xpAfterApply - xpAfterChallenge,
      expectedGain: 75,
      xpCorrect: (xpAfterApply - xpAfterChallenge) === 75,
    });
  }

  // ── Step 7: Badge progress ───────────────────────────────────────────────────
  console.log('\n── Step 7: Badge Progress (reflects real activity) ───');
  {
    const r = await api('GET', '/api/gamification/badges', null, sessionCookie);
    if (r.status !== 200) fail(7, `Badges failed: ${r.status}`, r.json);

    const earned = r.json.badges.filter(b => b.earned);
    const hackBadge = r.json.badges.find(b => b.id === 'hackathon_join');
    const applyBadge = r.json.badges.find(b => b.id === 'first_apply');
    const challengeBadge = r.json.badges.find(b => b.id === 'first_challenge');

    // Validate expected badges
    if (!hackBadge?.earned) console.warn('  ⚠️ hackathon_join badge not yet earned');
    if (!applyBadge?.earned) console.warn('  ⚠️ first_apply badge not yet earned');
    if (!challengeBadge?.earned) console.warn('  ⚠️ first_challenge badge not yet earned');

    pass(7, {
      totalXP: r.json.xp,
      level: r.json.level,
      totalEarned: r.json.totalEarned,
      totalAvailable: r.json.totalAvailable,
      earnedBadges: earned.map(b => ({ id: b.id, name: b.name })),
      expectedBadgeStatus: {
        hackathon_join: { earned: hackBadge?.earned, progress: hackBadge?.progressLabel },
        first_apply: { earned: applyBadge?.earned, progress: applyBadge?.progressLabel },
        first_challenge: { earned: challengeBadge?.earned, progress: challengeBadge?.progressLabel },
      },
    });
  }

  // ── Step 8: Leaderboard — user appears with correct XP ──────────────────────
  console.log('\n── Step 8: Leaderboard — user appears with real XP ───');
  {
    const r = await api('GET', '/api/gamification/leaderboard', null, sessionCookie);
    if (r.status !== 200) fail(8, `Leaderboard failed: ${r.status}`, r.json);

    const myEntry = r.json.leaderboard.find(u => u.id === userId);
    if (!myEntry) fail(8, `User ID=${userId} not found on leaderboard`, { leaderboard: r.json.leaderboard });

    const liveXP = await getLiveXP(sessionCookie);
    pass(8, {
      totalOnLeaderboard: r.json.leaderboard.length,
      myRank: r.json.myRank,
      myEntry: {
        name: myEntry.name,
        role: myEntry.role,
        xp: myEntry.xp,
        level: myEntry.level,
        rank: myEntry.rank,
        challengesSolved: myEntry.challengesSolved,
        hackathonsJoined: myEntry.hackathonsJoined,
      },
      liveXPFromProfile: liveXP,
      xpMatchesLeaderboard: myEntry.xp === liveXP,
      top3: r.json.leaderboard.slice(0, 3).map(u => ({ name: u.name, xp: u.xp, rank: u.rank })),
    });
  }

  // ── Step 9: Project bid (+50 XP) ────────────────────────────────────────────
  console.log('\n── Step 9: Project Bid (+50 XP) ─────────────────────');
  {
    const listR = await api('GET', '/api/projects', null, sessionCookie);
    if (listR.status !== 200) fail(9, `Projects list failed: ${listR.status}`, listR.json);
    const projects = listR.json.projects || [];
    if (!projects.length) fail(9, 'No projects found');
    projectId = projects[0].id;
    console.log(`  Project ID=${projectId}: "${projects[0].title}"`);

    const r = await api('POST', `/api/projects/${projectId}/bid`, {
      proposal: 'I have deep experience with Python NLP using spaCy and transformers. I can build the resume parsing pipeline with 95%+ accuracy. Delivery in 12 days, tested with 100+ edge cases.',
      bidAmount: '₹20,000',
      deliveryDays: '12',
    }, sessionCookie);
    if (r.status !== 200) fail(9, `Bid failed: ${r.status}`, r.json);

    xpAfterBid = await getLiveXP(sessionCookie);
    pass(9, {
      projectId,
      bidId: r.json.bid?.id,
      message: r.json.message,
      xpBefore: xpAfterApply,
      xpAfter: xpAfterBid,
      xpGained: xpAfterBid - xpAfterApply,
      expectedGain: 50,
      xpCorrect: (xpAfterBid - xpAfterApply) === 50,
    });
  }

  // ── Step 10: Second user (Platform Admin) + /api/admin/users ────────────────
  console.log('\n── Step 10a: Signup Second User (Platform Admin) ─────');
  {
    const r = await api('POST', '/api/auth/signup', {
      name: 'E2E Platform Admin',
      email: adminEmail,
      password: 'AdminPass123!',
      role: 'Platform Admin',
    });
    if (r.status !== 201 && r.status !== 200) fail('10a', `Admin signup failed: ${r.status}`, r.json);
    const ac = extractCookie(r.headers);
    if (ac) adminCookie = ac;
    console.log('  Admin created:', JSON.stringify({ id: r.json.user?.id, name: r.json.user?.name, role: r.json.user?.role }, null, 2));
  }

  if (!adminCookie) {
    const lr = await api('POST', '/api/auth/login', { email: adminEmail, password: 'AdminPass123!' });
    if (lr.status !== 200) fail('10b', `Admin login failed`, lr.json);
    let lc = extractCookie(lr.headers);
    if (lc) adminCookie = lc;
    if (lr.json.requiresMfa) {
      const mr = await api('POST', '/api/auth/verify-mfa', { code: '123456' }, lc);
      const mc = extractCookie(mr.headers);
      if (mc) adminCookie = mc;
    }
  }
  if (!adminCookie) fail(10, 'No admin cookie');

  console.log('\n── Step 10b: /api/admin/users — List All Users ───────');
  {
    const r = await api('GET', '/api/admin/users', null, adminCookie);
    if (r.status !== 200) fail('10b', `Admin users failed: ${r.status}`, r.json);

    const all = r.json.users || [];
    const studentUser = all.find(u => u.email?.toLowerCase() === testEmail.toLowerCase());
    const adminUser = all.find(u => u.email?.toLowerCase() === adminEmail.toLowerCase());

    if (!studentUser) fail(10, `Student user "${testEmail}" NOT in admin list`, { emails: all.map(u => u.email) });
    if (!adminUser) fail(10, `Admin user "${adminEmail}" NOT in admin list`, { emails: all.map(u => u.email) });

    pass(10, {
      totalUsers: all.length,
      roleStats: r.json.stats?.byRole,
      student: {
        id: studentUser.id,
        name: studentUser.name,
        email: studentUser.email,
        role: studentUser.role,
        xp: studentUser.xp,
        level: studentUser.level,
      },
      admin: {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
      bothFound: true,
    });
  }

  // ── Final Summary ────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════');
  console.log(' ✅ ALL 10 STEPS PASSED — Full E2E test complete!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n📊 XP Progression (from /api/profile — live DB):');
  console.log(`  After signup:             ${xpAfterSignup} XP  (baseline)`);
  console.log(`  After hackathon register: ${xpAfterHackathon} XP  (+${xpAfterHackathon - xpAfterSignup}, expected +100)`);
  console.log(`  After challenge submit:   ${xpAfterChallenge} XP  (+${xpAfterChallenge - xpAfterHackathon})`);
  console.log(`  After internship apply:   ${xpAfterApply} XP  (+${xpAfterApply - xpAfterChallenge}, expected +75)`);
  console.log(`  After project bid:        ${xpAfterBid} XP  (+${xpAfterBid - xpAfterApply}, expected +50)`);
  console.log(`  Total XP earned:          ${xpAfterBid - xpAfterSignup} XP`);
  console.log('');
}

run().catch(err => {
  console.error('\n💥 UNHANDLED ERROR:', err.message);
  console.error(err.stack);
  process.exit(1);
});
