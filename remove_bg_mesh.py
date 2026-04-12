import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

# Remove .bg-mesh definition
content = re.sub(
    r'\s*\.bg-mesh\s*\{\s*background:\s*radial-gradient[^}]+\}\s*background-color:\s*transparent;\s*\}',
    '',
    content,
    flags=re.DOTALL
)

# Also remove 'bg-mesh' class from #more-view-container
content = re.sub(
    r'(<div id="more-view-container"[^>]*class="[^"]*)\s*bg-mesh\s*([^"]*">)',
    r'\1\2',
    content
)

with open('ai tex to calnder.html', 'w') as f:
    f.write(content)
