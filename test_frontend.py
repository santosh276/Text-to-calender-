import os
import time
from playwright.sync_api import sync_playwright

def test_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            permissions=['geolocation'],
            geolocation={'latitude': 28.6139, 'longitude': 77.2090} # New Delhi
        )
        page = context.new_page()

        file_path = os.path.abspath('ai tex to calnder.html')
        page.goto(f'file://{file_path}')

        # Wait for the main grid to render
        page.wait_for_selector('#calendar-grid', timeout=10000)
        time.sleep(1) # wait for language/data hydrating

        page.evaluate('''
            appState.config.location = {lat: 28.6139, lng: 77.2090, name: "New Delhi"};
            render();
        ''')

        page.wait_for_selector('#sec-timings')
        time.sleep(1)

        # Use exact locators
        day_button = page.locator('#sec-timings button:has-text("Day")').nth(0)
        night_button = page.locator('#sec-timings button:has-text("Night")').nth(0)

        assert 'bg-blue-600' in day_button.get_attribute('class'), "Day button should be active initially."
        assert 'bg-blue-600' not in night_button.get_attribute('class'), "Night button should be inactive initially."

        # Click Night button
        night_button.click()
        time.sleep(1)

        # Assert Night button is active now
        assert 'bg-blue-600' in night_button.get_attribute('class'), "Night button should be active after click."
        assert 'bg-blue-600' not in day_button.get_attribute('class'), "Day button should be inactive after click."

        # Check if timeline marker is updated to 6:00 PM
        pm_marker = page.locator('#sec-timings .timing-marker-label').nth(0)
        assert '6:00 PM' in pm_marker.inner_text(), f"Timeline marker should be 6:00 PM, got {pm_marker.inner_text()}"

        # Check if Choghadiya is rendering properly for Night
        assert page.locator('#sec-timings :text-matches("Choghadiya", "i")').count() > 0, "Night Choghadiya should be rendered."

        page.screenshot(path='screenshot_night_mode.png', full_page=True)
        print("Playwright Frontend Verification passed 100%.")

        browser.close()

if __name__ == '__main__':
    test_app()
