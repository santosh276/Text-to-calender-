import os
from playwright.sync_api import sync_playwright

def verify_ui():
    file_path = os.path.abspath("ai tex to calnder.html")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"file://{file_path}")

        # Inject mock location to ensure render
        page.evaluate("""
            appState.config.location = { lat: 28.6139, lng: 77.2090, name: "New Delhi" };
            render();
        """)
        page.wait_for_timeout(2000)

        # Screenshot
        page.screenshot(path="premium_ui_verification.png", full_page=True)
        print("Screenshot saved to premium_ui_verification.png")
        browser.close()

if __name__ == "__main__":
    verify_ui()
