
import os

html_file = 'ai tex to calnder.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Checks for Sidebar
checks_sidebar = [
    'grid.className = "grid grid-cols-2 gap-3";',
    'class="w-12 h-12 object-contain mb-2 rounded-full',
    'text-purple-600 text-3xl mb-2',
    'bg-gradient-to-br from-purple-50 to-white'
]

# Checks for Modal
checks_modal = [
    'headerIconHtml = `<img src="${iconUrl}" class="w-16 h-16 object-contain',
    'fa-solid fa-hashtag',
    'fa-solid fa-palette',
    'fa-regular fa-clock',
    'compat-pill'
]

print("--- SIDEBAR CHECKS ---")
for check in checks_sidebar:
    if check in content:
        print(f"PASS: Found '{check}'")
    else:
        print(f"FAIL: Missing '{check}'")

print("\n--- MODAL CHECKS ---")
for check in checks_modal:
    if check in content:
        print(f"PASS: Found '{check}'")
    else:
        print(f"FAIL: Missing '{check}'")

print("\nVerification complete.")
