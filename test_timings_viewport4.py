from playwright.sync_api import sync_playwright
import os
import sys

def test_timings_view():
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

        filepath = os.path.abspath('ai tex to calnder.html')
        page.goto(f"file://{filepath}")

        print("Page loaded.")

        # Inject script to set up appState config and call geolocation correctly
        page.evaluate('''() => {
            if(window.appState && window.appState.config) {
                window.appState.config.location = { lat: 28.6139, lng: 77.2090, name: "New Delhi" };
            }
            if(window.render) window.render();
            console.log(document.getElementById('sec-timings').classList.toString());
            console.log(document.getElementById('sec-timings').innerHTML);
        }''')

        page.wait_for_timeout(1000)

        for msg in page.context.pages[0].evaluate('() => window.consoleMessages || []'):
            print("Console:", msg)

        timings_btn = page.locator("#nav-btn-timings")
        if not timings_btn.is_visible():
            print("Error: Timings button is not visible in mobile bottom nav.")
            sys.exit(1)

        print("Timings button found. Clicking...")
        timings_btn.click()

        page.wait_for_timeout(1000)

        timings_container = page.locator("#timings-view-container")
        month_container = page.locator("#month-view-container")
        sec_timings = page.locator("#sec-timings")

        print("Classes on sec-timings:", sec_timings.get_attribute("class"))

        if not timings_container.is_visible():
            print("Error: timings-view-container is not visible.")
            sys.exit(1)

        if month_container.is_visible():
            print("Error: month-view-container should be hidden.")
            sys.exit(1)

        if not sec_timings.is_visible():
            print("Error: sec-timings content is not visible.")
            sys.exit(1)

        print("Success! Timings view rendered correctly.")

        page.screenshot(path="screenshot.png")
        print("Screenshot saved to screenshot.png")

        browser.close()

if __name__ == "__main__":
    test_timings_view()
