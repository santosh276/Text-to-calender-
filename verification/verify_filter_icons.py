from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        # Navigate to the page
        url = "http://localhost:8000/ai%20tex%20to%20calnder.html"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for filters to render
        page.wait_for_selector("#festival-filters", state="visible")

        # Verify SVG presence in filters
        filters_html = page.locator("#festival-filters").inner_html()

        if "<svg" in filters_html and "fa-gopuram" not in filters_html:
            print("Verified: Filters contain SVGs and no FontAwesome classes for replaced icons.")
        else:
            print("Verification Failed: SVG not found or FontAwesome class still present.")
            print(filters_html[:500]) # Print snippet for debug

        # Take a screenshot of the filters
        screenshot_path = "verification/filter_icons.png"
        page.locator("#festival-filters").screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run()
