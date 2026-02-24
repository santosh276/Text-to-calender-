import os
from playwright.sync_api import sync_playwright

def test_timings_active():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock Date to be Thursday, Jan 1 2026, 14:00:00 (Rahu Active on Thursday)
        # Location: Bhubaneswar (Sunrise ~6:30, Rahu ~13:10-14:30)

        page.add_init_script("""
            // Mock Date
            const mockDate = new Date("2026-01-01T14:00:00");
            const OriginalDate = Date;

            window.Date = class extends Date {
                constructor(...args) {
                    if (args.length === 0) return new OriginalDate(mockDate);
                    return new OriginalDate(...args);
                }
                static now() { return mockDate.getTime(); }
            };

            // We do NOT mock SunCalc here, letting the app use its embedded one.
            // But we need to ensure the app doesn't crash if we messed up Date.
        """)

        cwd = os.getcwd()
        file_path = os.path.join(cwd, 'ai tex to calnder.html')
        page.goto(f'file://{file_path}')

        page.wait_for_selector('body')

        # Set location and render
        page.evaluate("""
            if (typeof appState !== 'undefined') {
                appState.config.location = { lat: 20.2961, lng: 85.8245, name: "Bhubaneswar" };
                // Force render
                if (typeof render === 'function') render();
            }
        """)

        try:
            # Wait for timings section
            page.wait_for_selector('#sec-timings:not(.hidden)', timeout=5000)

            # Scroll to it
            page.locator('#sec-timings').scroll_into_view_if_needed()

            # Additional wait for animations/rendering
            page.wait_for_timeout(1000)

            page.screenshot(path='verification/timings_active.png', full_page=False)
            print("Screenshot saved to verification/timings_active.png")
        except Exception as e:
            print(f"Timings section failed to load: {e}")

        browser.close()

if __name__ == "__main__":
    test_timings_active()
