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

        # Verify styling classes for Black Button
        if "bg-black" in content:
            print("SUCCESS: bg-black found.")
        else:
            print("FAILURE: bg-black missing.")

        if "bg-gradient-to-r" in content:
            print("FAILURE: Gradient styling still present.")
        else:
            print("SUCCESS: Gradient styling removed.")

        page.screenshot(path="verification/unified_retry_ui_black.png")
        browser.close()

if __name__ == "__main__":
    verify_all_in_one_retry()
