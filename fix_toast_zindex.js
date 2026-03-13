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
        // We'll keep it exactly the original script's logic and classes but fixed for the issues
        const newToast = `<div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[450px]" style="display: none;">
        <div class="bg-white rounded-2xl border p-4 sm:p-5 w-full mx-auto box-border relative flex flex-col gap-3 pointer-events-auto" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">

            <button onclick="hideLocationPrompt()" class="absolute top-2 right-2 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer border-0 transition-colors pointer-events-auto" style="width: 32px; height: 32px; background: transparent;" aria-label="Close">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>

            <div class="flex items-start gap-3 w-full pr-6">
                <div class="rounded-full flex-shrink-0 flex items-center justify-center mt-1" style="background-color: #ffedd5; width: 40px; height: 40px;">
                    <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-lg"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-relaxed break-words">Set your location to unlock your full experience.</p>
                </div>
            </div>

            <div class="flex justify-end w-full mt-1">
                <button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-6 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center pointer-events-auto hover:shadow-lg" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3);">
                    Set Now
                </button>
            </div>

        </div>
    </div>`;
        html = html.substring(0, startIdx) + newToast + html.substring(endIdx);
        fs.writeFileSync('ai tex to calnder.html', html);
        console.log("Updated toast successfully.");
    }
}
