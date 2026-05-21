from playwright.sync_api import sync_playwright
import os
import time

def run():
    html_path = os.path.abspath('ai tex to calnder.html')
    uri = f"file://{html_path}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using a mobile viewport to make sure the mobile bottom nav is visible
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()

        page.goto(uri)
        time.sleep(1)

        # Verify timings button is in mobile bottom nav
        nav_btn = page.locator('#mobile-bottom-nav button#nav-btn-timings')
        assert nav_btn.count() == 1, "Timings button not found in mobile nav"

        # Click timings button
        nav_btn.click()
        time.sleep(1)

        # Verify containers visibility
        assert page.locator('#timings-view-container').is_visible(), "timings-view-container is not visible"
        assert not page.locator('#month-view-container').is_visible(), "month-view-container is still visible"

        # Wait for sec-timings to render something. Since the calendar only renders timings when there's location or location isn't needed, let's just check the container is visible and the timing section is present.
        assert page.locator('#sec-timings').count() > 0, "sec-timings not found"

        page.screenshot(path="timings_tab.png", full_page=True)

        print("Playwright test passed 100%")

        browser.close()

if __name__ == '__main__':
    run()
