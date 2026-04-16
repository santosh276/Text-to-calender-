with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

search = """        document.addEventListener('DOMContentLoaded', () => {
            // Sync the navigation UI with the loaded state (fixes caching issue)
            toggleView(appState.view || 'month');
        });"""

replace = """        document.addEventListener('DOMContentLoaded', () => {
            // Sync the navigation UI with the loaded state (fixes caching issue)
            toggleView(appState.view || 'month');

            // Render any saved custom cards
            if (typeof renderCustomCards === 'function') {
                renderCustomCards();
            }
        });"""

if search in content:
    content = content.replace(search, replace)
    with open('ai tex to calnder.html', 'w') as f:
        f.write(content)
    print("Init patch successful!")
else:
    print("Search string for Init not found!")
