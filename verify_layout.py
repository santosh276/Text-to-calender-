
from playwright.sync_api import sync_playwright
import os

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Inject location to ensure Timings section renders
        page.evaluate("""
            () => {
                appState.config.location = { lat: 28.6139, lng: 77.2090, name: "New Delhi" };
                render();
            }
        """)

        # Wait for the timings section to be visible
        page.wait_for_selector("#sec-timings", state="visible")

        # Take a screenshot of the Timings section
        timings_element = page.locator("#sec-timings")
        timings_element.screenshot(path="timings_layout_verification.png")

        print("Screenshot saved to timings_layout_verification.png")
        browser.close()

if __name__ == "__main__":
    verify_layout()
