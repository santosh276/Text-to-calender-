from playwright.sync_api import sync_playwright

def verify_location_name(page):
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
    page.wait_for_selector("#calendar-grid", state="visible")

    # Mock Geolocation
    context = page.context
    context.grant_permissions(['geolocation'])
    context.set_geolocation({'latitude': 51.5074, 'longitude': -0.1278}) # London

    # Click Location Button
    page.click("#btn-location")

    # Wait for update
    page.wait_for_timeout(3000) # Give time for fetch (which might fail in mock env or take time)

    # Check text
    panchang_section = page.locator("#location-btn-container")
    text = panchang_section.inner_text()
    print(f"Container Text: {text}")

    # We expect coordinates or London (if fetch works)
    # Since we can't guarantee external fetch works in this env, we accept coordinates
    expected_coords = "51.51, -0.13"

    if expected_coords in text or "London" in text:
        print("Verification Successful: Location info displayed.")
    else:
        print("Verification Failed: text mismatch.")

    page.screenshot(path="verification/location_name_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_location_name(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
