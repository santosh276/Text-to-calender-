
import os
from playwright.sync_api import sync_playwright, expect

def verify_cache_logic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load
        page.wait_for_selector("#calendar-grid")

        # Check if cache keys are present in localStorage (simulated by checking console logs or executing script)
        # We can't easily check localStorage from python without evaluate, but we can check if the app loaded.

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
        page.wait_for_selector("#calendar-grid")

        # Check console logs for "JSON Cache hit" would be ideal, but harder to capture here.
        # Instead, verify the content we just added is present immediately

        # We need to wait a bit to ensure it rendered
        page.wait_for_timeout(1000)

        # Verify the text is present in the editor or the grid
        # The editor might be populated from text cache, but the appState should be from JSON cache if it works

        # Check if "Test Event" is visible in the grid
        # We need to navigate to January 2025 if not already there, but we set it in input.

        # Take a screenshot after reload
        page.screenshot(path="verification/step2_reload.png")

        print("Verification script finished.")
        browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_cache_logic()
