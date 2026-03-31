import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure Mala SVG has absolute center styling
content = content.replace(
    '<div class="z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-red-50 to-white shadow-inner border border-red-50/50 group-hover:shadow-md transition-shadow">',
    '<div class="absolute inset-0 m-auto z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-red-50 to-white shadow-inner border border-red-50/50 group-hover:shadow-md transition-shadow" style="width: 9rem; height: 9rem;">'
)

# And fix the SVG itself to render correctly inside relative w-48 h-48 container
mala_ring = """<svg class="absolute inset-0 w-full h-full transform -rotate-90" style="width: 100%; height: 100%;">
                            <circle class="text-gray-100" stroke-width="8" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
                            <circle class="text-red-500 transition-all duration-300 ease-out" stroke-width="8" stroke-dasharray="552" stroke-dashoffset="331" stroke-linecap="round" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
                        </svg>"""
mala_ring_new = """<svg class="absolute inset-0 w-full h-full transform -rotate-90" style="width: 100%; height: 100%;" viewBox="0 0 192 192">
                            <circle class="text-gray-100" stroke-width="8" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
                            <circle id="mala-progress-ring" class="text-red-500 transition-all duration-300 ease-out" stroke-width="8" stroke-dasharray="553" stroke-dashoffset="553" stroke-linecap="round" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" style="transition: stroke-dashoffset 0.35s;" />
                        </svg>"""

content = content.replace(mala_ring, mala_ring_new)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
