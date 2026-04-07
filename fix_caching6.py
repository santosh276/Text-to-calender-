import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's see the two `toggleView('month')` calls in JS
lines = content.split('\n')
for i, line in enumerate(lines):
    if "toggleView('month');" in line:
        print(f"Line {i}: {line.strip()}")
        # print context
        for j in range(i-5, i+6):
            if j != i:
                print(f"   {j}: {lines[j].strip()}")
