/**
 * E2E Test Data Cleanup Script
 * Removes all users whose email starts with "e2e_" and all data they generated.
 * Safe to run multiple times — idempotent.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const SCRATCH = join(__dir); // script lives in scratch/

function readJson(file) {
  const p = join(SCRATCH, file);
  if (!existsSync(p)) return [];
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return []; }
}

function writeJson(file, data) {
  writeFileSync(join(SCRATCH, file), JSON.stringify(data, null, 2));
}

// ── 1. Find test user IDs ─────────────────────────────────────────────────────
const users = readJson('users.json');
const testUsers = users.filter(u =>
  u.email && u.email.toLowerCase().startsWith('e2e_')
);

if (testUsers.length === 0) {
  console.log('✅ No E2E test users found — database is already clean.');
  process.exit(0);
}

const testIds = new Set(testUsers.map(u => u.id));

console.log(`Found ${testUsers.length} E2E test user(s) to remove:`);
testUsers.forEach(u =>
  console.log(`  • ID=${u.id}  "${u.name}"  <${u.email}>  (${u.role})  xp=${u.xp}`)
);
console.log('');

// ── 2. Remove from users.json ────────────────────────────────────────────────
const cleanUsers = users.filter(u => !testIds.has(u.id));
writeJson('users.json', cleanUsers);
console.log(`✅ users.json                             ${testUsers.length} user(s) removed → ${cleanUsers.length} remaining`);

// ── 3. Clean each dependent file by user field ───────────────────────────────
function clean(file, userField) {
  const rows = readJson(file);
  if (!rows.length) {
    console.log(`   ${file.padEnd(42)} (empty — skipped)`);
    return;
  }
  const kept = rows.filter(r => !testIds.has(r[userField]));
  const removed = rows.length - kept.length;
  writeJson(file, kept);
  console.log(`✅ ${file.padEnd(42)} −${removed} rows → ${kept.length} remaining`);
}

console.log('');
console.log('Cleaning dependent tables:');
clean('hackathon_registrations.json', 'userId');
clean('hackathon_submissions.json',   'userId');
clean('challenge_submissions.json',   'userId');
clean('applications.json',            'userId');
clean('project_bids.json',            'userId');
clean('xp_log.json',                  'userId');
clean('user_badges.json',             'userId');
clean('ai_evaluations.json',          'userId');

// audit_log uses actorId
const audit = readJson('audit_log.json');
if (audit.length) {
  const keptAudit = audit.filter(r => !testIds.has(r.actorId));
  writeJson('audit_log.json', keptAudit);
  console.log(`✅ ${'audit_log.json'.padEnd(42)} −${audit.length - keptAudit.length} rows → ${keptAudit.length} remaining`);
} else {
  console.log(`   ${'audit_log.json'.padEnd(42)} (empty — skipped)`);
}

// ── 4. Final state ────────────────────────────────────────────────────────────
console.log('');
console.log('══════════════════════════════════════════════════════');
console.log(` ✅  Cleanup complete — ${testUsers.length} test user(s) and all their data deleted.`);
console.log('══════════════════════════════════════════════════════');
console.log('');
console.log('Remaining real users:');
if (cleanUsers.length === 0) {
  console.log('  (none)');
} else {
  cleanUsers.forEach(u =>
    console.log(`  • ID=${u.id}  "${u.name}"  <${u.email}>  (${u.role})  xp=${u.xp}`)
  );
}
console.log('');
