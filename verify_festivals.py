from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        time.sleep(3) # Wait for render

        # Screenshot the Festival Section
        element = page.locator("#sec-festivals")
        if element.is_visible():
            element.screenshot(path="verification/festivals_screenshot.png")
            print("Screenshot saved to verification/festivals_screenshot.png")
        else:
            print("Festival section not found or hidden.")

        browser.close()

if __name__ == "__main__":
    run()
