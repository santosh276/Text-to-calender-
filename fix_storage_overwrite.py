import re

file_path = 'ai tex to calnder.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The issue is that parseInput() overwrites appState.config with tempConfig (which defaults to null location).
# parseInput is called initially: parseInput(editor.value).
# And my loadConfigFromStorage logic runs BEFORE parseInput (via init block), but parseInput overwrites it.
# OR if it runs after, parseInput runs `tempConfig = ...` and sets `appState.config = tempConfig`.
# We need to merge existing config location into tempConfig inside parseInput.

search_str = "let tempConfig = { title: 'Panchang App', logoUrl: null, language: 'en', location: null };"
replace_str = "let tempConfig = { title: 'Panchang App', logoUrl: null, language: 'en', location: appState.config ? appState.config.location : null };"

if search_str in content:
    content = content.replace(search_str, replace_str)
else:
    # Try finding it without exact spacing matches if needed, but it should match
    print("Could not find tempConfig definition line.")

# Also, when we run parseInput, we might overwrite language too if it's not in the text file config block.
# The `::: config` block in text only sets Title and Logo.
# So we should probably preserve `appState.config` values if they exist.

# Let's check `appState.config = tempConfig;` near end of parseInput
# We should merge: appState.config = { ...appState.config, ...tempConfig };
# But tempConfig has defaults. If we do that, defaults might overwrite.
# Better to initialize tempConfig with current config.

# Actually, language is also stored in appState.config.
# tempConfig defaults language to 'en'.
# If I change language to 'hi', save it. Reload.
# parseInput runs. tempConfig.language = 'en'. appState.config becomes 'en'. Language reset.

# Correct fix: Initialize tempConfig with existing `appState.config` values where appropriate.
# Or better: don't overwrite the whole object.

search_assign = "appState.config = tempConfig;"
replace_assign = """
            // Merge parsed config with existing persistent state (location, language)
            appState.config = {
                ...tempConfig,
                location: appState.config.location,
                language: appState.config.language || tempConfig.language
            };
            if(tempConfig.title) appState.config.title = tempConfig.title;
            if(tempConfig.logoUrl) appState.config.logoUrl = tempConfig.logoUrl;
"""
# The above replace_assign is risky because tempConfig structure.
# Let's just modify the `let tempConfig` line to inherit from appState.config
# But parseInput is supposed to parse the *text*. If text changes, config might change.
# But location/language are "Settings", not "Content" (mostly).
# The Config block in text file usually has Title/Logo.

# Let's go with the `replace_str` approach for `tempConfig` initialization.
# And ensure language is also preserved.
replace_str_2 = "let tempConfig = { title: 'Panchang App', logoUrl: null, language: (appState.config && appState.config.language) ? appState.config.language : 'en', location: (appState.config && appState.config.location) ? appState.config.location : null };"

content = content.replace(search_str, replace_str_2)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
