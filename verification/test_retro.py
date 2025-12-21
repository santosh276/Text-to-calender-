from playwright.sync_api import sync_playwright
import time

def verify_retro_view():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the editor to load and app to initialize
        page.wait_for_selector("#editor")

        # Give some time for the auto-render to kick in
        time.sleep(2)

        # Check if the retro container is present
        retro_view = page.locator("#retro-calendar-view")

        if retro_view.count() == 0:
            print("Retro view not found initially. Typing in editor to trigger render...")
            # Type something to trigger input event
            page.fill("#editor", " ")
            page.keyboard.press("Backspace")
            time.sleep(2)

        # Wait for retro view
        page.wait_for_selector("#retro-calendar-view", state="visible", timeout=10000)

        # Screenshot the preview container
        preview = page.locator("#preview-container")
        preview.screenshot(path="verification/retro_calendar_preview.png")

        print("Screenshot saved to verification/retro_calendar_preview.png")
        browser.close()

if __name__ == "__main__":
    verify_retro_view()
