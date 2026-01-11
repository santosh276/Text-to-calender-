from playwright.sync_api import sync_playwright

def verify_enhanced_retry_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Start a simple HTTP server to serve the file
        import subprocess
        import sys

        # Start server in background
        server = subprocess.Popen([sys.executable, "-m", "http.server", "8001"], cwd=".")
        import time
        time.sleep(2)

        try:
            page.goto("http://localhost:8001/ai%20tex%20to%20calnder.html")

            # Verify resetAppConfig exists
            exists = page.evaluate("typeof window.resetAppConfig === \"function\"")
            print(f"resetAppConfig exists: {exists}")

            # Mock the loader and call showRetryUI to visualize it
            page.evaluate("""
                const loader = document.createElement("div");
                loader.id = "test-loader";
                document.body.appendChild(loader);
                showRetryUI(loader);
            """)

            # Verify both buttons exist
            retry_btn_text = page.locator("#test-loader button").first.text_content()
            reset_btn_text = page.locator("#test-loader button").last.text_content()

            print(f"First button: {retry_btn_text.strip()}")
            print(f"Second button: {reset_btn_text.strip()}")

            # Take screenshot of Enhanced Retry UI
            page.screenshot(path="verification/enhanced_retry_ui.png")

        finally:
            server.terminate()
            browser.close()

if __name__ == "__main__":
    verify_enhanced_retry_ui()
