
import os
from playwright.sync_api import sync_playwright

def verify_cache_logic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Subscribe to console logs
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        # Navigate to the app
        page.goto("http://localhost:8081/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load
        try:
            page.wait_for_selector("#calendar-grid", state='visible', timeout=5000)
            print("Calendar grid is visible.")
        except Exception as e:
            print(f"Error waiting for calendar grid: {e}")
            page.screenshot(path="verification/debug_console.png")
            browser.close()
            return

        # Trigger cache save
        page.evaluate("document.getElementById('editor').value = '::: calendar\\n++ January 2025 ++\\n01 * Test Event\\n:::';")
        page.evaluate("parseInput(document.getElementById('editor').value);")
        page.evaluate("render();")

        # Verify cache
        is_cached = page.evaluate("localStorage.getItem('panchang_cached_state') !== null")
        print(f"Cache present after render: {is_cached}")

        if is_cached:
            print("Verification Successful!")
        else:
            print("Verification Failed.")

        browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_cache_logic()
