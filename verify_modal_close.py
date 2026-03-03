from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Open the calendar page
        page.goto("file:///app/ai tex to calnder.html")
        page.wait_for_timeout(2000) # let JS execute and cache populate

        # Click on Day 15 to open the modal
        print("Opening Day 15 modal...")
        page.locator(".cursor-pointer.relative", has_text="15").first.click()
        page.wait_for_timeout(100) # Wait a tiny bit for render

        # Check if modal is visible
        modal_style = page.locator("#day-modal").evaluate("el => el.style.display")
        modal_class = page.locator("#day-modal").get_attribute("class")

        print(f"Modal style.display: '{modal_style}'")
        print(f"Modal hidden class present? {'modal-hidden' in modal_class}")

        # Click the close button
        print("Closing the modal by clicking backdrop...")
        page.evaluate("closeDayModal()")

        # Wait just 50ms (animation starting, should still be display flex but modal-hidden)
        page.wait_for_timeout(50)
        modal_style_mid = page.locator("#day-modal").evaluate("el => el.style.display")
        modal_class_mid = page.locator("#day-modal").get_attribute("class")
        print(f"Mid-animation display: '{modal_style_mid}', hidden class? {'modal-hidden' in modal_class_mid}")

        # Wait another 150ms (animation finished, should be display none)
        page.wait_for_timeout(150)
        modal_style_end = page.locator("#day-modal").evaluate("el => el.style.display")
        modal_class_end = page.locator("#day-modal").get_attribute("class")

        print(f"Post-animation display: '{modal_style_end}', hidden class? {'modal-hidden' in modal_class_end}")

        # Check if memory was cleared
        inner_html = page.locator("#day-modal .modal-content").evaluate("el => el.innerHTML")
        print(f"Inner HTML length after close: {len(inner_html)}")

        if len(inner_html) == 0 and modal_style_end == 'none':
            print("SUCCESS: Modal close memory clearing and animation timing executed perfectly.")
        else:
            print("ERROR: Modal close cleanup failed.")

        browser.close()

if __name__ == "__main__":
    run()
