from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 812})  # Mobile viewport

        file_url = f"file:///app/ai%20tex%20to%20calnder.html"
        page.goto(file_url)

        # We need to wait for the markdown to be parsed by the page natively instead of injecting state, because appState is inside a closure!

        # Click the edit button to close the editor and parse input, wait for calendar view
        page.evaluate("""
            const toggleBtn = document.getElementById('toggle-editor');
            if (toggleBtn) {
                toggleBtn.click();
            }
        """)

        # Wait for the element
        try:
            page.wait_for_selector('.heartbeat-border', timeout=5000)

            # Specifically snapshot the festival section
            elem = page.locator('#sec-festivals')
            elem.screenshot(path='festival_section2.png')
            print("Screenshot saved to festival_section2.png")

            # Also get computed styles of heartbeat-border
            styles = page.evaluate("""
                () => {
                    const el = document.querySelector('.heartbeat-border');
                    if (!el) return null;
                    return {
                        position: window.getComputedStyle(el).position,
                        margin: window.getComputedStyle(el).margin,
                        padding: window.getComputedStyle(el).padding,
                    };
                }
            """)
            print("Styles:", styles)

        except Exception as e:
            print("Could not find element:", e)
            page.screenshot(path='cutoff_test.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
