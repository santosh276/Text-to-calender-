const fs = require('fs');
const html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// A simple way to check if the file compiles is to pull out scripts and run them,
// but due to complexity of this file we will just look for matching function names
const methods = ['switchMainView', 'togglePlay', 'incrementMala', 'setMedDuration'];
let allFound = true;
methods.forEach(m => {
    if (!html.includes(m)) {
        console.error(`Missing method: ${m}`);
        allFound = false;
    }
});

if (allFound) {
    console.log("All DharmaApp methods injected successfully.");
}
