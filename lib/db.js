import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const connectionString = process.env.DATABASE_URL;
let pool = null;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables.');
}

pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

console.log('PostgreSQL database pool initialized.');

// ─── Main dbQuery Interface ────────────────────────────────────────────────────
export async function dbQuery(sql, params = []) {
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.error('DB Query Error:', err.message, '\nSQL:', sql, '\nParams:', params);
    throw err;
  }
}

export async function readTable(name) {
  const result = await dbQuery(`SELECT * FROM ${name} ORDER BY id ASC`);
  return result.rows;
}

// ─── Auth Guard Helper ─────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me-in-production';

export function verifySession(cookieValue) {
  if (!cookieValue) return null;
  try {
    const decoded = jwt.verify(cookieValue, JWT_SECRET);
    if (decoded.mfa_pending) return null;
    return decoded;
  } catch {
    return null;
  }
}

// ─── XP Award + Badge Logic ────────────────────────────────────────────────────
const BADGE_DEFINITIONS = [
  { id: 'first_login',      name: 'Welcome Aboard',    icon: 'waving_hand',       xpRequired: 0,    description: 'Joined ParableLabs' },
  { id: 'first_challenge',  name: 'Code Starter',      icon: 'code',              xpRequired: 50,   description: 'Solved your first daily challenge' },
  { id: 'streak_7',         name: 'Weekly Grinder',    icon: 'local_fire_department', xpRequired: 0, description: '7-day challenge streak' },
  { id: 'streak_30',        name: 'Daily Grinder',     icon: 'schedule',          xpRequired: 0,    description: '30-day challenge streak' },
  { id: 'hackathon_join',   name: 'Event Joiner',      icon: 'event',             xpRequired: 100,  description: 'Registered for a hackathon' },
  { id: 'xp_500',           name: 'Rising Star',       icon: 'star',              xpRequired: 500,  description: 'Earned 500 XP' },
  { id: 'xp_1000',          name: 'Top Performer',     icon: 'trophy',            xpRequired: 1000, description: 'Earned 1000 XP' },
  { id: 'xp_5000',          name: 'ML Architect',      icon: 'psychology',        xpRequired: 5000, description: 'Earned 5000 XP' },
  { id: 'project_submit',   name: 'Builder',           icon: 'construction',      xpRequired: 0,    description: 'Submitted a hackathon project' },
  { id: 'first_apply',      name: 'Job Seeker',        icon: 'work',              xpRequired: 0,    description: 'Applied to an internship' },
];

export function getBadgeDefinitions() {
  return BADGE_DEFINITIONS;
}

export async function awardXP(userId, amount, reason) {
  // Log XP event
  await dbQuery('INSERT INTO xp_log ("userId", amount, reason) VALUES ($1, $2, $3)', [userId, amount, reason]);

  // Update user XP
  await dbQuery('UPDATE users SET xp = xp + $1 WHERE id = $2', [amount, userId]);

  // Check badge eligibility
  const userResult = await dbQuery('SELECT xp FROM users WHERE id = $1', [userId]);
  if (userResult.rows.length === 0) return;
  const userXp = userResult.rows[0].xp;

  const earnedResult = await dbQuery('SELECT "badgeId" FROM user_badges WHERE "userId" = $1', [userId]);
  const earned = earnedResult.rows.map(r => r.badgeId);

  for (const badge of BADGE_DEFINITIONS) {
    if (earned.includes(badge.id)) continue;
    if (badge.xpRequired > 0 && userXp >= badge.xpRequired) {
      await dbQuery('INSERT INTO user_badges ("userId", "badgeId") VALUES ($1, $2)', [userId, badge.id]);
    }
  }
}

export async function awardBadge(userId, badgeId) {
  const result = await dbQuery('SELECT id FROM user_badges WHERE "userId" = $1 AND "badgeId" = $2', [userId, badgeId]);
  if (result.rows.length === 0) {
    await dbQuery('INSERT INTO user_badges ("userId", "badgeId") VALUES ($1, $2)', [userId, badgeId]);
    // Award welcome badge's XP if it has any
    const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
    if (badge && badge.xpRequired > 0) {
      await awardXP(userId, 0, `Badge earned: ${badge.name}`);
    }
  }
}

// ─── Audit Log ─────────────────────────────────────────────────────────────────
export async function logAuditEvent({ actorId, actorName, actorRole, action, targetType, targetId, details }) {
  await dbQuery(
    'INSERT INTO audit_log ("actorId", "actorName", "actorRole", action, "targetType", "targetId", details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [actorId, actorName, actorRole, action, targetType, targetId || null, details || '']
  );
}
