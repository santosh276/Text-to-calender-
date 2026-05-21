const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

const timingsRegex = /<div id="sec-timings" class="glass rounded-xl shadow-md border-l-4 border-green-500 p-4 transition-all duration-300 order-4 hidden">\s*<!-- Auspicious Timings Content -->\s*<\/div>/;

const match = content.match(timingsRegex);

if (match) {
    let secTimingsHtml = match[0].replace(' order-4', '');

    // Remove from original
    content = content.replace(match[0], '');

    // Insert after #more-view-container ends.
    // We can insert it before <!-- CLEAR CONFIRMATION MODAL --> which is right after the views.

    const insertPoint = '<!-- CLEAR CONFIRMATION MODAL -->';
    const newHtml = `
            <div id="timings-view-container" class="hidden w-full max-w-2xl mx-auto h-full overflow-y-auto px-2 md:px-4 pt-4 pb-24">
                ${secTimingsHtml}
            </div>

    <!-- CLEAR CONFIRMATION MODAL -->`;

    content = content.replace(insertPoint, newHtml);
    fs.writeFileSync('ai tex to calnder.html', content);
    console.log('Container moved');
} else {
    console.log('sec-timings not found');
}
