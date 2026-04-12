import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

# Replace body background
new_body_css = """body {
            background-color: #fdfbf7;
            background-image:
              radial-gradient(at 0% 0%, rgba(255, 153, 51, 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(217, 45, 32, 0.1) 0px, transparent 50%);
        }"""

# The existing body definition is around line 391
content = re.sub(
    r'body\s*\{\s*background-color:\s*#fdfbf7;\s*background-image:\s*radial-gradient[^}]+}',
    new_body_css,
    content,
    flags=re.DOTALL
)

with open('ai tex to calnder.html', 'w') as f:
    f.write(content)
