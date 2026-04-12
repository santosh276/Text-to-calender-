import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

# Remove .bg-mesh definition properly
content = re.sub(
    r'\s*\.bg-mesh\s*\{\s*background:\s*radial-gradient[^}]+}\s*background-color:\s*transparent;\s*}',
    '',
    content,
    flags=re.DOTALL
)

# the previous regex might have missed it due to newlines and indentation. Let's try again with a simpler approach.
import sys

lines = content.split('\n')
new_lines = []
skip = False
for line in lines:
    if '.bg-mesh {' in line:
        skip = True
    elif skip and '}' in line:
        skip = False
        continue

    if not skip:
        new_lines.append(line)

with open('ai tex to calnder.html', 'w') as f:
    f.write('\n'.join(new_lines))
