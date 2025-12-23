from playwright.sync_api import sync_playwright
import time

def verify_sync_toggle_visibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Scenario 1: Editor Mode (Default)
        page = browser.new_page()
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Open Settings
        page.click("button[onclick='openSettingsModal()']")
        time.sleep(0.5)

        # Check Visibility
        docs_toggle = page.locator("#container-sync-docs")
        print(f"Editor Mode - Docs Sync Visible: {docs_toggle.is_visible()}")

        page.screenshot(path="verification/scenario1_editor.png")
        page.close()

        # Scenario 2: App Mode (Simulated by removing #editor)
        page = browser.new_page()
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Remove editor element to simulate app mode
        page.evaluate("document.getElementById('editor').remove()")

        # Open Settings
        page.click("button[onclick='openSettingsModal()']")
        time.sleep(0.5)

        # Check Visibility (Should be hidden)
        docs_toggle = page.locator("#container-sync-docs")
        is_visible = docs_toggle.is_visible()
        print(f"App Mode - Docs Sync Visible: {is_visible}")

        # Assertions
        if is_visible:
            print("FAILURE: Docs Sync toggle should be hidden in App Mode")
        else:
            print("SUCCESS: Docs Sync toggle is hidden in App Mode")

        page.screenshot(path="verification/scenario2_appmode.png")
        page.close()
        browser.close()

if __name__ == "__main__":
    verify_sync_toggle_visibility()
