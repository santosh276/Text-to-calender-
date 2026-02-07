from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to the HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Click the "Formatting Guide" button
        # It's a button with text "Formatting Guide" inside the editor panel header
        # Locator: button containing "Formatting Guide"
        guide_btn = page.get_by_role("button", name="Formatting Guide")
        guide_btn.click()

        # Wait for the guide to expand (it has transition)
        page.wait_for_timeout(1000)

        # Take a screenshot of the Syntax Guide area
        guide_el = page.locator("#syntax-guide")
        guide_el.screenshot(path="verification/guide_expanded.png")

        browser.close()

if __name__ == "__main__":
    run()
