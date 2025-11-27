
from playwright.sync_api import sync_playwright, expect
import time

def verify_tithi_display(page):
    # Load the page
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for the calendar to render
    page.wait_for_selector("#calendar-grid")

    # 1. Verify "Month's Panchang" sidebar displays Tithi
    # The sidebar header is "Month's Panchang"
    # We look for "Tithi:" in the panchang-list
    panchang_list = page.locator("#panchang-list")
    expect(panchang_list).to_contain_text("Tithi:")

    # Take a screenshot of the sidebar
    page.screenshot(path="/home/jules/verification/sidebar_tithi.png")

    # 2. Verify Modal displays Tithi
    # Click on the 1st day of the month (or any visible day)
    # Using a day that is likely to be present. Assuming default view is January 2025 as per current HTML state or similar.
    # The default data in the HTML has "01" as New Year's Day.

    # Find a grid cell with text "1" or "01"
    day_cell = page.locator(".grid-cell", has_text="1").first
    day_cell.click()

    # Wait for modal to appear
    modal = page.locator("#day-modal")
    expect(modal).to_be_visible()

    # Check for Tithi in modal
    # We added a specific structure: Panchang label, Tithi name, Paksha
    expect(modal).to_contain_text("Panchang")

    # Take a screenshot of the modal
    page.screenshot(path="/home/jules/verification/modal_tithi.png")

    print("Verification complete. Screenshots saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_tithi_display(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
