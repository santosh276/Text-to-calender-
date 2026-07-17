from playwright.sync_api import sync_playwright
import os
import time

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            geolocation={'longitude': 77.2090, 'latitude': 28.6139},
            permissions=['geolocation'],
            viewport={'width': 375, 'height': 667}
        )
        context.add_init_script("window.localStorage.setItem('hasDismissedLocationPrompt', 'true'); window.localStorage.setItem('onboardingComplete', 'true');")
        page = context.new_page()

        file_path = f"file://{os.getcwd()}/ai tex to calnder.html"
        page.goto(file_path)

        # Wait for the app container to load
        page.wait_for_selector('.app-container')
        time.sleep(1) # Let initial rendering complete

        # Insert config payload into the editor
        payload = "::: config\n@ Nav Icon Calendar : ![Icon](https://example.com/cal.png)\n:::"
        page.fill('#editor', payload)

        # Trigger input event to re-render
        page.evaluate("() => { const editor = document.getElementById('editor'); editor.dispatchEvent(new Event('input', { bubbles: true })); }")

        # Wait for render to potentially complete
        time.sleep(2)

        # Verify the custom nav icon is present and visible in the mobile bottom nav
        try:
            icon = page.locator('#mobile-bottom-nav .custom-nav-icon')
            icon.wait_for(state='visible', timeout=5000)
            src = icon.get_attribute('src')
            if "example.com/cal.png" in src:
                print("Playwright Frontend Verification passed 100%")
            else:
                print(f"Failed: Icon src is {src}")
        except Exception as e:
            print("Playwright Frontend Verification failed:", e)

        browser.close()

run_test()
