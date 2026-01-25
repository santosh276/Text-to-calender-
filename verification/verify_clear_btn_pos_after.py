import os
from playwright.sync_api import sync_playwright

def verify_search_clear_button_after():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for app to load
        page.wait_for_selector("#calendar-grid")

        # Type in search bar to trigger clear button appearance
        search_input = page.locator("#festival-search")
        search_input.fill("Test")

        # Wait for clear button to be visible
        clear_btn = page.locator("#search-clear")
        clear_btn.wait_for(state="visible")

        # Take screenshot of the search bar area
        search_wrapper = search_input.locator("..")
        search_wrapper.screenshot(path="verification/search_bar_after.png")

        print("Screenshot 'verification/search_bar_after.png' taken.")
        browser.close()

if __name__ == "__main__":
    verify_search_clear_button_after()
