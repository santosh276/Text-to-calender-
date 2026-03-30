import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Why is showDharmaView not defined?
# Maybe there is a syntax error earlier in the HTML that breaks the script tag?
# Let's find exactly where showDharmaView is defined.
print(content[content.find('showDharmaView')-50:content.find('showDharmaView')+200])
