from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for rendering to complete
        page.wait_for_timeout(2000)

        # Open day modal for day 14 to see the panchang grid
        # Add a dummy location to enable Astro details
        page.evaluate("appState.config.location = {lat: 28.6139, lng: 77.2090}")
        page.evaluate("openDayModal(14, getEffectiveMonthData(0, 2026))")
        page.wait_for_timeout(1000)

        # scroll down to the astro details part
        page.evaluate("document.querySelector('#day-modal .overflow-y-auto').scrollTop = 500")
        page.wait_for_timeout(1000)

        page.screenshot(path="screenshot_modal2.png")
        print("Screenshot saved to screenshot_modal2.png")
        browser.close()

if __name__ == "__main__":
    run()
