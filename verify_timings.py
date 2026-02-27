
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Inject mock location data and force render
        page.evaluate("""
            const mockLocation = {
                lat: 28.6139,
                lng: 77.2090,
                name: "New Delhi, India"
            };
            appState.config.location = mockLocation;

            // Mock SunCalc if missing (for test environment stability)
            if (typeof SunCalc === 'undefined') {
                window.SunCalc = {
                    getTimes: function(date, lat, lng) {
                        return {
                            sunrise: new Date(date.setHours(6, 0, 0)),
                            sunset: new Date(date.setHours(18, 0, 0))
                        };
                    },
                    getMoonTimes: function() { return { rise: null, set: null }; }
                };
            }

            render();
        """)

        # Wait for timings section to appear
        try:
            page.wait_for_selector("#sec-timings", timeout=5000)

            # Take screenshot of the timings section
            timings_section = page.locator("#sec-timings")
            timings_section.screenshot(path="timings_verification.png")
            print("Screenshot saved: timings_verification.png")

        except Exception as e:
            print(f"Error: {e}")
            # Fallback: full page screenshot if selector fails
            page.screenshot(path="full_page_error.png")

        browser.close()

if __name__ == "__main__":
    run()
