import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

# 1. "Upcoming Festivals" -> `upcoming_festivals`
content = content.replace(
    '<h2 class="text-xl font-extrabold text-gray-900">Upcoming Festivals</h2>',
    '<h2 class="text-xl font-extrabold text-gray-900"><span data-i18n="upcoming_festivals">Upcoming Festivals</span></h2>'
)

# 2. "View calendar" -> `view_calendar`
content = content.replace(
    '<i class="fa-regular fa-calendar"></i> View calendar',
    '<i class="fa-regular fa-calendar"></i> <span data-i18n="view_calendar">View calendar</span>'
)

# 3. "Next Upcoming Festival" -> `next_upcoming_festival`
content = content.replace(
    '<span id="hero-festival-text">Next Upcoming Festival</span>',
    '<span id="hero-festival-text" data-i18n="next_upcoming_festival">Next Upcoming Festival</span>'
)

# 4. "Today:" -> `today_festival`
content = content.replace(
    '<span class="text-orange-600 font-bold animate-pulse">Today:</span>',
    '<span class="text-orange-600 font-bold animate-pulse" data-i18n="today_festival">Today:</span>'
)

# 5. "Timings" -> `timings`
content = content.replace(
    '<span data-i18n="timings_main_header">Timings</span>',
    '<span data-i18n="timings">Timings</span>'
)

# 6. Update guide
content = content.replace('Timings Main Header : ଶୁଭ ସମୟ\n', 'Timings : ସମୟ\n')

labels_to_add = """Upcoming Festivals : ଆସୁଥିବା ପର୍ବ
View calendar : କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ
Next Upcoming Festival : ପରବର୍ତ୍ତୀ ପର୍ବ
Today Festival : ଆଜିର ପର୍ବ:"""

content = content.replace(
    'Upcoming Tithis : ଆସୁଥିବା ତିଥି',
    'Upcoming Tithis : ଆସୁଥିବା ତିଥି\n' + labels_to_add
)

with open('ai tex to calnder.html', 'w') as f:
    f.write(content)
