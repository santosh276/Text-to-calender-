const fs = require('fs');

const content = fs.readFileSync('ai tex to calnder.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/;
const match = content.match(scriptRegex);
if (match) {
    fs.writeFileSync('temp_script.js', match[1]);
    console.log('Script extracted');
}
