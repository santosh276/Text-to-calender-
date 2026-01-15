import time
import os
from playwright.sync_api import sync_playwright

def verify_clock():
    file_path = os.path.abspath("ai tex to calnder.html")
    file_url = f"file://{file_path}"
    screenshot_path = os.path.abspath("verification/font_size_verification.png")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Set viewport to capture desktop view properly
        page.set_viewport_size({"width": 1280, "height": 800})

        print(f"Loading {file_url}")
        page.goto(file_url)

        try:
            page.wait_for_selector("#month-view-container", timeout=10000)
            print("Page loaded.")
        except:
             print("Page failed to load.")
             browser.close()
             return

        # Check for UP NEXT card
        try:
            up_next_text = page.locator("text=UP NEXT").first
            up_next_text.wait_for(state="visible", timeout=5000)

            time.sleep(1)

            # The sidebar is #sec-festivals
            sidebar = page.locator("#sec-festivals")
            sidebar.screenshot(path=screenshot_path)
            print(f"[SUCCESS] Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"[FAILURE] Could not verify UI: {e}")
            page.screenshot(path="verification/failure_ui.png")

        browser.close()

if __name__ == "__main__":
    verify_clock()
