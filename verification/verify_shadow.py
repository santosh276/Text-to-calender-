from playwright.sync_api import sync_playwright

def verify_shadow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the calendar month element to be visible
        page.wait_for_selector("#cal-month")

        # Take a screenshot of the calendar header section
        # The container has class "bg-white rounded-3xl shadow-xl"
        # We can locate the container that contains #cal-month
        header_container = page.locator("#cal-month").locator("xpath=ancestor::div[contains(@class, 'bg-white rounded-3xl')]").first

        # Ensure header is visible
        header_container.scroll_into_view_if_needed()

        header_container.screenshot(path="verification/month_header_shadow.png")

        # Also log the class attribute to confirm drop-shadow-md is present
        class_attr = page.locator("#cal-month").get_attribute("class")
        print(f"Class attribute of #cal-month: {class_attr}")

        browser.close()

if __name__ == "__main__":
    verify_shadow()
