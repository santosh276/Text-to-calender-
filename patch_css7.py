import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Modify timing-now-indicator to stop earlier.
# Currently it uses `bottom: 0`. Since `.timing-track-container` is 60px high, and `top: 0` starts it at the top,
# `bottom: 0` makes it 60px long. The baseline is at `top: 50%` (30px).
# To make the NOW line end just below the baseline but before the text, we can change `bottom` to a higher value,
# or we can set a specific height instead of `bottom: 0`.
# If `top: 0` and `top: 50%` is baseline, let's say it drops 5px below baseline. That would be ~35px height.
# Let's change `bottom: 0;` to `height: 35px;` or `bottom: 25px;`.

content = re.sub(
    r'\.timing-now-indicator\s*\{\s*position:\s*absolute;\s*top:\s*0;\s*bottom:\s*0;\s*width:\s*2px;',
    r'.timing-now-indicator {\n            position: absolute;\n            top: 0;\n            bottom: 25px;\n            width: 2px;',
    content
)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
