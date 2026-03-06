const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');
console.log(html.includes('textureWrapper'));
