const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

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
        // Bring back original flex row layout, but fix spacing to allow text wrapping, give proper height
        const newToast = `<div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[450px]" style="display: none;">
        <div class="bg-white rounded-2xl border p-3 sm:p-4 flex flex-row items-center justify-between gap-3 w-full mx-auto box-border pointer-events-auto shadow-2xl relative" style="border-color: rgba(255, 237, 213, 0.8);">

            <button onclick="hideLocationPrompt()" class="absolute -top-2 -right-2 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 cursor-pointer transition-colors z-10" style="width: 28px; height: 28px;" aria-label="Close">
                <i class="fa-solid fa-xmark" style="font-size: 14px;"></i>
            </button>

            <div class="rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: #ffedd5; width: 44px; height: 44px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-xl"></i>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-center">
                <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>
            </div>

            <button onclick="openLocationModal(); hideLocationPrompt();" class="flex-shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center hover:shadow-lg" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 38px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3); white-space: nowrap;">
                Set Now
            </button>
        </div>
    </div>`;
        html = html.substring(0, startIdx) + newToast + html.substring(endIdx);
        fs.writeFileSync('ai tex to calnder.html', html);
        console.log("Updated toast successfully.");
    }
}
