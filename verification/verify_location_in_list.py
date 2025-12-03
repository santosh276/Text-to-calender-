from playwright.sync_api import sync_playwright

def verify_location_in_list(page):
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
    page.wait_for_selector("#calendar-grid", state="visible")

    # Mock Geolocation
    context = page.context
    context.grant_permissions(['geolocation'])
    context.set_geolocation({'latitude': 40.7128, 'longitude': -74.0060}) # NYC

    # Click Location Button
    page.click("#btn-location")
    page.wait_for_timeout(3000)

    # Check if "Location" exists in the panchang list
    panchang_list = page.locator("#panchang-list")
    text = panchang_list.inner_text()
    print(f"Panchang List Content:\n{text}")

    if "Location:" in text and "New York" in text:
        print("Verification Successful: 'Location' field found in list.")
    else:
        print("Verification Failed: 'Location' field not found.")

    page.screenshot(path="verification/location_in_list.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_location_in_list(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
