const fs = require('fs');
const content = fs.readFileSync('ai tex to calnder.html', 'utf8');

if (content.includes('bg-gradient-to-b from-[#fcebd5]')) {
    console.log("Template replacement succeeded and is present.");
} else {
    console.log("Template replacement failed.");
}
