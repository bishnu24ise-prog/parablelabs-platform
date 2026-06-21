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

async function check() {
  const res = await pool.query(`SELECT id, name, email, role, xp FROM users`);
  console.log('Current users in DB:');
  console.table(res.rows);
  pool.end();
}

check().catch(console.error);
