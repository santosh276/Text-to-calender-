from playwright.sync_api import sync_playwright, expect
import time

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        time.sleep(2)

        # Test navigation toggle to Dharma Player
        dharma_btn = page.locator("#btn-dharma-view")

        # In Playwright, clicks might sometimes not trigger if covered. Let's force it or check visibility.
        print(f"Dharma button visible: {dharma_btn.is_visible()}")
        dharma_btn.click(force=True)
        time.sleep(2)

        # Let's see if the class "hidden" was removed
        classes = page.locator("#dharma-app-view").get_attribute("class")
        print(f"Dharma classes: {classes}")

        # Wait for dharma view
        expect(page.locator("#dharma-app-view")).to_be_visible()

        browser.close()

if __name__ == "__main__":
    run_tests()
