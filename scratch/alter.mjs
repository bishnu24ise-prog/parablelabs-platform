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
    ALTER TABLE hackathon_submissions 
    DROP COLUMN IF EXISTS "repoLink", 
    DROP COLUMN IF EXISTS "demoLink", 
    ADD COLUMN "projectTitle" VARCHAR(255), 
    ADD COLUMN description TEXT, 
    ADD COLUMN "repoUrl" VARCHAR(500), 
    ADD COLUMN "demoUrl" VARCHAR(500), 
    ADD COLUMN "techStack" JSONB, 
    ADD COLUMN "teamMembers" JSONB, 
    ADD COLUMN status VARCHAR(50), 
    ADD COLUMN "userName" VARCHAR(255), 
    ADD COLUMN "hackathonTitle" VARCHAR(255);
  `);
  console.log('Table altered successfully.');
  pool.end();
}

alter().catch(console.error);
