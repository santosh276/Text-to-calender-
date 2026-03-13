const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Header update
html = html.replace(
  '<div class="bg-white border-b border-gray-100 px-6 sm:px-8 md:px-10 py-4 md:py-5 flex items-center justify-between shadow-md shrink-0 box-border">',
  '<div class="bg-gradient-to-r from-[#F97316] to-[#EF4444] rounded-t-[1.5rem] px-6 sm:px-8 md:px-10 py-5 flex items-center justify-between shrink-0 box-border" style="padding-top: 1.25rem; padding-bottom: 1.25rem;">'
);

html = html.replace(
  '<h2 class="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl flex items-center gap-2"><i class="fa-solid fa-location-dot"></i> Choose Location</h2>',
  '<h2 class="text-white font-bold text-xl md:text-2xl flex items-center gap-2"><i class="fa-solid fa-location-dot"></i> Choose Location</h2>'
);

html = html.replace(
  '<button onclick="closeLocationModal()" class="text-gray-500 hover:text-gray-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition active:scale-95"><i class="fa-solid fa-times md:text-lg"></i></button>',
  '<button onclick="closeLocationModal()" class="text-black hover:text-gray-800 w-8 h-8 flex items-center justify-center transition active:scale-95"><i class="fa-solid fa-times text-xl font-bold"></i></button>'
);

// Auto Detect GPS Update
html = html.replace(
  '<div class="bg-white rounded-xl p-4 md:p-5 border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-colors" onclick="handleAutoLocation()">',
  '<div class="bg-[#FFF8EF] rounded-xl p-5 border border-[#FDECD8] cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-colors" onclick="handleAutoLocation()">'
);

html = html.replace(
  '<div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-50 shadow-sm flex items-center justify-center text-orange-600 text-lg md:text-xl shrink-0">',
  '<div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#EA580C] text-xl shrink-0">'
);

html = html.replace(
  '<div class="font-bold text-gray-800">Auto Detect GPS</div>',
  '<div class="font-bold text-[#1F2937] text-lg">Auto Detect GPS</div>'
);

html = html.replace(
  '<div class="text-xs text-gray-500">Get location automatically</div>',
  '<div class="text-sm text-gray-500">Get location automatically</div>'
);

// OR separator update
html = html.replace(
  /<div class="flex items-center gap-3 opacity-50">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  '<div class="flex items-center justify-center opacity-70 mt-6 mb-2">\n                    <div class="text-sm font-bold text-gray-500 uppercase tracking-widest">OR</div>\n                </div>'
);

// We need to be careful with the OR replacement because the regex might match too much. Let's do a more precise replacement.
