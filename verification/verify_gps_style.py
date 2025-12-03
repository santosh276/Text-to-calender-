from playwright.sync_api import sync_playwright

def verify_gps_style():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the locally served file
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Inject state with location to trigger GPS mode
        page.evaluate("""
            window.appState.config.location = { lat: 20.29, lng: 85.82, name: 'Bhubaneswar, Odisha' };
            window.saveConfigToStorage();
            window.render();
        """)

        # Wait for render
        page.wait_for_timeout(1000)

        # Take a screenshot
        pills = page.locator("#panchang-pills")
        if pills.is_visible():
            pills.screenshot(path="verification/gps_style_fixed.png")
            print("Screenshot saved to verification/gps_style_fixed.png")

            # Check text content of the pills
            text = pills.inner_text()
            print("Pills Content:\n", text)

            # We expect: SUNRISE (GPS) \n [Time]
            if "SUNRISE (GPS)" in text:
                print("SUCCESS: Found 'SUNRISE (GPS)' label.")
            else:
                print("FAILURE: Did not find 'SUNRISE (GPS)' label.")

            # Verify (GPS) is NOT in the time part
            # This is hard to check by text alone since split behavior depends on layout
            # But if "SUNRISE (GPS)" is one string, it's good.

        else:
            print("Panchang pills not visible")

        browser.close()

if __name__ == "__main__":
    verify_gps_style()
