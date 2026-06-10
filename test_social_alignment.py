from playwright.sync_api import sync_playwright
import os
import time

def test_social_alignment():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a desktop viewport to see the right alignment clearly
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800},
            geolocation={'latitude': 28.6139, 'longitude': 77.2090},
            permissions=['geolocation']
        )
        page = context.new_page()

        # mock geolocation using add_init_script to bypass the popup logic
        page.add_init_script('''
            navigator.geolocation.getCurrentPosition = function(success) {
                success({ coords: { latitude: 28.6139, longitude: 77.2090 } });
            };
        ''')

        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_path)

        # Inject the test data
        test_data = """::: Footer tab
Main Title: [Company]
Title: [Contact]
Hyperlink: [https://example.com/contact]

::: Social tab
Title: [Facebook]
Hyperlink: [https://facebook.com]
Image: [https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg]

::: Social tab
Title: [Twitter]
Hyperlink: [https://twitter.com]
Image: [https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg]
"""
        page.fill('#editor', test_data)
        page.evaluate('document.getElementById("editor").dispatchEvent(new Event("input", { bubbles: true }))')

        # Wait for the app container
        page.wait_for_selector('.app-container')

        # Switch to "More" tab
        page.evaluate('toggleView("more")')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Hide any popups forcefully
        page.evaluate('''
            const popups = document.querySelectorAll('.fixed');
            popups.forEach(p => {
                if(p.innerText && p.innerText.includes('location')) {
                    p.style.display = 'none';
                }
            });
        ''')

        # Verify DOM
        footer_container = page.locator('#dynamic-cards-container')

        social_wrapper = footer_container.locator('div.w-full.justify-end')

        # Ensure it exists and has the required classes
        expect_count = social_wrapper.count()
        print(f"Social wrapper count: {expect_count}")
        if expect_count == 0:
            print("Failed: social wrapper with w-full and justify-end not found.")
            exit(1)

        print("DOM verification passed: social wrapper has w-full and justify-end classes.")

        # Scroll to the social wrapper
        social_wrapper.first.scroll_into_view_if_needed()
        time.sleep(1)

        # Take a screenshot of the whole page to ensure we see the right edge
        page.screenshot(path='screenshot_footer_clean.png', full_page=True)
        print("Captured screenshot_footer_clean.png")

        browser.close()

if __name__ == "__main__":
    test_social_alignment()
