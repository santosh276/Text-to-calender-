import os
import time
from playwright.sync_api import sync_playwright

def test_nav_icons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 375, 'height': 667},
            geolocation={'longitude': 77.2090, 'latitude': 28.6139},
            permissions=['geolocation']
        )

        # Bypass geolocation onboarding popup
        context.add_init_script("window.localStorage.setItem('hasDismissedLocationPrompt', 'true'); window.localStorage.setItem('onboardingComplete', 'true');")

        page = context.new_page()
        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_path)

        page.wait_for_selector('.app-container')
        time.sleep(1)

        test_content = "::: config\n@ Nav Icon Calendar : ![Icon](https://example.com/cal.png)\n:::"
        page.evaluate(f"document.getElementById('editor').value = `{test_content}`")
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }))")

        time.sleep(2)  # Wait for debounce and render

        custom_icon = page.locator('#mobile-bottom-nav img.custom-nav-icon')
        if custom_icon.count() > 0 and custom_icon.first.is_visible():
            print("Playwright Frontend Verification passed 100%. custom-nav-icon is visible.")
            assert custom_icon.first.get_attribute("src") == "https://example.com/cal.png"
            # Ensure the original SVG is hidden
            original_icon = page.locator('#nav-btn-calendar svg.fa-calendar')
            assert not original_icon.is_visible(), "Original SVG should be hidden"
        else:
            print("Playwright Frontend Verification failed. custom-nav-icon is NOT visible.")
            # debug info
            print(page.locator('#mobile-bottom-nav').inner_html())
            raise AssertionError("custom-nav-icon not visible")

        browser.close()

if __name__ == "__main__":
    test_nav_icons()
