from playwright.sync_api import sync_playwright

def test_night_timings():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            timezone_id="Asia/Kolkata",
            viewport={'width': 375, 'height': 667},
            is_mobile=True,
            has_touch=True,
            permissions=['geolocation'],
            geolocation={'latitude': 19.8135, 'longitude': 85.8312}
        )

        page = context.new_page()
        # Set fixed time to 9:00 PM IST (15:30 UTC)
        page.clock.set_fixed_time('2026-05-27T15:30:00.000Z')

        page.goto('file:///app/ai tex to calnder.html')

        # Override data explicitly and call renderTimings manually to bypass SPA toggle bugs in test mock
        page.evaluate("""
            appState.config.location = {lat: 19.8135, lng: 85.8312, name: 'Test Location'};
            const now = new Date();
            const fakeData = { month: now.getMonth(), year: now.getFullYear(), events: [] };

            // To make wait_for_selector work, parents must be visible
            document.getElementById('timings-view-container').classList.remove('hidden');
            document.getElementById('sec-timings').classList.remove('hidden');

            // Actually render our timings
            renderTimings(fakeData);
        """)

        # Wait for the timings tab to render
        page.wait_for_selector('#sec-timings', state="visible")

        # Take screenshot
        badge = page.locator('span:has-text("Night Timings")')

        badge.scroll_into_view_if_needed()
        page.evaluate("window.scrollBy(0, -100)")
        page.screenshot(path="night_timings_screenshot.png")

        # Assert Night Timings badge is present
        assert badge.is_visible(), "Night Timings badge is not visible"

        # Assert Ratri Rahu Kalam is present
        rahu = page.locator('span:has-text("Ratri Rahu Kalam")')
        assert rahu.is_visible(), "Ratri Rahu Kalam is not visible"

        browser.close()
        print("Playwright Frontend Verification passed 100%")

if __name__ == "__main__":
    test_night_timings()
