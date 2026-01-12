
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # Load the HTML file
        page.goto('file://' + os.getcwd() + '/ai tex to calnder.html')

        # Inject the Retry UI
        page.evaluate("showRetryUI(document.createElement('div')); document.body.appendChild(document.querySelector('.fixed.inset-0'));")

        # Wait for animation
        page.wait_for_timeout(500)

        # Take screenshot
        page.screenshot(path='verification/reproduce_retry_ui.png')

        browser.close()

if __name__ == '__main__':
    run()
