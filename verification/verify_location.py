
from playwright.sync_api import sync_playwright

def verify_calendar(page):
    # Go to the local server serving the HTML file
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for the calendar to load (rendering might take a moment)
    page.wait_for_selector("#calendar-grid", state="visible")

    # Check if the "Use My Location" button exists in the sidebar
    location_btn = page.locator("#btn-location")
    if location_btn.count() > 0:
        print("Location button found!")
    else:
        print("Location button NOT found!")

    # Check the "Month's Panchang" section
    panchang_list = page.locator("#panchang-list")

    # Take a screenshot of the sidebar (specifically the Month's Panchang section if possible, or whole page)
    # Ideally focus on the sidebar

    page.set_viewport_size({"width": 1280, "height": 800})

    # Screenshot the whole page
    page.screenshot(path="verification/page_full.png")

    # Attempt to screenshot just the panchang card
    panchang_card = page.locator(".glass.border-deepred") # The Panchang card has border-deepred
    if panchang_card.count() > 0:
        panchang_card.first.screenshot(path="verification/panchang_card.png")
        print("Panchang card screenshot saved.")

    # Now simulate a click (Geolocation needs permissions, which we can mock)
    # Mocking geolocation in Playwright
    context = page.context
    context.grant_permissions(['geolocation'])
    context.set_geolocation({'latitude': 51.5074, 'longitude': -0.1278}) # London

    print("Clicking Use My Location...")
    location_btn.click()

    # Wait for updates
    page.wait_for_timeout(2000) # Wait for "Locating..." and then update

    # Check if "Sunrise" pill now says (GPS)
    sunrise_pill = page.locator("#panchang-pills").get_by_text("(GPS)")
    if sunrise_pill.count() > 0:
        print("GPS indicator found in pills!")
    else:
        print("GPS indicator NOT found!")

    # Take another screenshot after location update
    if panchang_card.count() > 0:
        panchang_card.first.screenshot(path="verification/panchang_card_after_gps.png")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_calendar(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
