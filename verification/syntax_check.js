
const fs = require("fs");
const path = "ai tex to calnder.html";
const content = fs.readFileSync(path, "utf8");

// Simple regex check to ensure the new parsing logic exists
if (content.includes("IMPROVED CONFIG PARSING") &&
    content.includes("Smart Sync Status:")) {
    console.log("SUCCESS: New logic found in file.");
} else {
    console.error("FAILURE: New logic not found.");
    process.exit(1);
}

// Check for syntax errors by parsing as HTML? No, just JS check would be hard inside HTML.
// We can check if the file is still valid HTML structure?
// Just basic check is enough.
