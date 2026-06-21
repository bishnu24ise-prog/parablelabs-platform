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

async function alter() {
  await pool.query(`
    ALTER TABLE project_bids 
    ADD COLUMN IF NOT EXISTS "projectTitle" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "userName" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "userEmail" VARCHAR(255);
  `);
  console.log('project_bids altered successfully.');
  pool.end();
}

alter().catch(console.error);
