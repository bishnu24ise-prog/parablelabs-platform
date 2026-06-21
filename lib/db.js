import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;
let pool = null;
let useLocalJson = false;
const scratchDir = path.join(process.cwd(), 'scratch');

// ─── PostgreSQL Setup ──────────────────────────────────────────────────────────
if (connectionString) {
  try {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('supabase') || connectionString.includes('neon')
        ? { rejectUnauthorized: false }
        : false
    });
    console.log('PostgreSQL database pool initialized.');
  } catch (error) {
    console.error('Failed to initialize PostgreSQL pool, falling back to local JSON database:', error);
    useLocalJson = true;
  }
} else {
  console.warn('DATABASE_URL not set. Using local JSON database (scratch/*.json).');
  useLocalJson = true;
}

// ─── JSON File DB Helpers ──────────────────────────────────────────────────────
if (useLocalJson && !fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

function tableFile(name) {
  return path.join(scratchDir, `${name}.json`);
}

export function readTable(name) {
  const fp = tableFile(name);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch {
    return [];
  }
}

export function writeTable(name, data) {
  fs.writeFileSync(tableFile(name), JSON.stringify(data, null, 2), 'utf8');
}

export function nextId(rows) {
  return rows.length > 0 ? Math.max(...rows.map(r => r.id || 0)) + 1 : 1;
}

// ─── Users table helpers (for JSON mode) ──────────────────────────────────────
function runJsonQuery(action, params = []) {
  const users = readTable('users');

  if (action === 'FIND_BY_EMAIL') {
    const email = params[0].toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === email);
    return { rows: user ? [user] : [] };
  }
  if (action === 'FIND_BY_ID') {
    const id = parseInt(params[0], 10);
    const user = users.find(u => u.id === id);
    return { rows: user ? [user] : [] };
  }
  if (action === 'INSERT_USER') {
    const [name, email, password, role] = params;
    const newId = nextId(users);
    const newUser = {
      id: newId, name, email: email.toLowerCase(), password, role,
      onboarded: false, profile_data: null, xp: 0,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    writeTable('users', users);
    return { rows: [newUser] };
  }
  if (action === 'UPDATE_ONBOARDING') {
    const [onboarded, profileData, id] = params;
    const userId = parseInt(id, 10);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].onboarded = onboarded;
      users[index].profile_data = profileData;
      writeTable('users', users);
      return { rows: [users[index]] };
    }
    return { rows: [] };
  }
  if (action === 'UPDATE_PROFILE') {
    const [profileData, id] = params;
    const userId = parseInt(id, 10);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      const parsed = typeof profileData === 'string' ? JSON.parse(profileData) : profileData;
      users[index].profile_data = { ...(users[index].profile_data || {}), ...parsed };
      writeTable('users', users);
      return { rows: [users[index]] };
    }
    return { rows: [] };
  }
  if (action === 'UPDATE_XP') {
    const [xpDelta, id] = params;
    const userId = parseInt(id, 10);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].xp = (users[index].xp || 0) + xpDelta;
      writeTable('users', users);
      return { rows: [users[index]] };
    }
    return { rows: [] };
  }
  if (action === 'UPDATE_ROLE') {
    const [role, id] = params;
    const userId = parseInt(id, 10);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].role = role;
      writeTable('users', users);
      return { rows: [users[index]] };
    }
    return { rows: [] };
  }
  if (action === 'DELETE_USER') {
    const userId = parseInt(params[0], 10);
    const filtered = users.filter(u => u.id !== userId);
    writeTable('users', filtered);
    return { rows: [] };
  }
  if (action === 'LIST_ALL') {
    return { rows: users };
  }
  return { rows: [] };
}

