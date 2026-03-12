import re

with open("ai tex to calnder.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's ensure there are no duplicated `const contentHtml = ` declarations left
occurrences = content.count("const contentHtml = `")
print(f"Number of contentHtml declarations: {occurrences}")

# Also let's ensure the `pakshaBadgeHtml` check isn't leaving stray artifacts since we replaced it inline in new design.
# In the original generateDayModalHTML, there was a block for `let pakshaBadgeHtml = ...`.
# We should probably remove it if we integrated it inline, or just leave it. Leaving it is harmless.
