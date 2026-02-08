from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the HTML file directly
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Verify title
        print("Page title:", page.title())

        # Check if removed elements are absent
        upload_btn_visible = page.is_visible("text=Upload Image")
        print("Upload Image button visible:", upload_btn_visible)

        share_btn_visible = page.is_visible("#share-btn")
        print("Share button visible:", share_btn_visible)

        # Take a screenshot
        page.screenshot(path="verification/screenshot.png")

        browser.close()

if __name__ == "__main__":
    run()
