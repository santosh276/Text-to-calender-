from playwright.sync_api import sync_playwright

def verify_theme():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a mobile device
        iphone_13 = p.devices['iPhone 13']
        context = browser.new_context(**iphone_13)
        page = context.new_page()

        # Load the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for initialization
        page.wait_for_timeout(2000)

        # Take a screenshot of the main view (Mobile)
        page.screenshot(path="verification/mobile_theme.png")

        # Emulate Desktop to check preview panel
        context_desktop = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page_desktop = context_desktop.new_page()
        page_desktop.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page_desktop.wait_for_timeout(2000)

        # Screenshot of Desktop Editor View
        page_desktop.screenshot(path="verification/desktop_theme.png")

        browser.close()

if __name__ == "__main__":
    verify_theme()
