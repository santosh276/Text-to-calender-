import json

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# find where appState is cached/loaded
import re
load_match = re.search(r'function loadStateFromCache\(\)(.*?)}', content, re.DOTALL)
print("Load state logic:", load_match.group(0)[:200] if load_match else "Not found")

init_match = re.search(r'function initApp\(\)(.*?)}', content, re.DOTALL)
print("\nInit logic (start):", init_match.group(0)[:500] if init_match else "Not found")

# find toggleView logic usage during init
toggle_view_calls = re.findall(r'toggleView\([^\)]+\)', content)
print("\nAll toggleView calls:")
for call in toggle_view_calls:
    print(call)
