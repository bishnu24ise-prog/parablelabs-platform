import fs from 'fs';
import { Pool } from 'pg';
import path from 'path';

// Read from .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const connectionStringMatch = envContent.match(/DATABASE_URL=(.*)/);
const connectionString = connectionStringMatch ? connectionStringMatch[1].trim() : '';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  const schema = `
    DROP TABLE IF EXISTS ai_evaluations, audit_log, user_badges, xp_log, project_bids, projects, applications, internship_listings, challenge_submissions, challenges, hackathon_submissions, hackathon_registrations, hackathons, users CASCADE;

    CREATE TABLE users (
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

    CREATE TABLE hackathons (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      organizer VARCHAR(255),
      description TEXT,
      tags JSONB,
      status VARCHAR(50),
      prize VARCHAR(255),
      deadline TIMESTAMP,
      "startDate" TIMESTAMP,
      "endDate" TIMESTAMP,
      "maxTeamSize" INTEGER,
      "createdBy" INTEGER REFERENCES users(id) ON DELETE SET NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE hackathon_registrations (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "hackathonId" INTEGER REFERENCES hackathons(id) ON DELETE CASCADE,
      "registeredAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE hackathon_submissions (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "hackathonId" INTEGER REFERENCES hackathons(id) ON DELETE CASCADE,
      "repoLink" VARCHAR(500),
      "demoLink" VARCHAR(500),
      "submittedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE challenges (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      difficulty VARCHAR(50),
      "xpReward" INTEGER,
      description TEXT,
      category VARCHAR(255),
      "starterCode" TEXT,
      "expectedKeywords" JSONB,
      date VARCHAR(50),
      featured BOOLEAN
    );

    CREATE TABLE challenge_submissions (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "challengeId" INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
      code TEXT,
      correct BOOLEAN,
      "xpAwarded" INTEGER,
      "submittedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE internship_listings (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      company VARCHAR(255),
      description TEXT,
      location VARCHAR(255),
      type VARCHAR(50),
      duration VARCHAR(50),
      stipend VARCHAR(255),
      tags JSONB,
      status VARCHAR(50),
      requirements TEXT,
      "postedBy" INTEGER REFERENCES users(id) ON DELETE SET NULL,
      "postedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE applications (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "listingId" INTEGER REFERENCES internship_listings(id) ON DELETE CASCADE,
      "coverLetter" TEXT,
      status VARCHAR(50),
      "appliedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(100),
      description TEXT,
      budget VARCHAR(255),
      duration VARCHAR(100),
      tags JSONB,
      status VARCHAR(50),
      "postedBy" INTEGER REFERENCES users(id) ON DELETE SET NULL,
      "postedByName" VARCHAR(255),
      requirements TEXT,
      "postedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE project_bids (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "projectId" INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      proposal TEXT,
      "bidAmount" VARCHAR(255),
      "deliveryDays" VARCHAR(50),
      status VARCHAR(50) DEFAULT 'Pending',
      "submittedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE xp_log (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      amount INTEGER,
      reason VARCHAR(255),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE user_badges (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "badgeId" VARCHAR(100),
      "earnedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE audit_log (
      id SERIAL PRIMARY KEY,
      "actorId" INTEGER REFERENCES users(id) ON DELETE SET NULL,
      "actorName" VARCHAR(255),
      "actorRole" VARCHAR(50),
      action VARCHAR(255),
      "targetType" VARCHAR(50),
      "targetId" INTEGER,
      details TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE ai_evaluations (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      code TEXT,
      score INTEGER,
      feedback TEXT,
      "isMockAI" BOOLEAN,
      "evaluatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(schema);
  console.log('✅ Tables created.');

  const tables = ['users', 'hackathons', 'hackathon_registrations', 'hackathon_submissions', 'challenges', 'challenge_submissions', 'internship_listings', 'applications', 'projects', 'project_bids', 'xp_log', 'user_badges', 'audit_log', 'ai_evaluations'];

  for (const table of tables) {
    const file = path.join(process.cwd(), 'scratch', `${table}.json`);
    if (!fs.existsSync(file)) continue;

    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data.length === 0) continue;

    for (const row of data) {
      const keys = Object.keys(row).filter(k => k !== 'id');
      const vals = keys.map(k => {
        if (typeof row[k] === 'object' && row[k] !== null) return JSON.stringify(row[k]);
        if ((k.toLowerCase().endsWith('at') && k !== 'created_at') || k === 'deadline' || k === 'startDate' || k === 'endDate') {
          return row[k] ? new Date(row[k]).toISOString() : null; 
        }
        return row[k];
      });

      keys.push('id');
      vals.push(row.id);

      const placeholders = vals.map((_, i) => `$${i + 1}`).join(', ');
      
      const query = `INSERT INTO ${table} (${keys.map(k => `"${k}"`).join(', ')}) VALUES (${placeholders})`;
      
      try {
        await pool.query(query, vals);
      } catch (err) {
         console.error(`Failed to insert into ${table}:`, err.message, row);
      }
    }
    
    try {
      const maxIdResult = await pool.query(`SELECT MAX(id) FROM ${table}`);
      const maxId = maxIdResult.rows[0].max || 0;
      await pool.query(`SELECT setval('${table}_id_seq', ${Math.max(1, maxId)})`);
    } catch(e) {}

    console.log(`✅ Migrated ${data.length} rows to ${table}`);
  }

  pool.end();
}

migrate().catch(console.error);
