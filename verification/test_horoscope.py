
from playwright.sync_api import sync_playwright

def verify_horoscope_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Navigate to the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")

        # 2. Open "Insert Link" Modal
        page.click("text=Insert Link")
        page.wait_for_selector("#link-modal", state="visible")

        # 3. Check "Horoscope Icon" option existence in LINK MODAL
        horoscope_option = page.locator("#link-modal .radio-option:has-text('Horoscope Icon')")
        if horoscope_option.is_visible():
            print("PASS: Horoscope Icon option found in Insert Link modal.")
            horoscope_option.click()

            # 4. Check Dropdown visibility
            select_box = page.locator("#link-horoscope-select")
            if select_box.is_visible():
                print("PASS: Zodiac Sign dropdown is visible after selecting Horoscope Icon.")
            else:
                print("FAIL: Zodiac Sign dropdown is NOT visible.")
        else:
            print("FAIL: Horoscope Icon option NOT found in Insert Link modal.")

        # Screenshot of Link Modal
        page.screenshot(path="verification/link_modal.png")
        # Close modal by clicking the backdrop or the close button (top right)
        # Using evaluate to force close is easier and less brittle for icon-only buttons
        page.evaluate("closeLinkModal()")
        page.wait_for_selector("#link-modal", state="hidden")

        # 5. Open "Upload Image" (Crop Modal)
        page.evaluate("""
            openCropModal('https://via.placeholder.com/150');
        """)
        page.wait_for_selector("#crop-modal", state="visible")

        # 6. Check "Horoscope Icon" option in Crop Modal
        crop_horo_option = page.locator("#crop-modal .radio-option:has-text('Horoscope Icon')")
        if crop_horo_option.is_visible():
            print("PASS: Horoscope Icon option found in Crop Modal.")
            crop_horo_option.click()
             # 7. Check Dropdown visibility
            crop_select_box = page.locator("#crop-horoscope-select")
            if crop_select_box.is_visible():
                print("PASS: Zodiac Sign dropdown is visible in Crop Modal.")
            else:
                print("FAIL: Zodiac Sign dropdown is NOT visible in Crop Modal.")
        else:
             print("FAIL: Horoscope Icon option NOT found in Crop Modal.")

        # Screenshot of Crop Modal
        page.screenshot(path="verification/crop_modal.png")
        page.evaluate("closeCropModal()")
        page.wait_for_selector("#crop-modal", state="hidden")

        # 8. Test Insertion Logic via JS (simulating performLinkInsert)
        # We will insert a dummy icon for Aries
        print("Testing insertion logic...")
        page.evaluate("""
            insertImageToEditor('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aries_symbol_%28bold%29.svg/1200px-Aries_symbol_%28bold%29.svg.png', 'horoscope', 'Aries');
        """)

        # 9. Check if sidebar updated (Aries icon should change from star to image)
        # Wait for render
        page.wait_for_timeout(1000)

        # Find Aries button in sidebar
        aries_btn = page.locator("#horoscope-grid button:has-text('Aries')")
        if aries_btn.count() > 0:
            img = aries_btn.locator("img")
            if img.count() > 0:
                print("PASS: Aries button now contains an image.")
            else:
                print("FAIL: Aries button does not contain an image.")
        else:
            print("FAIL: Aries button not found.")

        page.screenshot(path="verification/sidebar_updated.png")

        browser.close()

if __name__ == "__main__":
    verify_horoscope_features()
