from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    # Serve the file locally. Since we are in the root, and the file is in root.
    # We can use python http server.

    # Actually, simpler to just use file:// if possible, but local server is better for some assets.
    # Let's assume we start a server in another process.
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Wait for app to load
    page.wait_for_selector("#editor", state="visible")

    # Switch to Year View
    page.click("#btn-year-view")

    # Wait for Year View container
    page.wait_for_selector("#year-view-container", state="visible")

    # Take screenshot of the Year View
    page.screenshot(path="verification/year_view.png")

    # Hover over a month card to test hover effect (visualized in screenshot?)
    # Hovering might not show easily in static screenshot unless we force state or take multiple.
    # Let's hover over January (index 0)
    # The cards are generated dynamically. Select the first card in grid.
    card = page.locator("#year-grid > div").first
    card.hover()
    page.screenshot(path="verification/year_view_hover.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
