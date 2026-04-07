import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Ah! In the console output:
# Browser console: Loaded valid data from JSON Cache
# Browser console: toggleView called with: festivals
# Browser console: console.trace
# After reload:
# Calendar btn class: ... text-orange-600 ...

# So toggleView('festivals') WAS CALLED!
# Why did it not change the classes?
# Because btn.classList.remove('text-orange-600', 'text-gray-400') removed 'text-gray-400' maybe?
# But wait, Calendar has `text-orange-600` IN THE HTML!
# `<button class="flex flex-col items-center justify-center gap-1 text-orange-600 hover:text-orange-500 transition-colors flex-1" onclick="toggleView('month')">`
# Oh wait, `btn.classList.remove` DOES remove it! But it's there after reload.
# Let's see what happens if I run `document.querySelectorAll('#mobile-bottom-nav button')[0].className`

# Wait! Is it possible that toggleView('festivals') runs BEFORE the DOM is parsed, so `#mobile-bottom-nav` elements don't exist yet,
# and THEN the browser parses the HTML and adds them with their hardcoded classes?

# YES! `toggleView(appState.view)` is running synchronously in the `<script>` tag.
# But wait, the `<script>` tag is BEFORE the `</body>` tag?
# Let's check where the `<script>` tag is.
match = re.search(r'(<script[^>]*>[\s\S]*</script>)\s*</body>', content)
if match:
    print("Script is just before body end.")
else:
    print("Script is NOT before body end!")
