const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The original more tab.html used:
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
// Let's add that to the head of ai tex to calnder.html if it's missing.

if (!html.includes('Material+Symbols+Outlined')) {
    html = html.replace('</head>', `    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>\n</head>`);
}

// Also add the style for the icons that was in more tab.html
const iconStyle = `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
`;

if (!html.includes(".material-symbols-outlined {")) {
    html = html.replace('</style>\n<style>', '</style>\n<style>\n' + iconStyle);
}

fs.writeFileSync('ai tex to calnder.html', html);
