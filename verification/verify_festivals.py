
from playwright.sync_api import sync_playwright

def verify_festivals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the festivals list to be visible
        page.wait_for_selector("#festival-list")

        # Wait for a brief moment to ensure everything is rendered
        page.wait_for_timeout(2000)

        # Take a screenshot of the festivals list
        element = page.locator("#festival-list").locator("..") # Get parent container
        element.screenshot(path="verification/festivals_screenshot.png")

        print("Screenshot taken at verification/festivals_screenshot.png")
        browser.close()

if __name__ == "__main__":
    verify_festivals()
