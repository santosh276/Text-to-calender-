const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The modifications we need to do according to the prompt:
// 1. "Today" button text vertical centering:
// explicitly set `line-height: normal;` and use flex centering.
html = html.replace(
    /id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center gap-2 border border-orange-100"/g,
    'id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition justify-center items-center gap-2 border border-orange-100" style="line-height: normal;"'
);

fs.writeFileSync('ai tex to calnder.html', html);
console.log("Done patching #btn-today");
