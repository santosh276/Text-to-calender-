const fs = require('fs');
const filename = 'ai tex to calnder.html';
let content = fs.readFileSync(filename, 'utf-8');
content = content.replace(
    /<h3 class="font-bold text-gray-700 mb-3 md:mb-4 text-sm md:text-base">&bull; Select Manually<\/h3>/,
    ''
);
fs.writeFileSync(filename, content);
