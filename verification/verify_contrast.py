from playwright.sync_api import sync_playwright

def verify_contrast(page):
    # 1. Navigate to the local server
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
    page.wait_for_selector("#calendar-grid")

    # 2. Screenshot the main calendar view (Light Mode)
    page.screenshot(path="verification/calendar_main_view.png")

    # 3. Zoom into Festival Sidebar to check badge contrast
    sidebar = page.locator("#sec-festivals")
    sidebar.screenshot(path="verification/sidebar_festivals.png")

    # 4. Open Day Modal to check Modal text contrast
    # Click on Jan 14 (Makar Sankranti - Festival)
    # Finding cell with text '14'
    page.get_by_text("14", exact=True).first.click()
    page.wait_for_selector("#day-modal .modal-content")
    page.wait_for_timeout(500) # Wait for animation
    page.screenshot(path="verification/day_modal.png")

    # Close Modal
    page.click("#day-modal button")

    # 5. Open Settings Modal to check Settings text contrast
    page.click("button:has-text('Settings')")
    page.wait_for_selector("#settings-modal .modal-content")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/settings_modal.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            verify_contrast(page)
            print("Screenshots taken successfully.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
