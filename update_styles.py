import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('more_styles.html', 'r', encoding='utf-8') as f:
    more_styles = f.read()

# We can just insert these styles right before </head>
insertion_point = '</head>'

# Let's remove the <style> tags from more_styles so we can inject them into the last <style> block, or just keep them as a new <style> block.
# Keeping them as a new <style> block right before </head> is safest and easiest.
if insertion_point in html:
    new_html = html.replace(insertion_point, more_styles + '\n' + insertion_point)
    with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Styles injection successful.")
else:
    print("Could not find insertion point.")
