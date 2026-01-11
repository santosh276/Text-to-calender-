
const fs = require('fs');
const html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// simplistic check for syntax errors in the JS part
// Extract the script content
const scriptContent = html.match(/<script>([\s\S]*?)<\/script>/)[1];

try {
    // Attempt to parse the script content
    // We wrap it in a function to avoid global scope issues during syntax check
    new Function(scriptContent);
    console.log("JavaScript syntax is valid.");
} catch (e) {
    console.error("JavaScript syntax error:", e);
    process.exit(1);
}

// Check if constants are defined
if (!scriptContent.includes('const WIFI_ICON_SVG =')) {
    console.error("WIFI_ICON_SVG not found");
    process.exit(1);
}
if (!scriptContent.includes('const RETRY_ICON_SVG =')) {
    console.error("RETRY_ICON_SVG not found");
    process.exit(1);
}
if (!scriptContent.includes('const TRASH_ICON_SVG =')) {
    console.error("TRASH_ICON_SVG not found");
    process.exit(1);
}

// Check if showRetryUI is using them
if (!scriptContent.includes('${WIFI_ICON_SVG}')) {
    console.error("WIFI_ICON_SVG usage not found in showRetryUI");
    process.exit(1);
}
if (!scriptContent.includes('${RETRY_ICON_SVG}')) {
    console.error("RETRY_ICON_SVG usage not found in showRetryUI");
    process.exit(1);
}
if (!scriptContent.includes('${TRASH_ICON_SVG}')) {
    console.error("TRASH_ICON_SVG usage not found in showRetryUI");
    process.exit(1);
}

console.log("Verification passed.");
