from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        page.evaluate("""
            appState.config.location = { lat: 28.6139, lng: 77.2090, name: "New Delhi" };
            render();
        """)

        try:
            timings_section = page.locator("#sec-timings")
            timings_section.wait_for(state="visible", timeout=10000)

            tabs_container = page.locator(".timings-tab-container")
            tabs_container.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Click Inauspicious Button specifically
            page.locator(".timings-tab-btn").filter(has_text="Inauspicious").click()
            page.wait_for_timeout(1000) # Wait for transition

            tabs_container.screenshot(path="verification/timings_tabs_inauspicious.png")

            print("Screenshots captured successfully.")

        except Exception as e:
            print(f"Error capturing screenshot: {e}")

        browser.close()

if __name__ == "__main__":
    run()
