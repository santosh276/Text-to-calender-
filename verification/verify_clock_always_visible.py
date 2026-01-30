import os
from playwright.sync_api import sync_playwright

def verify_clock_always_visible():
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

        # Wait a bit
        page.wait_for_timeout(2000)

        # Check if clock card exists
        # It has id="live-clock-time" inside
        clock_element = page.locator("#live-clock-time")

        if clock_element.is_visible():
            print("SUCCESS: Clock card is visible.")
            # Screenshot the festivals section
            element = page.locator("#sec-festivals")
            if element.is_visible():
                element.screenshot(path="verification/clock_visible_screenshot.png")
                print("Screenshot captured: verification/clock_visible_screenshot.png")
        else:
            print("ERROR: Clock card is NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_clock_always_visible()
