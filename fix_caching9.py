import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Yes! The `<script>` tag closes before the `#mobile-bottom-nav` element!
# So `toggleView(appState.view)` is running BEFORE the mobile-bottom-nav is parsed.
# Let's verify where `#mobile-bottom-nav` is.
print("Mobile bottom nav position:")
for line in content.split('\n')[-30:]:
    if 'mobile-bottom-nav' in line:
        print(line.strip())

# The fix is to call `toggleView(appState.view)` after DOMContentLoaded,
# or move it into `DOMContentLoaded` listener.
replacement = """        // Start Up
        initApp();

        document.addEventListener('DOMContentLoaded', () => {
            // Sync the navigation UI with the loaded state (fixes caching issue)
            toggleView(appState.view);
        });

        initCalendarSwipe();"""

# First, let's remove my old console.log patch from toggleView
content = content.replace('            console.log("toggleView called with:", viewName);\n            console.trace();\n', '')

# Apply the new patch
content = content.replace("""        // Start Up
        initApp();

        // Sync the navigation UI with the loaded state (fixes caching issue)
        toggleView(appState.view);

        initCalendarSwipe();""", replacement)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)

print("Fixed!")
