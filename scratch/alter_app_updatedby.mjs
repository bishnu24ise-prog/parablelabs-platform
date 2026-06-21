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
    ALTER TABLE applications 
    ADD COLUMN IF NOT EXISTS "updatedBy" INTEGER;
  `);
  console.log('applications altered again successfully.');
  pool.end();
}

alter().catch(console.error);
