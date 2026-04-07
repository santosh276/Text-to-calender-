import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Why did my previous fix fail?
# Maybe loadStateFromCache() does not overwrite the full `appState` properly, or maybe the view is hardcoded somewhere.
# Let's see what loadStateFromCache does.
match = re.search(r'function loadStateFromCache\(\) \{(.*?)\}', content, re.DOTALL)
if match:
    print(match.group(1))

print("--------------------------------")
# Where is startUp defined?
match = re.search(r'// Start Up\s*initApp\(\);\s*toggleView\(appState\.view\);\s*initCalendarSwipe\(\);', content, re.DOTALL)
if match:
    print("Found patch block")
