import re

file_path = 'ai tex to calnder.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add saveConfigToStorage function
save_func_code = """
        function saveConfigToStorage() {
            try {
                localStorage.setItem('panchangConfig', JSON.stringify(appState.config));
            } catch (e) {
                console.error("Failed to save config to localStorage", e);
            }
        }
"""
# Insert before getUserLocation
if "function getUserLocation() {" in content:
    content = content.replace("function getUserLocation() {", save_func_code + "\n        function getUserLocation() {")

# 2. Update getUserLocation to save on success (both optimistic and final)
# Optimistic update
content = content.replace("appState.config.location = { lat: lat, lng: lng, name: locName };",
                          "appState.config.location = { lat: lat, lng: lng, name: locName };\n                saveConfigToStorage();")
# Final update (reverse geocoding)
content = content.replace("appState.config.location.name = locName;",
                          "appState.config.location.name = locName;\n                        saveConfigToStorage();")


# 3. Update changeLanguage to save
change_lang_orig = """        function changeLanguage(langCode) {
            appState.config.language = langCode;
            render();
        }"""
change_lang_new = """        function changeLanguage(langCode) {
            appState.config.language = langCode;
            saveConfigToStorage();
            render();
        }"""
content = content.replace(change_lang_orig, change_lang_new)

# 4. Insert load logic at initialization
# Find the initialization block
init_block_search = "if (window.exportedData) {"
init_block_code = """
        // Load config from localStorage if available
        try {
            const savedConfig = localStorage.getItem('panchangConfig');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                // Merge saved config into defaults
                if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null };
                appState.config = { ...appState.config, ...parsed };

                // If location exists, trigger a silent update to refresh it
                if (appState.config.location) {
                    // Slight delay to allow render to happen first
                    setTimeout(() => getUserLocation(), 2000);
                }
            }
        } catch (e) {
            console.error("Failed to load config from localStorage", e);
        }

        if (window.exportedData) {"""

content = content.replace(init_block_search, init_block_code)

# 5. Update openSettingsModal to ensure banner toggle state is saved/loaded correctly too?
# The toggleBannerVisibility function updates `isBannerDismissed`.
# The user asked for "location relevant data", but usually saving all config is better.
# `isBannerDismissed` is a separate variable, not in `appState.config`.
# Let's add it to `appState.config` to persist it properly if we want full persistence.
# But for now, sticking to the request "store location relevant data".
# The plan focused on appState.config.location and language.
# I'll stick to that.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
