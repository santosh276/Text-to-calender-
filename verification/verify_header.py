from playwright.sync_api import sync_playwright

def verify_calendar_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the file served by python http server
        # We need to handle the space in the filename: "ai tex to calnder.html"
        # URL encoding for space is %20
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for the calendar header element to be visible
        page.wait_for_selector("#cal-month")

        # Take a screenshot of the calendar header
        # We target the header container to see context
        header = page.locator(".bg-white.rounded-3xl.shadow-xl")
        header.screenshot(path="verification/header_shadow.png")

        # Also verify the class presence programmatically
        month_el = page.locator("#cal-month")
        classes = month_el.get_attribute("class")
        if "drop-shadow-md" in classes:
            print("SUCCESS: drop-shadow-md class found on #cal-month")
        else:
            print(f"FAILURE: drop-shadow-md class NOT found. Classes: {classes}")

        browser.close()

if __name__ == "__main__":
    verify_calendar_header()
