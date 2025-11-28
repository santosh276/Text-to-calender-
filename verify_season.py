
from playwright.sync_api import sync_playwright

def verify_season_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load (the season card is part of the initial render)
        # We look for the season card element
        try:
            page.wait_for_selector(".season-card", timeout=5000)
            print("Season card found!")

            # Take a screenshot of the whole page, or specifically the sidebar if possible
            # The season card is in the 'panchang-list'

            # Let's take a screenshot of the sidebar area or just the season card
            season_card = page.locator(".season-card")
            season_card.screenshot(path="season_card_verification.png")
            print("Screenshot saved to season_card_verification.png")

            # Also verify text content
            season_title = page.locator(".season-title").text_content()
            print(f"Season Title: {season_title}")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_season_ui()
