import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# We need to make sure toggleView is called on load with the CURRENT appState.view,
# or that we sync the navbar states when loading from cache.
# Currently, appState is loaded from cache (which might contain view: 'festivals')
# and then toggleView is not automatically called. Wait, is it?
# In DOMContentLoaded:
# setTimeout(() => {
#     applyUnifiedLanguage();
#     ...
#     buildLanguageMenu();
# }, 50);

# If appState is loaded from cache, we must make sure the UI reflects `appState.view`.
# Let's find where initApp() is called.
match = re.search(r'initApp\(\);\s*initCalendarSwipe\(\);', content, re.DOTALL)
if match:
    print("Found initApp call")

# We should probably just call toggleView(appState.view) after loadStateFromCache or at the end of initApp.

replacement = """        // Start Up
        initApp();

        // Sync the navigation UI with the loaded state (fixes caching issue)
        toggleView(appState.view);

        initCalendarSwipe();"""

new_content = content.replace("        // Start Up\n        initApp();\n        initCalendarSwipe();", replacement)

with open("ai tex to calnder.html", "w") as f:
    f.write(new_content)

print("Patch applied.")
