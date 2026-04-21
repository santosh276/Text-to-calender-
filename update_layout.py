import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# 1. Swap grid-cards-section and scroll-cards-section in HTML
# Currently bubble-section is followed by scroll-cards-section, then grid-cards-section.
# We will find their blocks and re-order them.

bubble_regex = r'(<!-- CIRCULAR BUBBLE CAROUSEL -->.*?</div>\s*</div>)'
scroll_regex = r'(<!-- THE SPIRITUAL TOOLS SWIPEABLE CAROUSEL -->.*?<div class="shrink-0 w-1 md:w-4"></div>\s*</div>\s*</div>)'
grid_regex = r'(<!-- BIG FEATURED CARDS GRID -->.*?<section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">\s*</section>\s*</div>)'

bubble_match = re.search(bubble_regex, content, re.DOTALL)
scroll_match = re.search(scroll_regex, content, re.DOTALL)
grid_match = re.search(grid_regex, content, re.DOTALL)

if scroll_match and grid_match:
    # Remove both from their current positions
    # (Since we are doing a replacement, let's just do a big replace of the whole More view portion)
    pass
