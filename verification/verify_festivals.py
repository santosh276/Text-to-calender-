
from playwright.sync_api import sync_playwright

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        # Assuming the file is served at port 8000
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#festival-filters")

        # Take screenshot of the festival section
        filters = page.locator("#sec-festivals")
        filters.screenshot(path="verification/festival_filters_fixed.png")

        # Also log the classes to verify flex-wrap is present
        classes = page.locator("#festival-filters").get_attribute("class")
        print(f"Classes: {classes}")

        browser.close()

if __name__ == "__main__":
    verify_layout()
