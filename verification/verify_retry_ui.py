
import os
import time
from playwright.sync_api import sync_playwright

def verify_retry_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for page to load a bit
        page.wait_for_load_state("networkidle")

        # Manually trigger showRetryUI to ensure it renders with the new icons
        page.evaluate("""
            () => {
                let loader = document.getElementById('app-loader');
                if (!loader) {
                    loader = document.createElement('div');
                    loader.id = 'app-loader';
                    document.body.appendChild(loader);
                }
                // Ensure showRetryUI is available
                if (typeof showRetryUI === 'function') {
                    showRetryUI(loader);
                } else {
                    console.error('showRetryUI function not found');
                    document.body.innerHTML = '<h1>Error: showRetryUI not found</h1>';
                }
            }
        """)

        # Wait for animation/render
        page.wait_for_timeout(1000)

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/retry_ui.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        # Verify content exists
        content = page.content()
        if '<svg' in content and 'Connection Failed' in content:
             print("Verified: SVGs are present in the DOM.")
        else:
             print("Failed: SVGs or 'Connection Failed' text not found.")

        browser.close()

if __name__ == "__main__":
    verify_retry_ui()
