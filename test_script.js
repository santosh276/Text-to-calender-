const fs = require('fs');
const content = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Use a simple AST/Regex trick: grab JS code and check if there are parsing errors
// We can just try to execute the function definitions to catch syntax errors
const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const jsCode = scriptMatch[1];
    fs.writeFileSync('temp_script.js', jsCode);
} else {
    console.error("No script tag found");
}
