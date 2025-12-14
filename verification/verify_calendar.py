
from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server serving the HTML file
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        # Verify the Month Year Title
        # Actual text might be Title Case, CSS handles uppercase
        expect(page.locator("#cal-month-year")).to_contain_text("January 2026", ignore_case=True)

        # Verify Festivals in the sidebar
        festival_list = page.locator("#festival-list")
        expect(festival_list).to_contain_text("English New Year")
        expect(festival_list).to_contain_text("Pausha Purnima")
        expect(festival_list).to_contain_text("Makar Sankranti")
        expect(festival_list).to_contain_text("Netaji Jayanti")
        expect(festival_list).to_contain_text("Saraswati Puja")
        expect(festival_list).to_contain_text("Republic Day")

        # Verify Panchang details
        panchang_list = page.locator("#panchang-list")
        expect(panchang_list).to_contain_text("Shukla / Krishna Paksha")

        # Verify Sunrise/Sunset Pills
        expect(page.locator("#panchang-pills")).to_contain_text("06:45 AM")

        # Verify Horoscope Grid exists
        expect(page.locator("#horoscope-grid")).to_be_visible()

        # Take a screenshot
        screenshot_path = os.path.join(os.getcwd(), "verification/calendar_verify.png")
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
