from playwright.sync_api import sync_playwright
import os

def test_search_bar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local HTML file
        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_url)

        # Switch to the More view to make it visible
        page.evaluate("toggleView('more')")

        # Wait for the more view to be visible
        page.wait_for_selector('#more-view-container:not(.hidden)')

        # Take a screenshot
        page.screenshot(path="more_search_bar.png", full_page=True)

        browser.close()

test_search_bar()
