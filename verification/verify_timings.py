import os
from playwright.sync_api import sync_playwright
import datetime

def test_timings_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Inject SunCalc mock
        page.add_init_script("""
            window.SunCalc = {
                getTimes: function(date, lat, lng) {
                    const d = new Date(date);
                    // Mock Sunrise: 6:00 AM, Sunset: 6:00 PM
                    const sunrise = new Date(d); sunrise.setHours(6, 0, 0, 0);
                    const sunset = new Date(d); sunset.setHours(18, 0, 0, 0);
                    return { sunrise, sunset };
                },
                getMoonTimes: function() { return { rise: null, set: null }; }
            };

            // Preset location in localStorage to trigger timings
            const config = {
                location: { lat: 20.2961, lng: 85.8245, name: "Bhubaneswar" },
                sections: { festivals: true, panchang: true }
            };
            // The app uses 'panchang_cached_state' or similar?
            // Let's rely on the app initializing appState.config.location.
            // If the app loads from localStorage, we should set it.
            // Based on code: appState.config = tempConfig; ...
            // initApp tries to load from localStorage.
        """)

        # Determine absolute path to the HTML file
        cwd = os.getcwd()
        file_path = os.path.join(cwd, 'ai tex to calnder.html')
        page.goto(f'file://{file_path}')

        # Wait for app to load
        page.wait_for_selector('body')

        # Manually force appState location and re-render if needed
        page.evaluate("""
            if (typeof appState !== 'undefined') {
                appState.config.location = { lat: 20.2961, lng: 85.8245, name: "Bhubaneswar" };
                // Force render
                if (typeof render === 'function') render();
            }
        """)

        # Wait for timings section to appear
        try:
            page.wait_for_selector('#sec-timings:not(.hidden)', timeout=5000)
        except:
            print("Timings section not visible. Checking why...")
            # Debug: check appState.config.location and SunCalc
            debug_info = page.evaluate("""
                ({
                    hasLocation: !!(appState && appState.config && appState.config.location),
                    hasSunCalc: !!window.SunCalc,
                    timingsHtml: document.getElementById('sec-timings').innerHTML
                })
            """)
            print(f"Debug Info: {debug_info}")

        # Scroll to timings section
        page.locator('#sec-timings').scroll_into_view_if_needed()

        # Take screenshot
        page.screenshot(path='verification/timings_verification.png', full_page=False)
        print("Screenshot saved to verification/timings_verification.png")

        browser.close()

if __name__ == "__main__":
    test_timings_ui()
