from playwright.sync_api import sync_playwright

def verify_location_display():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the locally served file
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Inject state
        page.evaluate("""
            window.appState.config.location = { lat: 20.29, lng: 85.82, name: 'Bhubaneswar, Odisha' };
            window.saveConfigToStorage();
            window.render();
        """)

        # Wait for render
        page.wait_for_timeout(1000)

        # Take a screenshot of the panchang list
        list_element = page.locator("#panchang-list")
        if list_element.is_visible():
            list_element.screenshot(path="verification/panchang_list.png")
            print("Screenshot saved to verification/panchang_list.png")

            # Text content check
            text = list_element.inner_text()
            if "LOCATION" in text.upper() and "BHUBANESWAR, ODISHA" in text.upper():
                print("SUCCESS: Location found in list.")
            else:
                print(f"FAILURE: Location NOT found in list. Content: {text}")
        else:
            print("Panchang list not visible")

        browser.close()

if __name__ == "__main__":
    verify_location_display()
