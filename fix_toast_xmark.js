const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const oldToastRegex = /<div id="location-prompt-toast"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/; // Wait, it doesn't have 4 closing divs.

// Better to find by id and extract exactly
const startIdx = html.indexOf('<div id="location-prompt-toast"');
if (startIdx !== -1) {
    let openDivs = 0;
    let endIdx = -1;
    for (let i = startIdx; i < html.length; i++) {
        if (html.startsWith('<div', i)) openDivs++;
        if (html.startsWith('</div', i)) openDivs--;
        if (openDivs === 0) {
            endIdx = i + 6;
            break;
        }
    }

    if (endIdx !== -1) {
        const newToast = `<div id="location-prompt-toast" class="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl border border-orange-100 p-4 transform translate-y-full opacity-0 transition-all duration-500 z-50 flex items-start gap-3">
    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fa-solid fa-location-dot text-orange-500 text-lg"></i>
    </div>
    <div class="flex-1 pt-0.5">
        <p class="text-gray-800 text-sm font-medium leading-snug mb-3 pr-2">Set your location to unlock your full experience.</p>
        <button onclick="openLocationModal(); document.getElementById('location-prompt-toast').classList.add('translate-y-full', 'opacity-0');" class="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all">Set Now</button>
    </div>
    <button onclick="document.getElementById('location-prompt-toast').classList.add('translate-y-full', 'opacity-0');" class="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center flex-shrink-0 -mr-1 -mt-1 rounded-full hover:bg-gray-100" aria-label="Dismiss">
        <i class="fa-solid fa-xmark text-lg" style="line-height: normal;"></i>
    </button>
</div>`;
        html = html.substring(0, startIdx) + newToast + html.substring(endIdx);
        fs.writeFileSync('ai tex to calnder.html', html);
        console.log("Updated toast successfully.");
    }
}
