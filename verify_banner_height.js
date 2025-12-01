
const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Check for the updated aspect ratio classes
if (htmlContent.includes('aspect-[2/1]') && htmlContent.includes('md:aspect-[4/1]')) {
    console.log('Success: Banner carousel height classes updated correctly.');
} else {
    console.error('Failure: Banner carousel height classes not found or incorrect.');
    process.exit(1);
}
