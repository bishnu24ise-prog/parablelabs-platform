const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components');

// Requirements from SRS
const SRS_ROLES = ['Student', 'Professional', 'Mentor', 'Recruiter', 'Company Admin', 'Platform Admin'];
const SRS_MODULES = [
  'Authentication', 'User Profiles', 'Hackathon Management', 'Daily Challenges',
  'Gamification', 'AI Evaluation', 'Internship Marketplace', 'Talent Marketplace',
  'Project Marketplace', 'Recruiter Portal', 'Company Portal', 'Analytics'
];
const SRS_AGENTS = ['Trend Agent', 'Internship Agent', 'Recruitment Agent', 'Marketing Agent', 'Community Agent'];

const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx'));

console.log(`Analyzing ${files.length} components...\n`);

files.forEach(file => {
  const filePath = path.join(COMPONENTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`=========================================`);
  console.log(`Component: ${file}`);
  console.log(`=========================================`);

  // Check roles referenced in this component
  // We look for common occurrences of role names and any mismatch/extra roles.
  // Standard roles:
  const foundRoles = [];
  SRS_ROLES.forEach(role => {
    const regex = new RegExp(`\\b${role}\\b`, 'gi');
    if (regex.test(content)) {
      foundRoles.push(role);
    }
  });

  // Check for other potential role terms (like "Admin" in general, "System Admin", "Developer", "Candidate", etc.)
  const candidateRegex = /\b(Candidate|Developer|User|Admin|Employee|HR|Job Seeker|Applicant)\b/gi;
  const otherMatches = content.match(candidateRegex) || [];
  const uniqueOther = [...new Set(otherMatches.map(m => m.toLowerCase()))];

  console.log(`- Referenced SRS Roles: ${foundRoles.join(', ') || 'None'}`);
  if (uniqueOther.length > 0) {
    console.log(`- Other Role-like terms: ${uniqueOther.join(', ')}`);
  }

  // Check modules or dashboard names mentioned
  // E.g., does it use "Dashboard" instead of "Portal", or other variations?
  const foundModules = [];
  SRS_MODULES.forEach(mod => {
    const regex = new RegExp(mod, 'gi');
    if (regex.test(content)) {
      foundModules.push(mod);
    }
  });
  console.log(`- Referenced SRS Modules: ${foundModules.join(', ') || 'None'}`);

  // Let's print out the exact title/header text if found
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  const h2Matches = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  if (h1Matches) {
    console.log(`- H1 Headers: ${h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).join(' | ')}`);
  }
  if (h2Matches) {
    console.log(`- H2 Headers: ${h2Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).join(' | ')}`);
  }

  // If it's the AI Agents Dashboard, let's extract all AI Agents listed
  if (file.toLowerCase().includes('agent')) {
    console.log(`- Checking AI Agents:`);
    SRS_AGENTS.forEach(agent => {
      const regex = new RegExp(agent, 'gi');
      const matched = regex.test(content);
      console.log(`   * SRS '${agent}': ${matched ? 'FOUND' : 'MISSING'}`);
    });
    // Check for other agents in the file text
    const agentRegex = /\b([A-Za-z]+ Agent)\b/g;
    const allAgentsInFile = content.match(agentRegex) || [];
    const uniqueAgents = [...new Set(allAgentsInFile)];
    console.log(`   * Agents found in file text: ${uniqueAgents.join(', ')}`);
  }

  console.log();
});
