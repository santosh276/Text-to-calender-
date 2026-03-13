const fs = require('fs');
const filename = 'ai tex to calnder.html';
let content = fs.readFileSync(filename, 'utf-8');

const newToastHtml = `    <div id="location-prompt-toast" class="fixed bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[450px]" style="display: none; width: calc(100% - 1rem); max-width: 480px;">
        <div class="relative bg-white rounded-2xl border p-3 sm:p-4 flex items-start gap-2 sm:gap-3 w-full mx-auto box-border" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">
            <div class="rounded-full flex-shrink-0 flex items-center justify-center mt-1" style="background-color: #ffedd5; width: 40px; height: 40px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0 pr-6">
                <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>
                <div class="mt-3">
                    <button onclick="openLocationModal(); hideLocationPrompt();" class="text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center inline-flex" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3);">
                        Set Now
                    </button>
                </div>
            </div>
            <button onclick="hideLocationPrompt()" class="absolute top-2 right-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
    </div>`;

content = content.replace(/<div id="location-prompt-toast"[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/, newToastHtml);
fs.writeFileSync(filename, content);
