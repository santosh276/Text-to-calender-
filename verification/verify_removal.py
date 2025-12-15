
from playwright.sync_api import sync_playwright

def verify_removal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 800})

        # Navigate to the app (using the already running server on port 8080)
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the editor panel to be visible
        page.wait_for_selector("#editor-panel")

        # Capture screenshot of the header
        header = page.locator("#editor-panel .bg-black.border-b")
        header.screenshot(path="verification/header_removal.png")

        browser.close()

if __name__ == "__main__":
    verify_removal()
