const fs = require('fs');

const html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The issue asks to:
// "Fixed the "Today" button text vertical centering by explicitly setting line-height: normal; and using flex centering."
// "Fixed the close button by reducing gaps and margin adjustments to ensure it doesn't get pushed out of the container boundaries."
// "Fix the "today" button text vertical centering (adjusting line-height or padding) This set now button text position change middle of button capsul"

console.log("Found #btn-today:");
console.log(html.match(/<button[^>]*id="btn-today"[^>]*>([\s\S]*?)<\/button>/)[0]);
