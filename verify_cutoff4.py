from playwright.sync_api import sync_playwright
import os
import time
from datetime import datetime

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 812})  # Mobile viewport

        file_url = f"file:///app/ai%20tex%20to%20calnder.html"
        page.goto(file_url)

        # We need to wait for the markdown to be parsed by the page natively instead of injecting state, because appState is inside a closure!

        page.evaluate("""
            const toggleBtn = document.getElementById('toggle-editor');
            if (toggleBtn) {
                toggleBtn.click();
            }
        """)

        # Wait a bit for the render
        page.wait_for_timeout(1000)

        # Override the current date mock using the app's standard date check logic
        # We'll re-render by calling renderCalendarGrid or clicking next month, etc.
        # But we need to make sure `isToday` resolves to true for one of the items.
        # Since the markdown has Jan 14 2026, let's mock the global Date object
        page.evaluate("""
            const originalDate = Date;
            class MockDate extends Date {
              constructor(...args) {
                if (args.length === 0) {
                  super('2026-01-14T12:00:00Z');
                } else {
                  super(...args);
                }
              }
            }
            window.Date = MockDate;

            // Re-render
            const nextBtn = document.getElementById('next-month');
            if (nextBtn) {
                nextBtn.click();
                const prevBtn = document.getElementById('prev-month');
                if (prevBtn) prevBtn.click();
            }
        """)

        # Wait for the element
        try:
            page.wait_for_selector('.heartbeat-border', timeout=5000)

            # Specifically snapshot the festival section
            elem = page.locator('#sec-festivals')
            elem.screenshot(path='festival_section_with_heartbeat.png')
            print("Screenshot saved to festival_section_with_heartbeat.png")

        except Exception as e:
            print("Could not find element:", e)
            page.screenshot(path='cutoff_test_with_heartbeat.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
