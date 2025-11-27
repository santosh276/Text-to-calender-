from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        # 1. Verify Season (Ritu) Pill
        print("Checking Season Pill...")
        season_pill = page.locator("#panchang-pills").get_by_text("SEASON (RITU)")
        if season_pill.is_visible():
            print("Season Pill is visible.")
        else:
            print("Season Pill is NOT visible.")

        # 2. Verify Tithi in Sidebar
        print("Checking Tithi in Sidebar...")
        tithi_item = page.locator("#panchang-list").get_by_text("Tithi:")
        if tithi_item.is_visible():
            print("Tithi in Sidebar is visible.")
        else:
            print("Tithi in Sidebar is NOT visible.")

        # 3. Verify Purnima/Amavasya Icons
        # We need to find a day with index 14 or 29.
        # Jan 11 2024 was Amavasya.
        # Let's check if any grid cell has the moon/sun icon.
        print("Checking for Tithi Icons in Grid...")
        # Purnima icon: fa-circle text-amber-400
        purnima_icons = page.locator(".fa-circle.text-amber-400")
        # Amavasya icon: fa-circle text-gray-900
        amavasya_icons = page.locator(".fa-circle.text-gray-900")

        count_purnima = purnima_icons.count()
        count_amavasya = amavasya_icons.count()

        print(f"Found {count_purnima} Purnima icons.")
        print(f"Found {count_amavasya} Amavasya icons.")

        # 4. Verify Day Modal Injection
        # Click on a day to open modal
        print("Opening Day Modal...")
        # Click the 15th day (arbitrary)
        page.locator(".grid-cell").nth(14).click()
        page.wait_for_selector("#day-modal")

        # Check for Tithi in Modal
        print("Checking Tithi in Modal...")
        # We look for the moon icon container we injected
        modal_tithi = page.locator("#modal-tag-pill .fa-moon")
        if modal_tithi.is_visible():
             print("Tithi in Modal is visible.")
        else:
             print("Tithi in Modal is NOT visible.")

        # Take screenshot
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
