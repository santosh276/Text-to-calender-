with open("ai tex to calnder.html", "r") as f:
    content = f.read()

import re

# I see the More button is checked, but the view seems to show nothing. Wait, the old view is not hidden correctly or the new view is empty?
# Wait, look at the desktop screenshot. It says "Year View", which is the #year-view-container ! It means the app is in year view!
# Let's check why clicking More didn't switch to menu view, or maybe it switched back?

print(content.count("if (appState.view === 'menu')"))
