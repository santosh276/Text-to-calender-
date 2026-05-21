from playwright.sync_api import sync_playwright
import os
import time

def run():
    html_path = os.path.abspath('ai tex to calnder.html')
    uri = f"file://{html_path}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using a desktop viewport to check desktop nav
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        page.goto(uri)
        time.sleep(1)

        # Click timings button
        nav_btn = page.locator('#desktop-top-nav button:has-text("Timings")')
        nav_btn.click()
        time.sleep(1)

        # Verify containers visibility
        assert page.locator('#timings-view-container').is_visible(), "timings-view-container is not visible"
        assert not page.locator('#month-view-container').is_visible(), "month-view-container is still visible"

        page.screenshot(path="timings_tab_desktop.png", full_page=True)

        print("Desktop Playwright test passed 100%")

        browser.close()

if __name__ == '__main__':
    run()
