from playwright.sync_api import sync_playwright
import os
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Simulate mobile view
    context = browser.new_context(viewport={'width': 390, 'height': 844},
                                  is_mobile=True,
                                  has_touch=True)
    page = context.new_page()

    file_path = f"file://{os.path.abspath('ai tex to calnder.html').replace(' ', '%20')}"
    page.goto(file_path)

    page.wait_for_selector('#ritu-content', timeout=5000)

    # Hide editor panel to simulate mobile layout correctly
    page.evaluate("document.getElementById('editor-panel').style.display = 'none';")
    page.evaluate("document.getElementById('preview-container').className = 'w-full h-full';")

    # Give it time to render the dynamic colors
    time.sleep(2)

    # Take screenshot of the ritu section
    page.screenshot(path="ritu_test_mobile.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
