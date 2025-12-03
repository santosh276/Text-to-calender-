from playwright.sync_api import sync_playwright
import time

def verify_storage(page):
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
    page.wait_for_selector("#calendar-grid", state="visible")

    # 1. Set a location (mock)
    context = page.context
    context.grant_permissions(['geolocation'])
    context.set_geolocation({'latitude': 48.8566, 'longitude': 2.3522}) # Paris

    print("Clicking Use My Location...")
    page.click("#btn-location")
    page.wait_for_timeout(3000) # Wait for update

    # Verify text is updated
    panchang_section = page.locator("#location-btn-container")
    text = panchang_section.inner_text()
    print(f"Text before reload: {text}")

    # 2. Reload page
    print("Reloading page...")
    page.reload()
    page.wait_for_selector("#calendar-grid", state="visible")

    # 3. Check if location persists
    panchang_section = page.locator("#location-btn-container")
    text_after = panchang_section.inner_text()
    print(f"Text after reload: {text_after}")

    if "Paris" in text_after or "48.86, 2.35" in text_after or "Using GPS" in text_after:
        print("Verification Successful: Location persisted.")
    else:
        # Check local storage directly
        ls = page.evaluate("() => localStorage.getItem('panchangConfig')")
        print(f"LocalStorage Content: {ls}")
        if ls and "lat" in ls:
             print("Verification Partial: Data in LS, but maybe UI didn't render it?")
        else:
             print("Verification Failed: No data in LS or UI.")

    page.screenshot(path="verification/storage_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_storage(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
