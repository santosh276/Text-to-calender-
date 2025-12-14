from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # User Case Input
        input_text = """
::: calendar
++ January 2025 ++
23 ! Saraswati Puja / Netaji Jayanti [ସରସ୍ୱତୀ ପୂଜା / ନେତାଜୀ ଜୟନ୍ତୀ]
:::
"""
        # Inject input
        page.evaluate(f"document.getElementById('editor').value = `{input_text}`")
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'))")

        # 1. Verify Sidebar splits the event (Double Date)
        # We expect two list items for the 23rd
        list_items = page.locator("#festival-list li")
        expect(list_items).to_have_count(2)

        # Verify text content of items
        print("Sidebar Items:")
        for i in range(2):
            text = list_items.nth(i).inner_text()
            print(f"- {text}")

        # Take screenshot of Sidebar
        if not os.path.exists("verification"):
            os.makedirs("verification")

        page.screenshot(path="verification/sidebar_split.png")
        print("Sidebar screenshot saved.")

        # 2. Verify Modal Swiping
        # Click the first item
        list_items.first.click()

        # Wait for modal
        expect(page.locator("#day-modal")).to_be_visible()

        # Check title
        title = page.locator("#modal-main-title").inner_text()
        print(f"Slide 1 Title: {title}")

        # Check Nav Buttons exist
        nav_buttons = page.locator("#modal-nav-container button")
        expect(nav_buttons).to_have_count(2)

        # Take screenshot of Modal
        page.screenshot(path="verification/modal_slide1.png")

        # Click Next
        nav_buttons.last.click()

        # Check title of next slide
        title2 = page.locator("#modal-main-title").inner_text()
        print(f"Slide 2 Title: {title2}")

        # Take screenshot of Slide 2
        page.screenshot(path="verification/modal_slide2.png")

        browser.close()

if __name__ == "__main__":
    run()
