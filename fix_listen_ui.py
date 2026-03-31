import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Listen Mode Audio gradients
content = content.replace(
    '<div class="h-full bg-orange-500 w-1/3"></div>',
    '<div class="h-full bg-orange-500 w-1/3 rounded-full"></div>'
)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
