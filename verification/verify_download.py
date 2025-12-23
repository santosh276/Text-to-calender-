from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to Editor
        print("Navigating to Editor...")
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        time.sleep(2)

        # 2. Check Editor has both toggles
        print("Checking Editor Settings...")
        page.click("button:has-text('Settings')")
        time.sleep(1)

        # Verify both toggles exist
        if page.locator("#toggle-sync-docs").count() > 0:
            print("PASS: Editor has 'Live Sync Docs' toggle.")
        else:
            print("FAIL: Editor missing 'Live Sync Docs' toggle.")

        if page.locator("#toggle-sync-github").count() > 0:
            print("PASS: Editor has 'Live Sync GitHub' toggle.")
        else:
            print("FAIL: Editor missing 'Live Sync GitHub' toggle.")

        page.screenshot(path="verification/editor_settings.png")

        # Close modal properly using the close button inside it
        # The icon is fa-times, usually inside a button
        page.click("#settings-modal button i.fa-times")
        time.sleep(1)

        # 3. Simulate Download
        print("Simulating Download...")

        # Setup download listener
        with page.expect_download() as download_info:
            page.click("button:has-text('Download HTML')")

        download = download_info.value
        path = download.path()
        print(f"Downloaded to: {path}")

        # 4. Verify Downloaded HTML content
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check logic: #toggle-sync-docs ID should be GONE
        if 'id="toggle-sync-docs"' not in content:
            print("PASS: Downloaded HTML does NOT contain 'toggle-sync-docs'.")
        else:
            print("FAIL: Downloaded HTML STILL contains 'toggle-sync-docs'.")

        # Check GitHub toggle is there
        if 'id="toggle-sync-github"' in content:
            print("PASS: Downloaded HTML contains 'toggle-sync-github'.")
        else:
            print("FAIL: Downloaded HTML missing 'toggle-sync-github'.")

        browser.close()

if __name__ == "__main__":
    run()
