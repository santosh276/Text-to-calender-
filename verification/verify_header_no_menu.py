from playwright.sync_api import sync_playwright

def verify_header_no_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar header to be visible
        page.wait_for_selector("#cal-month")

        # Verify that the menu button with fa-bars is NOT present
        # The button had onclick="openSettingsModal()" and aria-label="Settings"
        # and contained fa-bars

        menu_button = page.locator('button[onclick="openSettingsModal()"] i.fa-bars')
        count = menu_button.count()

        if count == 0:
            print("SUCCESS: Menu button (fa-bars) is absent.")
        else:
            print(f"FAILURE: Found {count} menu button(s).")

        # Take a screenshot of the calendar header to confirm layout
        # We target the specific gradient header container
        # It has classes: relative w-full overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-b ...
        # Let's find it by the unique month ID inside it and go up to parent
        header_container = page.locator("#cal-month").locator("xpath=../../..")

        header_container.screenshot(path="verification/header_no_menu.png")

        browser.close()

if __name__ == "__main__":
    verify_header_no_menu()
