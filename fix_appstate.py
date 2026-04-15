with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Replace dangerous access
content = content.replace("appState.config.language", "(appState.config && appState.config.language)")
# Note: we need to handle assignment as well like: appState.config.language = 'en';
# Actually, the review said "The patch introduces a minor risk where it accesses `appState.config.language` without ensuring `appState.config` exists first (unlike the safe check it correctly used for `appState.config.location` just above it)."
# Let's find exactly the patch I made where I checked config.location.
