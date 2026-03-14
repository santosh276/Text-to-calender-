const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The user issue:
// 1. "Today" button text vertical centering:
// explicitly set line-height: normal; and use flex centering.
// 2. Close button in toast (reduce gaps and margin adjustments to ensure it doesn't get pushed out of container)

// The #btn-today button:
// <button onclick="jumpToToday()" id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center gap-2 border border-orange-100">
// Needs flex and justify-center (it already has items-center, but it's not a flex container!)
// Oh, wait, "items-center" doesn't do anything unless it's "flex" or "inline-flex".
// Adding "flex", "justify-center", "leading-normal" (or inline style line-height: normal;).

console.log("Looking for button #btn-today:");
const btnTodayMatch = html.match(/<button[^>]*id="btn-today"[^>]*>([\s\S]*?)<\/button>/);
console.log(btnTodayMatch ? btnTodayMatch[0] : "Not found");


// Location prompt toast:
console.log("\nLooking for location prompt toast:");
const toastMatch = html.match(/<div id="location-prompt-toast"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
console.log(toastMatch ? toastMatch[0] : "Not found");
