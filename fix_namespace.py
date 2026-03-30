import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# First, find the script block for Dharma Player
script_start = content.find('const PRESETS = {')
script_end = content.find('let isDharmaInitialized = false;')

if script_start != -1 and script_end != -1:
    script_content = content[script_start:script_end]

    # 1. Wrap in IIFE
    # Wait, if we wrap in IIFE, all onclicks break unless we expose them to window.
    # What functions are called from HTML?

    # Let's find all onclick="functionName(...)" in the HTML
    html_content = content[:script_start]
    onclicks = re.findall(r'onclick="([a-zA-Z0-9_]+)\(', html_content)
    onchanges = re.findall(r'onchange="([a-zA-Z0-9_]+)\(', html_content)
    oninputs = re.findall(r'oninput="([a-zA-Z0-9_]+)\(', html_content)

    # Get unique functions
    exposed_funcs = set(onclicks + onchanges + oninputs)

    # Also need to expose functions called by other scripts if any (e.g., initDharmaPlayer)
    exposed_funcs.add('initDharmaPlayer')

    # Calendar app functions are mixed in the HTML, we need to filter only the ones defined in Dharma Player script
    # Let's extract all function definitions from Dharma Player script
    defined_funcs = set(re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', script_content))

    # Intersect
    funcs_to_expose = exposed_funcs.intersection(defined_funcs)

    print(f"Functions to expose: {funcs_to_expose}")

    # Add window bindings at the end of the script block
    window_bindings = "\n// Expose Dharma functions to window to avoid inline handler breakage\n"
    for func in funcs_to_expose:
        window_bindings += f"window.{func} = {func};\n"

    # Fix persist to dharmaPersist entirely
    # The previous replace replaced "persist." with "dharmaPersist." and "let persist =" to "let dharmaPersist ="
    # Let's make sure savePersist has the right variable: localStorage.setItem('dharmaPlayerApp',JSON.stringify(dharmaPersist))
    script_content = re.sub(r"localStorage\.setItem\('dharmaPlayerApp',JSON\.stringify\([a-zA-Z]+\)\)", "localStorage.setItem('dharmaPlayerApp',JSON.stringify(dharmaPersist))", script_content)
    script_content = script_content.replace('persist', 'dharmaPersist') # Fix any remaining "persist" references (e.g. JSON.stringify(persist))
    # Note: savePersist function name becomes savedharmaPersist if we blind replace.
    # Let's be careful. Let's just fix the exact JSON.stringify call.

    # Actually, the variable name is `dharmaPersist` already because of Step 4. Let's check:
    # "dharmaPersist,d}"
    # "JSON.stringify(persist)" might still be there if we only replaced "persist."
    script_content = script_content.replace('JSON.stringify(persist)', 'JSON.stringify(dharmaPersist)')

    # Also replace Object.assign(persist,d) with Object.assign(dharmaPersist,d)
    script_content = script_content.replace('Object.assign(persist,d)', 'Object.assign(dharmaPersist,d)')

    # Wrap in IIFE
    iife_start = "(function() {\n"
    iife_end = window_bindings + "\n})();\n"

    new_script_content = iife_start + script_content + iife_end

    new_content = content[:script_start] + new_script_content + content[script_end:]

    with open("ai tex to calnder.html", "w") as f:
        f.write(new_content)
    print("Success wrapping in IIFE.")
else:
    print("Failed to find script boundaries.")
