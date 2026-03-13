const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const targetFunctionStart = html.indexOf('function handleLocationSearch(event)');
const targetFunctionEnd = html.indexOf('function openLocationModal()', targetFunctionStart);

console.log(html.substring(targetFunctionStart, targetFunctionEnd));