// ─── Main dbQuery Interface ────────────────────────────────────────────────────
export async function dbQuery(sql, params = []) {
  if (!useLocalJson) {
    return pool.query(sql, params);
  }

  const s = sql.trim().toUpperCase();

  if (s.includes('SELECT') && s.includes('EMAIL =')) return runJsonQuery('FIND_BY_EMAIL', params);
  if (s.includes('SELECT') && s.includes('WHERE ID =')) return runJsonQuery('FIND_BY_ID', params);
  if (s.includes('SELECT') && s.includes('FROM USERS WHERE ID')) return runJsonQuery('FIND_BY_ID', params);
  if (s.includes('INSERT INTO USERS')) return runJsonQuery('INSERT_USER', params);
  if (s.includes('UPDATE USERS') && s.includes('ONBOARDED')) return runJsonQuery('UPDATE_ONBOARDING', params);
  if (s.includes('UPDATE USERS') && s.includes('PROFILE_DATA')) return runJsonQuery('UPDATE_PROFILE', params);
  if (s.includes('UPDATE USERS') && s.includes('XP')) return runJsonQuery('UPDATE_XP', params);
  if (s.includes('UPDATE USERS') && s.includes('ROLE')) return runJsonQuery('UPDATE_ROLE', params);
  if (s.includes('DELETE FROM USERS')) return runJsonQuery('DELETE_USER', params);
  if (s.includes('SELECT') && s.includes('FROM USERS') && !s.includes('WHERE')) return runJsonQuery('LIST_ALL', params);

  return { rows: [] };
}

// ─── DB Init (PostgreSQL schema creation) ─────────────────────────────────────
export async function initDb() {
  if (useLocalJson) return;
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      onboarded BOOLEAN DEFAULT FALSE,
      profile_data JSONB DEFAULT NULL,
      xp INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try { await pool.query(schema); } catch (e) { console.error('Schema init error:', e); }
}

// ─── Auth Guard Helper ─────────────────────────────────────────────────────────
import jwt from 'jsonwebtoken';
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
  const xpLog = readTable('xp_log');
  xpLog.push({ id: nextId(xpLog), userId, amount, reason, timestamp: new Date().toISOString() });
  writeTable('xp_log', xpLog);

  // Update user XP
  await dbQuery('UPDATE users SET xp = xp + $1 WHERE id = $2', [amount, userId]);

  // Check badge eligibility
  const users = readTable('users');
  const user = users.find(u => u.id === userId);
  if (!user) return;

  const userBadges = readTable('user_badges');
  const earned = userBadges.filter(b => b.userId === userId).map(b => b.badgeId);

  const newBadges = [];
  for (const badge of BADGE_DEFINITIONS) {
    if (earned.includes(badge.id)) continue;
    if (badge.xpRequired > 0 && (user.xp || 0) >= badge.xpRequired) {
      userBadges.push({ id: nextId(userBadges), userId, badgeId: badge.id, earnedAt: new Date().toISOString() });
      newBadges.push(badge.id);
    }
  }
  if (newBadges.length > 0) writeTable('user_badges', userBadges);
}

export async function awardBadge(userId, badgeId) {
  const userBadges = readTable('user_badges');
  const alreadyEarned = userBadges.some(b => b.userId === userId && b.badgeId === badgeId);
  if (!alreadyEarned) {
    userBadges.push({ id: nextId(userBadges), userId, badgeId, earnedAt: new Date().toISOString() });
    writeTable('user_badges', userBadges);
    // Award welcome badge's XP if it has any
    const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
    if (badge && badge.xpRequired > 0) {
      await awardXP(userId, 0, `Badge earned: ${badge.name}`); // Just log, no XP for badge
    }
  }
}

// ─── Audit Log ─────────────────────────────────────────────────────────────────
export function logAuditEvent({ actorId, actorName, actorRole, action, targetType, targetId, details }) {
  const log = readTable('audit_log');
  log.push({
    id: nextId(log),
    actorId, actorName, actorRole,
    action, targetType, targetId: targetId || null,
    details: details || '',
    timestamp: new Date().toISOString()
  });
  writeTable('audit_log', log);
}
