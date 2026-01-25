import os
from playwright.sync_api import sync_playwright

def verify_syntax_guide():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Click on Formatting Guide to expand it
        guide_btn = page.locator("button:has-text('Formatting Guide')")
        guide_btn.click()

        # Wait for animation (300ms transition)
        page.wait_for_timeout(500)

        # Check if "Recurring Events" section is visible
        recurring_section = page.locator("#syntax-guide").get_by_text("Recurring Events")

        if recurring_section.is_visible():
            print("Recurring Events section found in Formatting Guide.")
        else:
            print("Recurring Events section NOT found.")

        # Take screenshot
        page.screenshot(path="verification/syntax_guide.png")

        browser.close()

if __name__ == "__main__":
    verify_syntax_guide()
