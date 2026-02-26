from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Inject location and re-render
        page.evaluate("""
            appState.config.location = { lat: 28.6139, lng: 77.2090, name: "New Delhi" }; // Dummy Delhi location
            render();
        """)

        try:
            # Locate the timings section
            timings_section = page.locator("#sec-timings")
            timings_section.wait_for(state="visible", timeout=10000)

            # Locate the tabs container
            tabs_container = page.locator(".timings-tab-container")
            tabs_container.scroll_into_view_if_needed()

            # Wait a bit for animations
            page.wait_for_timeout(1000)

            tabs_container.screenshot(path="verification/timings_tabs.png")
            timings_section.screenshot(path="verification/timings_section.png")

            print("Screenshots captured successfully.")

        except Exception as e:
            print(f"Error capturing screenshot: {e}")
            page.screenshot(path="verification/debug_full_page.png")

        browser.close()

if __name__ == "__main__":
    run()
