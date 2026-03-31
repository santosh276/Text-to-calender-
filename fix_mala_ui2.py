import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure the mala SVG classes render correctly
content = content.replace(
    '<circle class="text-gray-100" stroke-width="8" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />',
    '<circle class="text-gray-100" stroke-width="8" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />'
)

# Fix Listen Mode Play button height/width specifically missing in tailwind
content = content.replace(
    '<div onclick="window.toggleAudioPlay()" class="audio-play-btn w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200 cursor-pointer hover:shadow-xl transition-all active:scale-95 text-white">',
    '<div onclick="window.toggleAudioPlay()" class="audio-play-btn w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200 cursor-pointer hover:shadow-xl transition-all active:scale-95 text-white" style="width: 6rem; height: 6rem;">'
)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
