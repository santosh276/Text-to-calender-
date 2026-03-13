const fs = require('fs');
const html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const startIdx = html.indexOf('id="location-prompt-toast"');
const endIdx = html.indexOf('</button>', html.indexOf('id="location-prompt-toast"')) + 50;
console.log(html.substring(startIdx - 50, endIdx + 200));
