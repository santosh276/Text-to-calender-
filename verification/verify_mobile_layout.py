import os
from playwright.sync_api import sync_playwright

def verify_mobile_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set viewport to mobile size
        page = browser.new_page(viewport={"width": 375, "height": 812})

        # Load local file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for rendering
        page.wait_for_selector("#month-view-container")
        page.wait_for_selector("#sec-festivals")

        # Take full page screenshot
        page.screenshot(path="verification/mobile_layout_check.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_mobile_layout()
