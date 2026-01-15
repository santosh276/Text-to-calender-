import os
from playwright.sync_api import sync_playwright

def verify_aurora():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Determine absolute path to the HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for the header to render
        # The class bg-aurora should be present
        header_locator = page.locator(".bg-aurora")
        header_locator.wait_for()

        # Take screenshot of the header
        header_locator.screenshot(path="verification/aurora_header.png")

        browser.close()

if __name__ == "__main__":
    verify_aurora()
