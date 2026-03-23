const fs = require('fs');
const content = fs.readFileSync('ai tex to calnder.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 1;
let hasError = false;

while ((match = scriptRegex.exec(content)) !== null) {
  const scriptContent = match[1];
  if (scriptContent.trim() !== '') {
    try {
      new Function(scriptContent);
      console.log(`Script block ${scriptIndex} passed syntax check.`);
    } catch (e) {
      console.error(`Script block ${scriptIndex} failed syntax check:`);
      console.error(e);
      hasError = true;
    }
  } else {
    console.log(`Script block ${scriptIndex} is empty.`);
  }
  scriptIndex++;
}

if (hasError) {
  process.exit(1);
} else {
  console.log("All script blocks passed syntax check successfully.");
  process.exit(0);
}
