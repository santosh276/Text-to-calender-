import os
from playwright.sync_api import sync_playwright

def capture_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        filepath = os.path.abspath('ai tex to calnder.html')
        page.goto(f'file://{filepath}')

        page.wait_for_selector('#calendar-grid', timeout=5000)
        page.wait_for_timeout(1000)

        # Take a screenshot to show the updated UI loading successfully
        page.screenshot(path="screenshot.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    capture_screenshot()
