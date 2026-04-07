import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's check `test_nav_reload_fix.py` execution again
# There might be another call to `toggleView('month')` happening after my patch.
# Wait, look at `window.onload` or `document.addEventListener('DOMContentLoaded')` or something else?

# Wait! Let's search for "toggleView('month')" in the JS.
print("toggleView('month') calls:")
for line in content.split('\n'):
    if "toggleView('month')" in line:
        print(line.strip())
