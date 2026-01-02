from playwright.sync_api import sync_playwright

def verify_festivals_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Navigate to the served HTML file
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for app to load
        page.wait_for_selector(".app-container")

        # Inject data to ensure "Up Next" appears
        # Current date in env is Jan 2026.
        # Default app data is Jan 2025.
        # We need to update the editor content to 2026 or inject data.

        # Let's update the editor value with current date events
        new_content = """
::: config
@ Title : Verification Calendar
:::

::: calendar
++ January 2026 ++
02 ! New Year Afterparty
05 * Testing Holiday
15 ! Makar Sankranti 2026
:::
"""
        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{new_content}`;
            // Trigger input event to re-parse
            editor.dispatchEvent(new Event('input'));
        """)

        # Wait for render (debounced 500ms + render time)
        page.wait_for_timeout(1000)

        # Scroll to the Festivals section to ensure it is in view
        festivals_section = page.locator("#sec-festivals")
        festivals_section.scroll_into_view_if_needed()

        # Capture Screenshot of the Festivals Section
        festivals_section.screenshot(path="verification/festivals_ui.png")

        # Also capture the Search Bar specifically to verify padding
        page.locator("#festival-search").screenshot(path="verification/search_bar.png")

        browser.close()

if __name__ == "__main__":
    verify_festivals_ui()
