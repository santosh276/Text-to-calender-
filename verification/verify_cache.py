from playwright.sync_api import sync_playwright

def verify_caching():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Serve the file directly using Python http server to avoid file:// issues if any
        # But we will use http://localhost:8000/ai%20tex%20to%20calnder.html

        # Open the page first time
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for render
        page.wait_for_selector("#calendar-grid")

        # Verify initial load state
        print("Initial load complete")

        # Check if cache is empty initially
        cache_state = page.evaluate("localStorage.getItem('panchang_cached_state')")
        if cache_state:
            print("Cache was already present (unexpected but okay if re-running):", len(cache_state))
        else:
            print("Cache is empty as expected")

        # Make a change in editor to trigger re-render and caching
        # We need to type into editor
        editor = page.locator("#editor")
        editor.fill("::: config\n@ Title : Cached Calendar\n:::\n\n::: calendar\n++ January 2025 ++\n:::")

        # Trigger input event just in case
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'))")

        # Wait for render to update title
        page.wait_for_selector("#app-title:has-text('Cached Calendar')")
        print("Title updated")

        # Now check if state is cached
        # The render() function calls saveStateToCache() at the end

        cache_state_after = page.evaluate("localStorage.getItem('panchang_cached_state')")
        if cache_state_after:
            print("Cache populated! Length:", len(cache_state_after))
            import json
            state = json.loads(cache_state_after)
            if state['config']['title'] == 'Cached Calendar':
                print("Cache content verification PASSED")
            else:
                print("Cache content verification FAILED: Title mismatch")
        else:
            print("Cache NOT populated after render")

        # RELOAD PAGE to test Instant Init
        print("Reloading page...")
        page.reload()

        # Immediately check title (should be instant)
        # We can't easily measure 0ms but we can check if title is there without waiting for expensive parse?
        # Actually parse is fast for small text.
        # But we can check console logs if we could.

        # We'll just verify the state is restored.
        page.wait_for_selector("#app-title:has-text('Cached Calendar')")
        print("State restored on reload")

        # Verify "Instant Initialization from Cache!" log if possible
        # Playwright can capture logs.

        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_caching()
