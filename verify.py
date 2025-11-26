from playwright.sync_api import sync_playwright, expect
import re

def verify_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8000/ai%20tex%20to%20calnder.html')

        # Wait for the calendar to initially render with a case-insensitive match
        expect(page.locator("#cal-month-year")).to_have_text(re.compile("November 2025", re.IGNORECASE))

        # Click the "previous" button 10 times to get to January
        prev_button = page.locator('button[title="Previous Month"]')
        for _ in range(10):
            prev_button.click()

        # Now we should be in January
        expect(page.locator("#cal-month-year")).to_have_text(re.compile("January 2025", re.IGNORECASE))

        # Verify the Odia text is present initially
        odia_text_locator = page.locator('span.font-oriya:has-text("ନୂତନ ବର୍ଷ")')
        expect(odia_text_locator).to_be_visible()

        # Now, select English Only
        page.select_option('#view-toggle', 'English Only')

        # Verify the Odia text is now hidden
        expect(odia_text_locator).not_to_be_visible()

        # Take the screenshot of the correct state
        page.screenshot(path='verification.png')
        browser.close()

if __name__ == '__main__':
    verify_fix()
