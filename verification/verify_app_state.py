from playwright.sync_api import sync_playwright

def verify_app_state():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the locally served file
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the app to initialize (check for app title or calendar grid)
        page.wait_for_selector("#app-title")

        # Check window.appState
        app_state_defined = page.evaluate("typeof window.appState !== 'undefined'")
        print(f"window.appState defined: {app_state_defined}")

        if app_state_defined:
            # Check version in appState if it was loaded from cache (though we might have cleared it or it might be fresh)
            # Actually, we can check if it matches the structure we expect
            is_object = page.evaluate("typeof window.appState === 'object'")
            print(f"window.appState is object: {is_object}")

            # Check if DATA_VERSION is defined (it's a const, so not on window, but we can try to evaluate it directly)
            # If the script threw an error, page load might have failed or console errors would be present.
            # We can check console logs.

            data_version = page.evaluate("DATA_VERSION")
            print(f"DATA_VERSION: {data_version}")

        # Take a screenshot to verify UI rendered
        page.screenshot(path="verification/app_state_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_app_state()
