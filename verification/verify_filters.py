from playwright.sync_api import sync_playwright

def verify_filters():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#sec-festivals")
        festivals_section = page.locator("#sec-festivals")
        festivals_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)

        # Click Holidays to get step 2 state
        holiday_btn = page.get_by_role("button", name="Holidays").first
        holiday_btn.click()
        page.wait_for_timeout(500)
        page.screenshot(path="verification/filter_step2.png")
        browser.close()

if __name__ == "__main__":
    verify_filters()
