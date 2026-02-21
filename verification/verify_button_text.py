
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the HTML file
        page.goto(f"file://{os.getcwd()}/ai tex to calnder.html")

        # Wait for the editor panel where the button is
        page.wait_for_selector("#editor-panel")

        # Take a screenshot of the button group
        element = page.locator(".bg-black.border-b.border-gray-800.p-4.shrink-0.flex.flex-col.gap-3.z-50.relative.shadow-lg")
        element.screenshot(path="verification/download_button.png")

        browser.close()

if __name__ == "__main__":
    run()
