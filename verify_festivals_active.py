from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        time.sleep(3) # Wait for render

        # Click a filter button to make it active (it starts inactive/all by default in code, or remembers? Code says currentIsolationFilter = null initially)
        # We need to click one to see the active state ring.

        # Click the "Festivals" button (red)
        fest_btn = page.locator("button.filter-btn.bg-red-600")
        if fest_btn.is_visible():
            fest_btn.click()
            time.sleep(1) # Wait for transition

        # Screenshot the Festival Section
        element = page.locator("#sec-festivals")
        if element.is_visible():
            element.screenshot(path="verification/festivals_active_screenshot.png")
            print("Screenshot saved to verification/festivals_active_screenshot.png")
        else:
            print("Festival section not found or hidden.")

        browser.close()

if __name__ == "__main__":
    run()
