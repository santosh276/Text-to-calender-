from playwright.sync_api import sync_playwright

def verify_location_modal():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        # Create a mobile context
        context = browser.new_context(
            viewport={'width': 360, 'height': 800},
            user_agent='Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
        )
        page = context.new_page()

        # Load the local HTML file
        page.goto("file:///app/ai%20tex%20to%20calnder.html")

        # Wait for everything to settle
        page.wait_for_timeout(1000)

        # Evaluate JS to open the modal
        page.evaluate("openLocationModal()")

        # Wait a bit for transition
        page.wait_for_timeout(500)

        # Take a screenshot
        page.screenshot(path="location_modal_mobile_padded.png", full_page=True)

        print("Screenshot saved to location_modal_mobile_padded.png")
        browser.close()

if __name__ == "__main__":
    verify_location_modal()
