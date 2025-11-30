import time
from playwright.sync_api import sync_playwright

def verify_banner():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Ensure we are serving the file
        page.goto('http://localhost:8080/ai%20tex%20to%20calnder.html')

        # Wait for app to load
        page.wait_for_selector('#calendar-grid')

        print("Checking default state...")
        month_text = page.inner_text('#cal-month-year')
        print(f"Current Month: {month_text}")

        if "NOVEMBER 2025" not in month_text.upper():
            print("Navigating to November 2025...")
            for _ in range(12):
                page.click('button[title="Next Month"]')
                time.sleep(0.5)
                month_text = page.inner_text('#cal-month-year')
                if "NOVEMBER 2025" in month_text.upper():
                    break

        print(f"Now at: {month_text}")

        # Check for Banner Container
        banner_container = page.locator('#month-banner-container')
        if banner_container.is_visible():
            print("Banner container is visible.")
            # Scroll to banner to ensure it's in view for screenshot
            banner_container.scroll_into_view_if_needed()
            time.sleep(1) # wait for animation/load
            page.screenshot(path='verification/banner_screenshot.png')
            print("Screenshot taken: verification/banner_screenshot.png")
        else:
            print("Banner container is NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_banner()
