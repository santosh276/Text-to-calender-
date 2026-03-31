import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Mala CSS Alignment
content = content.replace(
    '<div class="absolute inset-0 m-auto z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-red-50 to-white shadow-inner border border-red-50/50 group-hover:shadow-md transition-shadow" style="width: 9rem; height: 9rem;">',
    '<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-red-50 to-white shadow-inner border border-red-50/50 group-hover:shadow-md transition-shadow" style="width: 9rem; height: 9rem;">'
)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
