from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for app to load
        page.wait_for_selector("#calendar-grid")

        # Inject state to navigate to May 2026
        page.evaluate("""
            appState.viewDate = { month: 4, year: 2026 };
            appState.activeMonthIndex = -1; // Force regen
            render();
        """)

        # Wait a bit for render
        page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="verification/calendar_may_2026_v4.png")

        browser.close()

if __name__ == "__main__":
    run()
