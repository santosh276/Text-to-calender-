from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for rendering to complete
        page.wait_for_timeout(2000)

        # Open day modal for day 14 to see the panchang grid
        page.evaluate("openDayModal(14, getEffectiveMonthData(0, 2026))")
        page.wait_for_timeout(1000)

        page.screenshot(path="screenshot_modal.png")
        print("Screenshot saved to screenshot_modal.png")
        browser.close()

if __name__ == "__main__":
    run()
