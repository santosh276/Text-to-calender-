
const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Check for the reduced space-y
if (!htmlContent.includes('space-y-3 w-full')) {
    console.error('Failure: Parent container space-y-3 not found.');
    process.exit(1);
}

// Check for the banner WITHOUT mb-6
// We search for the specific line.
// "bg-gray-100 border-4 border-white" (without mb-6)
if (htmlContent.includes('bg-gray-100 border-4 border-white') && !htmlContent.includes('bg-gray-100 mb-6 border-4 border-white')) {
    console.log('Success: Banner gaps adjusted correctly.');
} else {
    console.error('Failure: Banner margin class (mb-6) might still be present or regex failed.');
    // Let's print what we found to be sure
    const match = htmlContent.match(/id="month-banner-container".*?class="(.*?)"/);
    if(match) {
        console.error('Found class:', match[1]);
    }
    process.exit(1);
}
