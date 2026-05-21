const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

content = content.replace(
    /<button class="flex flex-col items-center gap-1 text-white\/80 hover:text-white transition-colors cursor-pointer">\s*<i class="fa-regular fa-comment-dots text-xl"><\/i>\s*<span class="text-\[10px\] font-bold" data-i18n="chat_nav">Chat<\/span>\s*<\/button>/,
    '<button class="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer" onclick="toggleView(\'timings\')">\n                <i class="fa-solid fa-clock text-xl"></i>\n                <span class="text-[10px] font-bold" data-i18n="timings_nav">Timings</span>\n            </button>'
);

content = content.replace(
    /<button class="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-orange-500 transition-colors flex-1">\s*<i class="fa-regular fa-comment-dots text-xl"><\/i>\s*<span class="text-\[10px\] font-bold leading-none" data-i18n="chat_nav">Chat<\/span>\s*<\/button>/,
    '<button id="nav-btn-timings" class="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-orange-500 transition-colors flex-1" onclick="toggleView(\'timings\')">\n            <i class="fa-solid fa-clock text-xl"></i>\n            <span class="text-[10px] font-bold leading-none" data-i18n="timings_nav">Timings</span>\n        </button>'
);

fs.writeFileSync('ai tex to calnder.html', content);
console.log('patched');
