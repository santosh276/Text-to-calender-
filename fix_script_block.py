import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's see if our helper script from step 5 was properly appended
print("Does showDharmaView exist?", "showDharmaView" in content)
if "showDharmaView" in content:
    idx = content.find("showDharmaView")
    print(content[idx-100:idx+200])
