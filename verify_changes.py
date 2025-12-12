
import os

html_file = 'ai tex to calnder.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Checks
checks = [
    'onclick="updateLinkType(\'horoscope\')"',
    'id="link-horoscope-select"',
    'onclick="updateCropRatio(\'horoscope\')"',
    'id="crop-horoscope-select"',
    'if (iconMatch) parsedHoroDetails[currentHoroSign].icon = iconMatch[2];',
    'const details = appState.horoscopeDetails[signKey];',
    'if (type === \'horoscope\') {',
    'if(type === \'horoscope\') document.getElementById(\'crop-horoscope-select\').classList.remove(\'hidden\');'
]

for check in checks:
    if check in content:
        print(f"PASS: Found '{check}'")
    else:
        print(f"FAIL: Missing '{check}'")

print("Verification complete.")
