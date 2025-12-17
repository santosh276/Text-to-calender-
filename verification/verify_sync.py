from playwright.sync_api import sync_playwright

def verify_sync_toggles():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Serve the file directly using Python http server to avoid file:// issues if any
        # Assuming server is already running on port 8000
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for render
        page.wait_for_selector("#calendar-grid")

        # Open Settings
        page.click("button[onclick='openSettingsModal()']")

        # Wait for settings modal
        page.wait_for_selector("#settings-modal")

        # Check if toggles are present
        docs_toggle = page.locator("#toggle-sync-docs")
        github_toggle = page.locator("#toggle-sync-github")

        if docs_toggle.count() > 0:
            print("Docs Sync Toggle found")
        else:
            print("Docs Sync Toggle NOT found")

        if github_toggle.count() > 0:
            print("GitHub Sync Toggle found")
        else:
            print("GitHub Sync Toggle NOT found")

        # Take screenshot of settings modal
        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_sync_toggles()
