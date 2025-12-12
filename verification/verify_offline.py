from playwright.sync_api import sync_playwright

def verify_calendar(page):
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for the calendar to load (header should be visible)
    page.wait_for_selector("#cal-month-year")

    # Take a screenshot
    page.screenshot(path="verification/calendar_offline.png")

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
