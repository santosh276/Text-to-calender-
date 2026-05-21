from playwright.sync_api import sync_playwright
import os
import sys

def test_performance():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 375, 'height': 667},
            is_mobile=True,
            has_touch=True
        )
        context.grant_permissions(['geolocation'])
        context.set_geolocation({'latitude': 28.6139, 'longitude': 77.2090})

        page = context.new_page()

        page.on("console", lambda msg: print(f"Browser console: {msg.text}") if msg.type == "error" else None)

        filepath = os.path.abspath('ai tex to calnder.html')
        page.goto(f"file://{filepath}")

        page.wait_for_timeout(1000)

        # Go to timings
        timings_btn = page.locator("#nav-btn-timings")
        if timings_btn.is_visible():
            timings_btn.click()
        else:
            print("Error: Timings button not found")
            sys.exit(1)

        page.wait_for_timeout(2000) # let timers run a bit

        # check if it's there
        timings_container = page.locator("#timings-view-container")
        if not timings_container.is_visible():
            print("Error: timings-view-container is not visible.")
            sys.exit(1)

        print("Success! Timings view opened without breaking and timers are running.")
        page.screenshot(path="screenshot_perf.png")

        browser.close()

if __name__ == "__main__":
    test_performance()
