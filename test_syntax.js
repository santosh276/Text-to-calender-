const fs = require('fs');
const html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const scriptRegex = /<script.*?>([\s\S]*?)<\/script>/gi;
let match;
let allScriptContent = '';

while ((match = scriptRegex.exec(html)) !== null) {
  allScriptContent += match[1] + '\n';
}

fs.writeFileSync('temp_script.js', allScriptContent);
