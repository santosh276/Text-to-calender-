
css_to_add = "@media (min-width:1024px){.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}"

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Append to the end of the style block (replacing the closing tag)
new_content = content.replace("</style>", css_to_add + "</style>", 1)

with open("ai tex to calnder.html", "w") as f:
    f.write(new_content)
