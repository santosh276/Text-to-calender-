import os
from playwright.sync_api import sync_playwright

def verify_split_cards():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local HTML file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/ai tex to calnder.html"
        print(f"Navigating to: {file_path}")
        page.goto(file_path)

        # Wait for the app to render
        page.wait_for_selector("#sec-festivals")

        # Wait a bit for the Up Next card to appear (it depends on data parsing)
        page.wait_for_timeout(2000)

        # Screenshot the festivals section where the cards are
        element = page.locator("#sec-festivals")
        if element.is_visible():
            element.screenshot(path="verification/split_cards_screenshot.png")
            print("Screenshot captured: verification/split_cards_screenshot.png")
        else:
            print("Error: #sec-festivals not visible")

        browser.close()

if __name__ == "__main__":
    verify_split_cards()
