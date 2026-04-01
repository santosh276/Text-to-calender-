from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})

        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        page.wait_for_timeout(3000)

        # Click the Festivals button in bottom nav
        page.click('.nav-btn-festivals')
        page.wait_for_timeout(1000)

        page.screenshot(path="playwright_festival_screenshot_2.png")
        print("Took screenshot of the festival view")
        browser.close()

if __name__ == "__main__":
    run()
