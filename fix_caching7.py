import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Wait, if neither of these is calling `toggleView('month')` on load,
# why did my patch not work?
# Let's add a console.log to `toggleView` to see what is calling it and with what arguments.
patch = """
        function toggleView(viewName) {
            console.log("toggleView called with:", viewName);
            console.trace();
"""
new_content = content.replace("        function toggleView(viewName) {", patch)

with open("ai tex to calnder.html", "w") as f:
    f.write(new_content)
