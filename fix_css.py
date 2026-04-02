import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Make the countdown responsive (larger on md/desktop, smaller on mobile like we did previously but correctly this time)
# Replace the inline sizing we just added with responsive ones.

# Currently we have:
# <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 hero-cd-badge" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
# <div id="hero-cd-days" class="text-xl font-bold text-white leading-none hero-cd-num" style="text-shadow: 0 2px 4px rgb(0 0 0 / 100%);">--</div>
# <div class="text-[9px] text-white font-semibold uppercase mt-1 hero-cd-label" style="text-shadow: 0 1px 2px rgb(0 0 0 / 100%);">Days</div>

# Let's add standard Tailwind classes to make it smaller ONLY on mobile
content = re.sub(
    r'<div class="flex gap-3 mt-1 hero-cd-container">',
    r'<div class="flex gap-2 md:gap-3 mt-1 hero-cd-container">',
    content
)

content = re.sub(
    r'p-2 min-w-\[60px\] text-center border border-white/30 hero-cd-badge',
    r'p-1.5 md:p-2 min-w-[50px] md:min-w-[60px] text-center border border-white/30 hero-cd-badge',
    content
)

content = re.sub(
    r'text-xl font-bold text-white leading-none hero-cd-num',
    r'text-lg md:text-xl font-bold text-white leading-none hero-cd-num',
    content
)

content = re.sub(
    r'text-\[9px\] text-white font-semibold uppercase mt-1 hero-cd-label',
    r'text-[8px] md:text-[9px] text-white font-semibold uppercase mt-0.5 md:mt-1 hero-cd-label',
    content
)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
