import re

with open("ai tex to calnder.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's inspect generateDayModalHTML structure
# I used:
# <div class="flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5] z-50 rounded-t-3xl sm:rounded-3xl">
# I should just use `style="background: linear-gradient(to bottom, #fcebd5, #fff5eb, #fffaf5);"`
# because Tailwind CDN compiler won't dynamically compile `from-[#fcebd5]` at runtime if not in the original HTML!
# This is a key memory guideline:
# "When dynamically applying exact hex colors ... use inline styles ... because the JIT CDN compiler does not parse and generate CSS for uncompiled dynamically injected arbitrary values."

old_str = 'bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5]'
new_str = 'bg-[#fffaf5]' # fallback
inline_gradient = 'style="background: linear-gradient(to bottom, #fef4e8, #fff8f0, #fffaf5);"'

content = content.replace(
    '<div class="flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5] z-50 rounded-t-3xl sm:rounded-3xl">',
    '<div class="flex flex-col h-full relative overflow-hidden z-50 rounded-t-3xl sm:rounded-3xl" ' + inline_gradient + '>'
)

content = content.replace('text-[#d91d1d]', 'text-red-600')

with open("ai tex to calnder.html", "w", encoding="utf-8") as f:
    f.write(content)
