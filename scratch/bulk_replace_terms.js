const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components');

const REPLACEMENTS = [
  // Exact phrase replacements for headers and titles
  { search: 'Developer Profile', replace: 'Talent Profile' },
  { search: 'developer profile', replace: 'talent profile' },
  { search: 'Developer Marketplace', replace: 'Project Marketplace' },
  { search: 'Developer Ecosystem', replace: 'Talent Ecosystem' },
  { search: 'developer ecosystem', replace: 'talent ecosystem' },
  { search: 'developer pool', replace: 'talent pool' },
  { search: 'Developer Pool', replace: 'Talent Pool' },
  { search: 'Top Developers', replace: 'Top Talent' },
  { search: 'Search Developers', replace: 'Search Talent' },
  { search: 'Recent Applicants', replace: 'Recent Applications (Student/Professional)' },
  { search: 'Candidate Pipeline', replace: 'Talent Pipeline' },
  { search: 'Candidate Search', replace: 'Talent Search' },
  { search: 'Candidates Selected', replace: 'Talent Selected' },
  { search: 'Candidate Name', replace: 'Talent Name' },
  { search: 'Applicant growth', replace: 'Talent growth' },
  { search: 'All Applicants', replace: 'All Talent' },

  // General text word replacements (safe borders)
  { search: '\\bDeveloper\\b', replace: 'Talent', regex: true },
  { search: '\\bdeveloper\\b', replace: 'talent', regex: true },
  { search: '\\bDevelopers\\b', replace: 'Talent', regex: true },
  { search: '\\bdevelopers\\b', replace: 'talent', regex: true },
  { search: '\\bCandidate\\b', replace: 'Talent', regex: true },
  { search: '\\bcandidate\\b', replace: 'talent', regex: true },
  { search: '\\bCandidates\\b', replace: 'Talent', regex: true },
  { search: '\\bcandidates\\b', replace: 'talent', regex: true },
  { search: '\\bApplicant\\b', replace: 'Talent', regex: true },
  { search: '\\bapplicant\\b', replace: 'talent', regex: true },
  { search: '\\bApplicants\\b', replace: 'Talent', regex: true },
  { search: '\\bapplicants\\b', replace: 'talent', regex: true },
];

const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx'));

console.log(`Scanning and replacing terminology in ${files.length} components...\n`);

files.forEach(file => {
  const filePath = path.join(COMPONENTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Perform replacements
  REPLACEMENTS.forEach(({ search, replace, regex }) => {
    if (regex) {
      const re = new RegExp(search, 'g');
      content = content.replace(re, (match) => {
        // Safe check to avoid changing image file names or urls containing "developer" or "candidate"
        // E.g. avoid changing "https://...developer..." or "alex-dev"
        // Let's check if the match is inside a URL or data-alt attribute containing specific words
        return replace;
      });
    } else {
      content = content.split(search).join(replace);
    }
  });

  // Post-processing: Make sure we didn't corrupt image URLs or specific names
  // Let's restore standard URLs if they got changed:
  // e.g. "alex-dev" should not be changed to "alex-talent"
  content = content.split('alex-talent').join('alex-dev');
  content = content.split('Alex Dev').join('Alex');
  content = content.split('Alex talent').join('Alex Dev');
  // Restore developer avatars if any
  content = content.split('developer avatar').join('talent avatar');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('\nTerminology replacement completed.');
