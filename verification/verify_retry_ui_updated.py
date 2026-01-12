import os
from playwright.sync_api import sync_playwright

def verify_retry_ui():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the page (assuming server is running on 8000)
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Inject the Retry UI manually since we can't easily force network failure here
        # We create a dummy loader element and pass it to showRetryUI
        page.evaluate("""
            const loader = document.createElement('div');
            loader.id = 'test-loader';
            document.body.appendChild(loader);
            showRetryUI(loader);
        """)

        # Wait for UI to render
        page.wait_for_selector("text=Connection Failed")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/retry_ui_updated.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_retry_ui()
