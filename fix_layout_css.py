
css_to_add = "@media (min-width:1280px){.xl\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}"

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Replace the closing style tag (including the one we added previously if needed, or just append)
# The previous injection was: ...new_css + "</style>"
# So we can just replace </style> again.
new_content = content.replace("</style>", css_to_add + "</style>", 1)

with open("ai tex to calnder.html", "w") as f:
    f.write(new_content)
