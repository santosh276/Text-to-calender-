const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Looking for "#btn-today" dynamic styling in script.
console.log("\nLooking for #btn-today in script:");
const scriptMatches = html.match(/btnToday\.classList/g);
if (scriptMatches) {
    console.log("Found btnToday.classList references");
}
