
const fs = require("fs");
const path = "ai tex to calnder.html";
const content = fs.readFileSync(path, "utf8");

// Check if the new logic is present
if (content.includes("Sync Check: Last=") &&
    content.includes("Cache Empty! Forcing Sync & Holding Loader...")) {
    console.log("SUCCESS: New robust sync logic found.");
} else {
    console.error("FAILURE: New robust sync logic not found.");
    process.exit(1);
}

// Check if the security block is back
if (content.includes("[SECURITY] BLOCK Google Docs")) {
    console.log("SUCCESS: Security block restored.");
} else {
    console.error("FAILURE: Security block missing.");
    process.exit(1);
}
