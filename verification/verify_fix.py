
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # Load the HTML file
        page.goto('file://' + os.getcwd() + '/ai tex to calnder.html')

        # Inject the Retry UI
        # We assign the div to a variable first to ensure we pass a Node to appendChild
        page.evaluate("""
            const loader = document.createElement('div');
            loader.id = 'manual-loader';
            showRetryUI(loader);
            document.body.appendChild(loader);
        """)

        # Wait for animation
        page.wait_for_timeout(500)

        # Take screenshot of the retry card specifically
        # We target the one that we just appended, which has z-[200]
        card = page.locator('#manual-loader > div')
        card.screenshot(path='verification/retry_ui_fixed.png')

        browser.close()

if __name__ == '__main__':
    run()
