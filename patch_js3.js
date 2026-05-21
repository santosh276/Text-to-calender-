const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

// I need to search for render() logic inside toggleView, but actually toggleView does not have the hide/show logic!
// Let me look at where `month-view-container` is shown/hidden.
