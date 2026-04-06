import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's check if my previous python script actually worked.
if 'id="settings-modal"' in content:
    print("Settings modal still exists.")
else:
    print("Settings modal gone.")

if 'id="app-menu-view"' in content:
    print("App menu view exists.")
else:
    print("App menu view not found.")
