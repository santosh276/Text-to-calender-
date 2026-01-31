from playwright.sync_api import sync_playwright
import os

def verify_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 375, 'height': 812}) # Mobile viewport
        # Navigate to the file
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for header to be visible
        header = page.locator("header")
        header.wait_for()

        # Take screenshot of the header
        os.makedirs("verification", exist_ok=True)
        header.screenshot(path="verification/header_screenshot_new_icon.png")

        browser.close()

if __name__ == "__main__":
    verify_header()
