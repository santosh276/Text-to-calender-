from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 812})  # Mobile viewport

        file_url = f"file:///app/ai%20tex%20to%20calnder.html"
        page.goto(file_url)

        # Inject state
        page.evaluate("""
            window.appState.today = new Date('2026-01-14T12:00:00Z');
            window.appState.viewDate = {month: 0, year: 2026};
            window.appState.activeMonthIndex = 0;

            if (window.render) {
                window.render();
            }
        """)

        # Wait for the element
        page.wait_for_selector('.heartbeat-border', timeout=10000)

        # Take a screenshot
        page.screenshot(path='cutoff_test.png', full_page=True)
        print("Screenshot saved to cutoff_test.png")
        browser.close()

if __name__ == '__main__':
    run()
