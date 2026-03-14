const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const toastMatch = html.match(/<div id="location-prompt-toast"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
console.log(toastMatch ? toastMatch[0] : "Not found");
