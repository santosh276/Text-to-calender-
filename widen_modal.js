const fs = require('fs');
const filename = 'ai tex to calnder.html';
let content = fs.readFileSync(filename, 'utf-8');
content = content.replace(
    /md:max-w-\[700px\] lg:max-w-\[850px\]/,
    'md:max-w-[800px] lg:max-w-[950px]'
);
fs.writeFileSync(filename, content);
