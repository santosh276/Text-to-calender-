from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Inject state to navigate to May 2026
        page.evaluate("""
            appState.viewDate = { month: 4, year: 2026 };
            appState.activeMonthIndex = -1;
            render();
        """)

        page.wait_for_timeout(1000)
        page.screenshot(path="verification/calendar_may_2026_logic.png")
        browser.close()

if __name__ == "__main__":
    run()
