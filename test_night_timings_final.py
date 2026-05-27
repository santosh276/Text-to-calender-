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
        # Mock time to night time 9:00 PM IST on May 27th, 2026. Setting it to 15:30:00Z makes it 21:00 IST.
        page.clock.set_fixed_time('2026-05-27T15:30:00.000Z')

        page.goto('file:///app/ai tex to calnder.html')

        page.evaluate("""
            appState.config.location = {lat: 19.8135, lng: 85.8312, name: 'Test Location'};
            const now = new Date();
            appState.activeMonthIndex = 0;
            appState.monthsData[0] = { month: now.getMonth(), year: now.getFullYear(), events: [] };
            toggleView('timings');
            render();
            // Force layout since we are manipulating the state manually
            document.getElementById('timings-view-container').classList.remove('hidden');
            document.getElementById('sec-timings').classList.remove('hidden');
        """)

        # Wait for the timings tab to render
        page.wait_for_selector('#sec-timings', state="visible")

        # Take screenshot
        badge = page.locator('span:has-text("Night Timings")')
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
