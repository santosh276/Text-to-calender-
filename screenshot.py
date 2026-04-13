from playwright.sync_api import sync_playwright
import os
import time

def take_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1024, "height": 800})

        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_path)

        page.evaluate("toggleView('more')")
        page.wait_for_selector('#more-view-container:not(.hidden)', timeout=5000)

        time.sleep(1) # wait for animations

        # Take screenshot of the More view
        page.screenshot(path='test_more_search_bar.png', full_page=True)
        browser.close()

if __name__ == "__main__":
    take_screenshot()
