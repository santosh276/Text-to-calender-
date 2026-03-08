from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using desktop viewport so the festival panel is on the right side and easier to see fully
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        file_url = f"file:///app/ai%20tex%20to%20calnder.html"
        page.goto(file_url)

        # Parse markdown
        page.evaluate("""
            const toggleBtn = document.getElementById('toggle-editor');
            if (toggleBtn) {
                toggleBtn.click();
            }
        """)

        page.wait_for_timeout(1000)

        # Override date to force Jan 14 as today
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

        try:
            page.wait_for_selector('.heartbeat-border', timeout=5000)

            # Change scaling on heartbeat-border temporarily to a larger value just to verify if clipping is gone
            page.evaluate("""
                const style = document.createElement('style');
                style.innerHTML = `
                  @keyframes border-pulse {
                      0% { opacity: 0.3; transform: scale(1); }
                      50% { opacity: 0.8; transform: scale(1.1); }
                      100% { opacity: 0.3; transform: scale(1); }
                  }
                `;
                document.head.appendChild(style);
            """)

            page.wait_for_timeout(1000)

            elem = page.locator('#sec-festivals')
            elem.screenshot(path='festival_section_desktop.png')
            print("Screenshot saved to festival_section_desktop.png")

        except Exception as e:
            print("Could not find element:", e)

        browser.close()

if __name__ == '__main__':
    run()
