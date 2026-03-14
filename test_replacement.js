const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The modifications we need to do according to the prompt:
// 1. "Today" button text vertical centering:
// explicitly set `line-height: normal;` and use flex centering.
html = html.replace(
    /id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center gap-2 border border-orange-100"/g,
    'id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center justify-center gap-2 border border-orange-100" style="line-height: normal;"'
);

// 2. Close button by reducing gaps and margin adjustments
// This is in the location prompt toast. We can reduce gaps in the toast container
// and add a slight negative margin to the close button so it fits.
html = html.replace(
    /class="relative bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border"/g,
    'class="relative bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-1.5 sm:gap-2 w-full mx-auto box-border"'
);

html = html.replace(
    /<button onclick="hideLocationPrompt\(\)" class="shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">/g,
    '<button onclick="hideLocationPrompt()" class="shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors -mr-1 sm:-mr-2" style="width: 32px; height: 32px; background: transparent;">'
);


// 3. Set Now button text position change middle of button capsul
// "Fix the "today" button text vertical centering (adjusting line-height or padding) This set now button text position change middle of button capsul"
// Set Now button HTML:
html = html.replace(
    /<button onclick="openLocationModal\(\); hideLocationPrompt\(\);" class="shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient\(to right, #f97316, #ea580c\); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba\(249,115,22,0\.3\);">\s*Set Now\s*<\/button>/g,
    '<button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-3 sm:px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3); padding-top: 0; padding-bottom: 0;">Set Now</button>'
);

fs.writeFileSync('ai tex to calnder_patched.html', html);
console.log("Done");
