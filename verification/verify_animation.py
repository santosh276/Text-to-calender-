import os
import time
from playwright.sync_api import sync_playwright

def verify_animation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        filepath = os.path.join(cwd, "ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # Verify initial state
        modal = page.locator("#settings-modal")

        # Verify transition property exists
        transition = modal.evaluate("el => window.getComputedStyle(el).transition")
        print(f"Transition property: {transition}")

        # Click menu button to open (using first match)
        page.locator("button[onclick='openSettingsModal()']").first.click()

        # Wait for animation
        time.sleep(0.5)

        # Check if is-open class is added
        classes = modal.get_attribute("class")
        is_open = "is-open" in classes
        print(f"Has is-open class: {is_open}")

        # Take screenshot of open modal
        page.screenshot(path="verification/modal_open.png")
        print("Screenshot saved to verification/modal_open.png")

        # Click close button
        page.locator("button[onclick='closeSettingsModal()']").first.click()

        # Immediately check if is-open is removed
        classes_after = modal.get_attribute("class")
        if classes_after:
            is_open_after_close = "is-open" in classes_after
            print(f"Has is-open class after close: {is_open_after_close}")
        else:
            print("Classes after close: None")

        # Wait for transition (400ms) + buffer
        time.sleep(0.6)

        # Check if hidden
        is_hidden_again = modal.evaluate("el => window.getComputedStyle(el).visibility === 'hidden'")
        print(f"Closed visibility: {'hidden' if is_hidden_again else 'visible'}")

        browser.close()

if __name__ == "__main__":
    verify_animation()
