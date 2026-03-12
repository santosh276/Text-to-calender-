import re

with open("ai tex to calnder.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's fix the header style in `generateDayModalHTML` so it is not transparent
# In the original structure I added, the header is not separated properly from the gradient because it's transparent,
# But wait, looking at the image: the header is full gradient, the body below isn't?
# Ah, the reference image has the entire background as the pastel gradient! The whole modal.

# Let's check my implemented HTML in `generateDayModalHTML`:
# I used `bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5]` for the outer container. That's fine.
# Let's verify why the header in the screenshot looks different. Wait, the screenshot looks totally messed up horizontally.
# The `max-w-[500px]` constraint from the previous modal design seems broken, or Playwright is capturing a very wide screen.
# In `new_modal_html`:
# `<div class="modal-content bg-[#fffaf5] sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto sm:max-w-[500px] relative z-10 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh]">`

# But wait, looking at the layout: The header text in my screenshot is somehow taking up the whole screen.
# Ah, Playwright didn't load Tailwind CSS properly, maybe because of JIT or it takes time to render.
# Wait, the `sm:max-w-[500px]` is standard Tailwind. Is `sm:max-w-[500px]` compiled in the precompiled CSS?
# The Vaidik Calendar uses a precompiled Tailwind CSS. `sm:max-w-[500px]` might NOT be in the precompiled CSS!
# Let's check the old one. The old one used `max-w-[500px]`. We should use `max-w-[500px] sm:max-w-[500px]` or just `max-w-[500px] mx-auto` instead of `sm:max-w-[500px]`.

old_container = 'class="modal-content bg-[#fffaf5] sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto sm:max-w-[500px] relative z-10 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh]"'
new_container = 'class="modal-content bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5] sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto max-w-[500px] mx-auto relative z-10 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh]"'

content = content.replace(old_container, new_container)

with open("ai tex to calnder.html", "w", encoding="utf-8") as f:
    f.write(content)
