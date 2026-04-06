import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's check what happened to the render() function
print("render() changes:")
match = re.search(r'function render\(\) \{[\s\S]*?\} else if \(appState\.view === \'festivals\'\) \{[\s\S]*?\} else \{[\s\S]*?\}', content)
if match:
    print(match.group(0)[:1500]) # Print first part to see if it worked
else:
    print("Could not find render pattern")
