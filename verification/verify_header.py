from playwright.sync_api import sync_playwright

def verify_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for the header to be visible
        header_locator = page.locator(".bg-gradient-to-r.from-orange-500.to-red-600")
        header_locator.wait_for()

        # Take a screenshot of the header area specifically
        # We can locate the container that holds the header
        preview_container = page.locator("#preview-container")
        preview_container.screenshot(path="verification/header_vivid.png")

        print("Screenshot taken: verification/header_vivid.png")
        browser.close()

if __name__ == "__main__":
    verify_header()
