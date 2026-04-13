with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's see what opacity we have for hover vs normal, and the z-index for the search bar background
# The user wants a very specific glowing halo shadow effect as seen in the image
# In the image, the shadow is an orange/red gradient that is blurred and semi-transparent.
# A shadow like that is usually achieved by setting the opacity to ~50-70% and maybe adjusting the inset.

content = content.replace(
    '<div class="absolute -inset-1 bg-gradient-to-r from-saffron to-deep-red rounded-full blur-2xl opacity-75 transition duration-1000 group-hover:opacity-100 z-0"></div>',
    '<div class="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-60 transition duration-500 group-hover:opacity-80"></div>'
)

# wait, we need blur-2xl for it to be large. Let's use it.
content = content.replace(
    '<div class="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-60 transition duration-500 group-hover:opacity-80"></div>',
    '<div class="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-2xl opacity-60 transition duration-500 group-hover:opacity-80"></div>'
)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
