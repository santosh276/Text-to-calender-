from playwright.sync_api import sync_playwright
import os

def test_app():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        # Setup to catch JS errors
        js_errors = []
        page.on("pageerror", lambda err: js_errors.append(err))
        page.on("console", lambda msg: js_errors.append(msg.text) if msg.type == "error" else None)

        filepath = os.path.abspath('ai tex to calnder.html')
        page.goto(f'file://{filepath}')

        # Wait for the main calendar grid to render, indicating successful initial load
        page.wait_for_selector('#calendar-grid', timeout=5000)

        # Take a screenshot to verify UI visually
        page.screenshot(path='screenshot_before.png')

        print("Initial load successful. JS Errors:", js_errors)
        browser.close()

test_app()
