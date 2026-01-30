from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # Load the file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for the grid to render and ensure some content is present
        page.wait_for_selector("#calendar-grid")
        page.wait_for_timeout(1000) # Give it a second to render JS

        # Screenshot the calendar grid
        element = page.locator("#calendar-grid")
        element.screenshot(path="/home/jules/verification/paksha_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
