
from playwright.sync_api import sync_playwright

def verify_sync_defaults():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate no storage
        context = browser.new_context(storage_state=None)
        page = context.new_page()

        # Load App
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")

        # Open Settings Modal
        page.click("button:has-text('Settings')")
        page.wait_for_selector("#settings-modal")

        # Check toggles
        docs_toggle = page.locator("#toggle-sync-docs")
        github_toggle = page.locator("#toggle-sync-github")

        docs_checked = docs_toggle.is_checked()
        github_checked = github_toggle.is_checked()

        print(f"Docs Toggle Checked: {docs_checked}")
        print(f"GitHub Toggle Checked: {github_checked}")

        if docs_checked or github_checked:
            print("FAIL: Toggles should be OFF by default.")
            browser.close()
            exit(1)

        page.screenshot(path="verification/sync_settings_default.png")
        print("PASS: Verified default settings.")

        browser.close()

if __name__ == "__main__":
    verify_sync_defaults()
