const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// 3. Set Now button text position change middle of button capsul
// "Fix the "today" button text vertical centering (adjusting line-height or padding) This set now button text position change middle of button capsul"
// Set Now button HTML:
html = html.replace(
    /<button onclick="openLocationModal\(\); hideLocationPrompt\(\);" class="shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient\(to right, #f97316, #ea580c\); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba\(249,115,22,0\.3\);">\s*Set Now\s*<\/button>/g,
    '<button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-3 sm:px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3); padding-top: 0; padding-bottom: 0;">Set Now</button>'
);

fs.writeFileSync('ai tex to calnder.html', html);
console.log("Done patching Set Now button");
