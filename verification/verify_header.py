from playwright.sync_api import sync_playwright

def verify_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop View
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for content to render
        page.wait_for_selector("#cal-month-year")

        # Screenshot header - Desktop
        # The header is now using .custom-header-gradient
        header_locator = page.locator(".custom-header-gradient")
        header_locator.screenshot(path="verification/header_desktop.png")
        print("Desktop screenshot saved.")

        # 2. Mobile View
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 667})
        page_mobile.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        page_mobile.wait_for_selector("#cal-month-year")

        header_locator_mobile = page_mobile.locator(".custom-header-gradient")
        header_locator_mobile.screenshot(path="verification/header_mobile.png")
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_header()
