from playwright.sync_api import sync_playwright

def verify_retry_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Start a simple HTTP server to serve the file
        import subprocess
        import sys

        # Start server in background
        server = subprocess.Popen([sys.executable, "-m", "http.server", "8000"], cwd=".")
        import time
        time.sleep(2)

        try:
            page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

            # Wait for app to load (it might be loading cache or cold start)
            # We want to check if retryAppInitialization logic exists in the code via console evaluation
            # because reproducing the network failure and "Scenario B" automatically is complex.

            # Verify the function exists
            exists = page.evaluate("typeof window.retryAppInitialization === \"function\"")
            print(f"retryAppInitialization exists: {exists}")

            # Verify showRetryUI uses the new function
            # We can mock the loader and call showRetryUI
            page.evaluate("""
                const loader = document.createElement("div");
                loader.id = "test-loader";
                document.body.appendChild(loader);
                showRetryUI(loader);
            """)

            # Check the onclick attribute of the button
            onclick_attr = page.locator("#test-loader button").get_attribute("onclick")
            print(f"Retry button onclick: {onclick_attr}")

            # Take screenshot of Retry UI
            page.screenshot(path="verification/retry_ui.png")

        finally:
            server.terminate()
            browser.close()

if __name__ == "__main__":
    verify_retry_ui()
