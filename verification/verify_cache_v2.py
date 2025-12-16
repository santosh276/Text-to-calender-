
import os
from playwright.sync_api import sync_playwright

def verify_cache_logic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:8081/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load - check for visibility
        try:
            # We use state='visible' to wait for it to be visible.
            # However, if it's hidden by CSS initially and then shown, wait_for_selector(state='visible') is correct.
            page.wait_for_selector("#calendar-grid", state='visible', timeout=10000)
            print("Calendar grid is visible.")
        except Exception as e:
            print(f"Error waiting for calendar grid: {e}")
            # Take a screenshot to debug
            page.screenshot(path="verification/debug_initial.png")

            # Check if editor exists
            if page.locator("#editor").count() > 0:
                print("Editor found.")
                # Maybe render wasn't called?
                # Let's try to call render manually
                page.evaluate("render()")
                print("Called render() manually.")
                page.wait_for_timeout(1000)
                page.screenshot(path="verification/debug_after_manual_render.png")
            else:
                print("Editor not found.")

            browser.close()
            return

        # Let's type something into the editor to trigger a save to cache
        page.evaluate("document.getElementById('editor').value = '::: calendar\\n++ January 2025 ++\\n01 * Test Event\\n:::';")
        page.evaluate("parseInput(document.getElementById('editor').value);")
        page.evaluate("render();")

        # Verify that saveStateToCache was called (we can check if localStorage has the key)
        is_cached = page.evaluate("localStorage.getItem('panchang_cached_state') !== null")
        print(f"Cache present after render: {is_cached}")

        if not is_cached:
            print("Error: Cache not found after render.")
            browser.close()
            return

        # Take a screenshot of the initial state
        page.screenshot(path="verification/step1_initial.png")

        # Reload the page to test loading from cache
        page.reload()

        # Wait for calendar again
        try:
            page.wait_for_selector("#calendar-grid", state='visible', timeout=10000)
            print("Calendar grid visible after reload.")
        except Exception as e:
            print(f"Error waiting for calendar grid after reload: {e}")
            page.screenshot(path="verification/debug_reload.png")
            browser.close()
            return

        # Take a screenshot after reload
        page.screenshot(path="verification/step2_reload.png")

        print("Verification script finished.")
        browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_cache_logic()
