from playwright.sync_api import sync_playwright
import os

def verify_infinite_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Test 1: Navigation beyond initial data
        # Default view is today (e.g. Jan 2025 in the provided sample data context, but script uses Date.now())
        # Let's force a specific date via console to be sure
        page.evaluate("appState.viewDate = { year: 2025, month: 0 }; render();")

        # Click "Next Month" 13 times to go to Feb 2026
        next_btn = page.locator("button[title='Next Month']")
        for _ in range(13):
            next_btn.click()

        # Verify Month/Year text
        month_text = page.locator("#cal-month").inner_text()
        year_text = page.locator("#cal-year").inner_text()
        print(f"Navigated to: {month_text} {year_text}")

        if month_text != "February" or year_text != "2026":
            print("Failed to navigate to Feb 2026")

        # Test 2: Recurring Events
        # Inject recurring event
        page.evaluate("""
            const editor = document.getElementById('editor');
            editor.value = `::: recurring
25-02 * Test Recurring Event
:::`;
            parseInput(editor.value);
            // Re-navigate because parseInput resets viewDate (based on my implementation)
            // Wait, my implementation sets viewDate to first available month or today.
            // If recurring block is the only thing, monthsData might be empty.
            // Let's force navigation again.
            changeMonth(0); // Trigger render
        """)

        # Navigate to Feb 2026 again
        # Check if "Test Recurring Event" is visible
        # It should be on 25th

        # Force view to Feb 2026
        page.evaluate("appState.viewDate = { year: 2026, month: 1 }; render();")

        # Check for event text
        # Since it's a future generated month, it relies on getEffectiveMonthData merging recurring events
        try:
            page.wait_for_selector("text=Test Recurring Event", timeout=2000)
            print("Recurring event found in future year!")
        except:
            print("Recurring event NOT found.")
            page.screenshot(path="verification/infinite_nav_fail.png")
            raise Exception("Recurring event missing")

        # Take screenshot
        page.screenshot(path="verification/infinite_nav.png")
        browser.close()

if __name__ == "__main__":
    verify_infinite_navigation()
