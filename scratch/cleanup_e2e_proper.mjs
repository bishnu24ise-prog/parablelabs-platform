import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/DATABASE_URL=(.*)/);
const pool = new Pool({
  connectionString: match[1].trim(),
  ssl: { rejectUnauthorized: false }
});

async function cleanup() {
  // Find all e2e test users
  const res = await pool.query(`SELECT id, name, email FROM users WHERE email LIKE '%@test.com' OR name LIKE 'E2E%'`);
  console.log('E2E test users found:', res.rows);

  for (const user of res.rows) {
    const userId = user.id;
    console.log(`Deleting user ${user.name} (id=${userId})...`);

    // Delete in dependency order
    await pool.query(`DELETE FROM xp_log WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM user_badges WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM audit_log WHERE "actorId" = $1`, [userId]);
    await pool.query(`DELETE FROM challenge_submissions WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM hackathon_registrations WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM hackathon_submissions WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM applications WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM project_bids WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM ai_evaluations WHERE "userId" = $1`, [userId]);
    await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

    console.log(`  ✅ Deleted user id=${userId}`);
  }

  // Verify
  const after = await pool.query(`SELECT id, name, email, role FROM users`);
  console.log('\nRemaining users after cleanup:');
  console.table(after.rows);

  pool.end();
}

cleanup().catch(console.error);
