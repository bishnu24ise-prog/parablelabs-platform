const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components');
const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx'));

const SRS_ROLES = ['Student', 'Professional', 'Mentor', 'Recruiter', 'Company Admin', 'Platform Admin'];
const SRS_MODULES = [
  'Authentication', 'User Profiles', 'Hackathon Management', 'Daily Challenges',
  'Gamification', 'AI Evaluation', 'Internship Marketplace', 'Talent Marketplace',
  'Project Marketplace', 'Recruiter Portal', 'Company Portal', 'Analytics'
];
const SRS_AGENTS = ['Trend Agent', 'Internship Agent', 'Recruitment Agent', 'Marketing Agent', 'Community Agent'];

const report = {};

files.forEach(file => {
  const filePath = path.join(COMPONENTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract H1 and H2 headers
  const h1s = (content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  const h2s = (content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));

  // Extract navigation items / module titles
  // We can look for text inside <a> tags or <span> tags in sidebars
  const links = (content.match(/<a[^>]*>([\s\S]*?)<\/a>/gi) || [])
    .map(l => l.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '))
    .filter(l => l.length > 0 && l.length < 30);

  // Extract input field labels
  const labels = (content.match(/<label[^>]*>([\s\S]*?)<\/label>/gi) || [])
    .map(l => l.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '))
    .filter(l => l.length > 0);

  // Check specific terms
  const foundSrsRoles = SRS_ROLES.filter(r => new RegExp(`\\b${r}\\b`, 'i').test(content));
  const foundSrsModules = SRS_MODULES.filter(m => new RegExp(m, 'i').test(content));
  const foundSrsAgents = SRS_AGENTS.filter(a => new RegExp(a, 'i').test(content));

  // Check for non-SRS roles used
  const nonSrsRolesFound = [];
  const otherRoleTerms = ['Developer', 'Candidate', 'Applicant', 'User', 'Admin', 'Participant', 'Judge', 'Sponsor', 'System Admin'];
  otherRoleTerms.forEach(term => {
    if (new RegExp(`\\b${term}\\b`, 'i').test(content)) {
      nonSrsRolesFound.push(term);
    }
  });

  report[file] = {
    file,
    h1s,
    h2s,
    labels,
    foundSrsRoles,
    nonSrsRolesFound,
    foundSrsModules,
    foundSrsAgents,
    links: [...new Set(links)]
  };
});

fs.writeFileSync(
  path.join(__dirname, 'components_srs_scan.json'),
  JSON.stringify(report, null, 2)
);
console.log('Scan completed. Output saved to scratch/components_srs_scan.json');
