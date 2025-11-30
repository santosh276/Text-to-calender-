from playwright.sync_api import sync_playwright

def verify_image_cache():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a persistent context to allow IndexedDB (though we check logic via console mainly)
        context = browser.new_context()
        page = context.new_page()

        # Open the page
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for page load
        page.wait_for_load_state("networkidle")

        # Inject test data that has images
        test_input = """
::: config
@ Title : Cache Test Calendar
@ Logo : ![Logo](https://via.placeholder.com/150)
:::

::: calendar
++ January 2025 ++
01 * Test Day
:::

::: details
>> 01-01-2025
![Banner](https://via.placeholder.com/600x200)
Test detail with image
:::
"""
        # Set editor value and trigger event
        page.evaluate(f"document.getElementById('editor').value = `{test_input}`;")
        page.evaluate("parseInput(document.getElementById('editor').value);")

        # Wait a bit for "background" fetching (simulated)
        page.wait_for_timeout(3000)

        # Check appState.cachedImages
        # We expect entries for the placeholders
        cached_images = page.evaluate("appState.cachedImages")
        print("Cached Images:", cached_images)

        # Verify ImageCacheDB exists
        db_exists = page.evaluate("typeof ImageCacheDB !== 'undefined'")
        print("ImageCacheDB exists:", db_exists)

        # Take screenshot of main view
        page.screenshot(path="verification/cache_test_main.png")

        browser.close()

if __name__ == "__main__":
    verify_image_cache()
