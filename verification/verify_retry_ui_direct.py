from playwright.sync_api import sync_playwright

def verify_retry_ui_direct():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Inject a testing container
        page.evaluate("""() => {
            document.body.innerHTML = '<div id="test-loader"></div>';
            // Mock appState to ensure config exists
            window.appState = { config: { liveUrl: 'http://test.com' } };
        }""")

        # Call the function
        page.evaluate("showRetryUI(document.getElementById('test-loader'))")

        # Take screenshot
        page.screenshot(path="verification/direct_retry_ui.png")

        # Assertions
        content = page.content()

        if 'id="retry-url-input"' in content:
            print("FAILURE: URL Input found in HTML.")
        else:
            print("SUCCESS: URL Input NOT found.")

        if "Retry Connection" in content:
            print("SUCCESS: Retry button found.")
        else:
            print("FAILURE: Retry button NOT found.")

        if "Reset Settings" in content:
            print("SUCCESS: Reset button found.")
        else:
            print("FAILURE: Reset button NOT found.")

        browser.close()

if __name__ == "__main__":
    verify_retry_ui_direct()
