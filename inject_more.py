import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('more_container.html', 'r', encoding='utf-8') as f:
    more_content = f.read()

# We want to insert more_content just after <div id="app-festival-view" ...> ... </div>
# But it's easier to insert it right before <div id="month-view-container" ...>

insertion_point = '<div id="month-view-container"'

if insertion_point in html:
    new_html = html.replace(insertion_point, more_content + '\n\n            ' + insertion_point)
    with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Injection successful.")
else:
    print("Could not find insertion point.")
