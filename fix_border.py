import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove overflow-hidden from sec-festivals
new_content = content.replace(
    '<div id="sec-festivals" class="glass rounded-xl shadow-md border-l-4 border-saffron p-4 transition-all duration-300 relative overflow-hidden order-2">',
    '<div id="sec-festivals" class="glass rounded-xl shadow-md border-l-4 border-saffron p-4 transition-all duration-300 relative order-2">'
)

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated sec-festivals class.")
