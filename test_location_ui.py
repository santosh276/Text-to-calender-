from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 400, "height": 800}) # Mobile view to trigger toast heavily

        # Load local file
        page.goto("file:///app/ai tex to calnder.html")
        page.wait_for_timeout(2000)

        # Mock global data and trigger the prompt
        page.evaluate("""
            window.LOCATION_DATA = {
                "Odisha": {
                    "Bhubaneswar": [20.2961, 85.8245]
                }
            };
            if(window.appState && window.appState.config) {
                 window.appState.config.location = null; // Ensure location is clear
            }
            window.showLocationPrompt();
        """)

        page.wait_for_timeout(1000)

        # Take screenshot of the toast
        toast = page.locator('#location-prompt-toast')
        if toast.is_visible():
            toast.screenshot(path='/tmp/toast_popup.png')
            print("Toast screenshot saved.")
        else:
            print("Toast not visible.")

        browser.close()

if __name__ == "__main__":
    verify()
