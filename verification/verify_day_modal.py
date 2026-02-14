import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 375, "height": 812}) # Mobile viewport to match user context often

    # Go to the page
    url = "http://localhost:8000/ai%20tex%20to%20calnder.html"
    print(f"Navigating to {url}")
    page.goto(url)

    # Wait for calendar grid
    print("Waiting for calendar grid...")
    page.wait_for_selector("#calendar-grid")

    # Click on a day (e.g., the 15th)
    # Finding a cell with text '15'
    print("Clicking on day 15...")
    day_cell = page.locator(".grid-cell", has_text="15").first
    if day_cell.count() > 0:
        day_cell.click()
    else:
        print("Day 15 not found, trying any cell")
        page.locator(".grid-cell").first.click()

    # Wait for modal
    print("Waiting for modal...")
    modal = page.locator("#day-modal")
    modal.wait_for(state="visible")

    # Wait a bit for animation
    time.sleep(1)

    # Screenshot the modal content
    print("Taking screenshot...")
    modal_content = modal.locator(".modal-content")
    modal_content.screenshot(path="verification_modal.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
