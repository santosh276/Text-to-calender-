import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's see the full toggleView function
match = re.search(r'function toggleView\(viewName\) \{(.*?)\n        \}', content, re.DOTALL)
if match:
    print(match.group(0))
