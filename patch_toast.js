const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

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

fs.writeFileSync('ai tex to calnder.html', html);
console.log("Done patching toast container");
