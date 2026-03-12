import re

with open("ai tex to calnder.html", "r", encoding="utf-8") as f:
    content = f.read()

# Make sure the container is centered. The Playwright screenshot was extremely wide.
# `sm:items-center sm:justify-center` might fail if `sm:` variants for flex alignment aren't compiled.
# In the original, it was `flex items-center justify-center p-4 modal-hidden`
# Let's revert the wrapper classes to exactly what the original was, just with our inside changes!
# Original: class="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-hidden"
# My new : class="fixed inset-0 z-[60] flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 modal-hidden"
# The CDN won't compile `justify-end` sm overrides properly.

old_wrapper = 'class="fixed inset-0 z-[60] flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 modal-hidden"'
new_wrapper = 'class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 modal-hidden"'
content = content.replace(old_wrapper, new_wrapper)

old_content = 'class="modal-content bg-gradient-to-b from-[#fcebd5] via-[#fff5eb] to-[#fffaf5] sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto max-w-[500px] mx-auto relative z-10 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh]"'
new_content = 'class="modal-content bg-[#fffaf5] rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-[500px] mx-auto relative z-10 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"'
content = content.replace(old_content, new_content)

# There's also `class="modal-content bg-[#fffaf5] sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto sm:max-w-[500px] relative z-10 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh]"` which might be there if earlier replace didn't hit.
content = re.sub(r'class="modal-content[^"]*"', new_content, content, count=1)

with open("ai tex to calnder.html", "w", encoding="utf-8") as f:
    f.write(content)
