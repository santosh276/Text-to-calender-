from playwright.sync_api import sync_playwright

def verify_all_in_one_retry():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Inject testing container and mock appState
        page.evaluate("""() => {
            document.body.innerHTML = '<div id="test-loader"></div>';
            window.appState = { config: { liveUrl: 'http://test.com' } };
        }""")

        # Call showRetryUI
        page.evaluate("showRetryUI(document.getElementById('test-loader'))")

        # Verify single button existence
        content = page.content()

        if "Retry Now" in content:
            print("SUCCESS: 'Retry Now' button text found.")
        else:
            print("FAILURE: 'Retry Now' button text NOT found.")

        if "Reset Settings" in content:
            print("FAILURE: 'Reset Settings' button still found.")
        else:
            print("SUCCESS: 'Reset Settings' button removed.")

        # Verify styling classes (approximate check)
        if "bg-gradient-to-r" in content:
            print("SUCCESS: Gradient styling found.")
        else:
            print("FAILURE: Gradient styling missing.")

        page.screenshot(path="verification/unified_retry_ui.png")
        browser.close()

if __name__ == "__main__":
    verify_all_in_one_retry()
