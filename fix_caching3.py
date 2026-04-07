import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's check loadStateFromCache again.
# The parsed object replaces appState entirely: appState = parsed;
# Does toggleView(appState.view) run before the initial render?
# Let's check the render() function or initApp() function to see when render() is called.
# Wait, in the playwright script, the "Calendar view visible: False", "Festivals view visible: True"
# So `appState.view` is indeed correctly applying to the DOM via the DOM elements...
# Wait! How is the view toggled initially?
# The toggleView function toggles classes, but it ALSO calls `render()`.
# Wait, if `toggleView` is called, it should highlight the button.
# BUT wait! My patch was:
#        // Start Up
#        initApp();
#        // Sync the navigation UI with the loaded state (fixes caching issue)
#        toggleView(appState.view);

# Look at test_nav_reload_fix.py:
# After reload:
#   Calendar btn class: text-orange-600
#   Festivals btn class: text-gray-400
#   Calendar view visible: False
#   Festivals view visible: True

# Why would the button state be text-orange-600 but the view be Festivals?
# Is something else overriding the navigation button state after `toggleView` is called?
# Let's search for any other place where 'text-orange-600' or 'fa-calendar' or '#mobile-bottom-nav' is referenced.

print("Occurrences of text-orange-600 with nav or buttons:")
for line in content.split('\n'):
    if 'text-orange-600' in line and 'nav' in line.lower():
        print(line.strip())
