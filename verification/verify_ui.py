import os
import time
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Construct absolute path using Python
        cwd = os.getcwd()
        file_path = f"file://{cwd}/ai tex to calnder.html"

        print(f"Navigating to: {file_path}")
        page.goto(file_path)

        # Wait for the app to load
        page.wait_for_selector("#sec-panchang", timeout=10000)

        # Inject Location (New Delhi) and trigger render
        print("Injecting location...")
        page.evaluate("""
            appState.config.location = {lat: 28.6139, lng: 77.2090, name: "New Delhi"};
            render();
        """)

        # Wait for the timeline to update (small delay to ensure render completes)
        time.sleep(2)

        # Check for Moonrise and Moonset
        print("Checking for UI elements...")

        # Use locator to be specific
        moonrise = page.locator("text=Moonrise")
        moonset = page.locator("text=Moonset")

        if moonrise.count() > 0 and moonset.count() > 0:
            print("SUCCESS: Moonrise and Moonset text found in the UI.")
        else:
            print("FAILURE: Moonrise/Moonset text NOT found.")
            # Dump content
            # print(page.content())
            exit(1)

        # Verify they are visible
        if moonrise.first.is_visible() and moonset.first.is_visible():
             print("SUCCESS: Elements are visible.")
        else:
             print("WARNING: Elements exist but might not be visible.")

        # Take screenshot
        screenshot_path = f"{cwd}/verification/verification.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_ui()
