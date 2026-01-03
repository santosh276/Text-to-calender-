from playwright.sync_api import sync_playwright
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8000/ai tex to calnder.html")

        # Wait for initialization
        time.sleep(2)

        # Inject some data into the editor to ensure sidebar renders festivals
        default_text = """
::: config
@ Title : Verification
:::

::: calendar
++ January 2025 ++
01 * New Year's Day
14 ! Makar Sankranti
26 ^ Republic Day
:::
"""
        # Set the value of the editor
        page.evaluate(f"document.getElementById('editor').value = `{default_text}`")

        # Trigger input event to parse
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'))")

        # Wait for render
        time.sleep(1)

        # Screenshot the Festival Section (Filters + List)
        # We target the festival section container
        festival_section = page.locator("#sec-festivals")
        festival_section.screenshot(path="verification/festivals_ui.png")

        print("Screenshot saved to verification/festivals_ui.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
