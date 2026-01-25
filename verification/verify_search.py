import os
from playwright.sync_api import sync_playwright

def verify_search():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for app to load (checking for editor or calendar grid)
        page.wait_for_selector("#calendar-grid")

        # Type in search bar
        search_input = page.locator("#festival-search")
        search_input.fill("Nuakhai")

        # Wait for results
        # We expect a list item with "Nuakhai" text
        # This confirms that global search found the event from November while likely in January view
        try:
            page.wait_for_selector("#festival-list li:has-text('Nuakhai')", timeout=5000)
            print("Verification successful: Nuakhai found in search results.")
        except Exception as e:
            print("Verification failed: Nuakhai not found.")
            # Capture what IS visible
            page.screenshot(path="verification/search_failed.png")
            raise e

        # Take screenshot of success
        page.screenshot(path="verification/search_result.png")

        browser.close()

if __name__ == "__main__":
    verify_search()
