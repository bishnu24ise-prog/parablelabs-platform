const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components');
const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx'));

console.log(`Scanning ${files.length} components for escaped HTML comments...\n`);

const modifiedFiles = [];

files.forEach(file => {
  const filePath = path.join(COMPONENTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to match &lt;!-- ... --&gt;
  // This matches the escaped comment start and end, and anything in between
  const escapedCommentRegex = /&lt;!--[\s\S]*?--&gt;/g;
  content = content.replace(escapedCommentRegex, '');

  // Also clean up any standard HTML comments <!-- ... --> just in case
  const htmlCommentRegex = /<!--[\s\S]*?-->/g;
  content = content.replace(htmlCommentRegex, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push(file);
  }
});

console.log(`Stripped comments from ${modifiedFiles.length} files:`);
console.log(modifiedFiles.join('\n'));
