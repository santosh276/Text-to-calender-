import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update toggleView function
# Find where it checks nav button highlighting

def repl(m):
    # This matches the button toggling logic
    body = m.group(0)

    # We need to add "more" button logic for both mobile and desktop

    # Replace in mobile bottom nav:
    if "else if (btn.querySelector('.festivals-icon')) {" in body:
        # Add a block for more icon
        # The more icon uses SVG directly without a specific class in mobile-bottom-nav, but it's `.menu-icon-btn svg` or similar. Wait, it has `class="menu-icon-btn ..."`
        pass

    return body

# Actually, it's easier to just do simple string replacements for the logic.
# Mobile:
mobile_logic_search = """                } else if (btn.querySelector('.festivals-icon')) {
                    if (safeView === 'festivals') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else {"""
mobile_logic_replace = """                } else if (btn.querySelector('.festivals-icon')) {
                    if (safeView === 'festivals') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (safeView === 'more') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else {"""

html = html.replace(mobile_logic_search, mobile_logic_replace)

# Desktop:
desktop_logic_search = """                } else if (btn.querySelector('.festivals-icon')) {
                    if (viewName === 'festivals') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else {"""
desktop_logic_replace = """                } else if (btn.querySelector('.festivals-icon')) {
                    if (viewName === 'festivals') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (viewName === 'more') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else {"""
html = html.replace(desktop_logic_search, desktop_logic_replace)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated toggleView highlighting logic.")
