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
    DROP COLUMN IF EXISTS "resumeLink",
    ADD COLUMN IF NOT EXISTS "listingTitle" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS company VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "userName" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "userEmail" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "userRole" VARCHAR(50),
    ADD COLUMN IF NOT EXISTS "resumeUrl" VARCHAR(500),
    ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  `);
  console.log('applications altered successfully.');
  pool.end();
}

alter().catch(console.error);
