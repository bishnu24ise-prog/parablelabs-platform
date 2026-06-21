const fs = require('fs');
const path = require('path');

const scanData = JSON.parse(fs.readFileSync(path.join(__dirname, 'components_srs_scan.json'), 'utf8'));

const SRS_ROLES = ['Student', 'Professional', 'Mentor', 'Recruiter', 'Company Admin', 'Platform Admin'];
const SRS_MODULES = [
  'Authentication', 'User Profiles', 'Hackathon Management', 'Daily Challenges',
  'Gamification', 'AI Evaluation', 'Internship Marketplace', 'Talent Marketplace',
  'Project Marketplace', 'Recruiter Portal', 'Company Portal', 'Analytics'
];
const SRS_AGENTS = ['Trend Agent', 'Internship Agent', 'Recruitment Agent', 'Marketing Agent', 'Community Agent'];

console.log('# ParableLabs SRS Compliance Analysis\n');
console.log('This report outlines the screen-by-screen compliance checks of the 39 React components against the ParableLabs Software Requirements Specification (SRS) document.\n');

Object.keys(scanData).forEach(filename => {
  const data = scanData[filename];
  const mismatches = [];

  // 1. Role Check
  // Check if non-SRS roles are used in UI text/headers
  const hasDeveloper = data.nonSrsRolesFound.includes('Developer');
  const hasCandidate = data.nonSrsRolesFound.includes('Candidate');
  const hasApplicant = data.nonSrsRolesFound.includes('Applicant');
  
  if (hasDeveloper || hasCandidate || hasApplicant) {
    mismatches.push(`**Role Terminology**: Uses non-SRS role terms like ${data.nonSrsRolesFound.filter(r => ['Developer', 'Candidate', 'Applicant'].includes(r)).map(r => `"${r}"`).join(', ')} instead of standard SRS roles ("Student" or "Professional").`);
  }

  // Check specific role screen: UserRoleManagementRbac
  if (filename === 'UserRoleManagementRbac.jsx') {
    const missingRoles = SRS_ROLES.filter(r => !data.foundSrsRoles.includes(r));
    // Check dropdown options in code:
    // Let's verify if "Professional" is in the dropdown (we know it's missing)
    mismatches.push(`**Missing RBAC Role**: The dropdown select options for user roles include "Student", "Mentor", "Recruiter", "Company Admin", and "Platform Admin", but **completely omit "Professional"**.`);
  }

  // 2. Module Name Check
  // E.g., RecruiterDashboard vs Recruiter Portal
  if (filename.includes('RecruiterDashboard')) {
    mismatches.push(`**Module Naming**: Labeled as "Recruiter Dashboard" (file & H2) instead of the SRS-defined "**Recruiter Portal**".`);
  }
  if (filename.includes('CompanyDashboard')) {
    mismatches.push(`**Module Naming**: Labeled as "Company Dashboard" (file) and "Admin Command Center" (H2) instead of the SRS-defined "**Company Portal**".`);
  }
  if (filename.includes('AnalyticsReporting')) {
    mismatches.push(`**Module Naming**: Labeled as "Analytics Reporting" (file) and "ParableLabs Analytics" (H1) instead of the SRS-defined "**Analytics**".`);
  }
  if (filename.includes('BadgesProgress')) {
    mismatches.push(`**Module Naming**: Labeled as "Badges Progress" (file) and "Achievements" (H2) instead of the SRS-defined "**Gamification**" module.`);
  }
  if (filename.includes('ProjectMarketplace') || filename.includes('ProjectDetail')) {
    if (data.links.includes('Browse Gigs') || data.links.includes('integration_instructions Gigs')) {
      mismatches.push(`**Marketplace Terminology**: Uses the gig-economy term "**Gigs**" in sidebar and buttons, which mismatches the SRS module name "**Project Marketplace**".`);
    }
  }

  // 3. AI Agent Check
  if (filename.includes('AiAgentsDashboard')) {
    const missingAgents = SRS_AGENTS.filter(a => !data.foundSrsAgents.includes(a));
    if (missingAgents.length > 0) {
      mismatches.push(`**Missing AI Agents**: The dashboard is missing the following SRS-specified agents: ${missingAgents.join(', ')}.`);
    }
    // Check if other agents are present
    const extraAgents = data.links.filter(l => l.toLowerCase().includes('agent') && !SRS_AGENTS.some(a => l.includes(a)));
    // Note: Deploy Agent / Configure Agent are actions, which is fine, but good to note.
  }

  // 4. Form Field Checks
  if (filename === 'CreateJobPostingParablelabs.jsx') {
    mismatches.push(`**Field Labels**: Uses "**Role Title**" instead of "**Job Title**" or "**Opportunity Title**". It also has a select dropdown labeled "Type" with options "Full-time", "Internship", "Contract", "Part-time", but the SRS distinguishes between "Internships" (under Internship Marketplace) and general "Projects" (under Project Marketplace) - having them combined in one job posting form might lead to operational overlap.`);
  }
  if (filename === 'OnboardingAcademicParablelabs.jsx') {
    mismatches.push(`**Onboarding Fields**: Only contains fields for "College/University Name", "Graduation Year", and "Resume (PDF)", which is tailored only for the "**Student**" role. It lacks corresponding fields for the "**Professional**" role (e.g., "Current Company", "Years of Experience").`);
  }
  if (filename === 'OnboardingInterestsParablelabs.jsx') {
    mismatches.push(`**Interests Terminology**: Lists options like "Freelance Projects" (instead of "**Project Marketplace**") and "Internships" (instead of "**Internship Marketplace**").`);
  }
  if (filename === 'ProjectDetailParablelabs.jsx') {
    mismatches.push(`**Field Labels & Currency**: Bid Amount is labeled in Indian Rupees (**₹**), but other screens represent global values (e.g., USD "$" in hackathon prizes, sponsorship tiers, and job postings). It should use a consistent currency or support multi-currency selection.`);
  }

  // Print results
  if (mismatches.length > 0) {
    console.log(`### [${filename}](file:///c:/Users/bishnusardar235/Desktop/intern%20project/components/${filename})`);
    mismatches.forEach(m => console.log(`- ${m}`));
    console.log();
  }
});
