from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        # Use absolute path
        file_path = f"file://{cwd}/ai tex to calnder.html"
        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Wait for init
        page.wait_for_load_state("networkidle")

        # 1. Simulate App Mode: Remove Editor
        print("Removing #editor to simulate App Mode...")
        page.evaluate("if(document.getElementById('editor')) document.getElementById('editor').remove()")

        # 2. Trigger the update function
        print("Calling updateAppWithFetchedData...")
        # We need a valid structure so parseInput doesn't throw immediate errors
        # The function uses 'parseInput(cleanText)'
        dummy_content = '''::: config
@ Title : Toast Test
:::
::: calendar
++ January 2026 ++
01 * Test Event
:::'''

        # Execute via evaluate.
        # Note: updateAppWithFetchedData returns a Promise.
        page.evaluate(f"updateAppWithFetchedData(`{dummy_content}`)")

        # 3. Verify Toast
        print("Waiting for toast...")
        try:
            # The toast is appended to body with text
            toast = page.locator("text=Calendar updated from Cloud!")
            toast.wait_for(state="visible", timeout=5000)
            print("SUCCESS: Toast is visible!")
        except Exception as e:
            print(f"FAILURE: Toast did not appear. {e}")

        # Give it a moment for animation
        time.sleep(1)

        page.screenshot(path="verification/toast_check.png")
        browser.close()

if __name__ == "__main__":
    run()
