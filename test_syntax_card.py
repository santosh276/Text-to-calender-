from playwright.sync_api import sync_playwright
import os

def test_syntax_card():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_path)

        page.wait_for_selector('#editor-panel', state='visible')

        # Clear out editor to start fresh for easy assertion
        page.fill('#editor', '')

        # Open Modal
        page.click("button:has-text('Add Custom Card')")
        page.wait_for_selector('#custom-card-modal', state='visible')

        # Fill Form
        test_title = "Syntax Card Title"
        page.fill('#custom-card-title', test_title)
        page.fill('#custom-card-desc', "Description text")
        page.fill('#custom-card-image', "https://example.com/img.jpg")
        page.fill('#custom-card-link', "https://example.com/mylink")
        page.fill('#custom-card-color', "#123456")

        # Submit
        page.click("button:has-text('Add Card')")
        page.wait_for_selector('#custom-card-modal', state='hidden')

        # Verify text was appended to editor
        editor_text = page.locator('#editor').input_value()
        if "::: More tab" not in editor_text or test_title not in editor_text:
            print("FAILED: Syntax string not correctly appended to editor.")
            print(f"Editor content: {editor_text}")
            return False
        else:
            print("Syntax correctly appended to editor.")

        # Go to 'More' view
        page.evaluate("toggleView('more')")

        # Wait for rendering to complete
        page.wait_for_selector('h2:has-text("Discover Popular Tools")')

        # Check if the card link rendered in UI
        card = page.locator('a[href="https://example.com/mylink"]')
        try:
            card.wait_for(state='visible', timeout=5000)
            print("Card found in the UI rendered from syntax!")

            # Additional Check: Color was parsed and applied
            inner_div = card.locator('div.rounded-xl').first
            bg_color = inner_div.evaluate("el => window.getComputedStyle(el).backgroundColor")
            # #123456 -> rgb(18, 52, 86)
            if "rgb(18, 52, 86)" in bg_color:
                print("Color parsed and applied successfully.")
            else:
                print(f"FAILED: Color parsed incorrectly. Expected rgb(18, 52, 86), got {bg_color}")
                return False

        except Exception as e:
            print("FAILED: Card not found in UI.")
            return False

        # Optional: Test reload without localstorage but with editor content persistence
        # (The editor persists via panchang_autosave_text normally)
        page.reload()
        page.wait_for_selector('#editor-panel', state='visible')
        page.evaluate("toggleView('more')")
        card = page.locator('a[href="https://example.com/mylink"]')
        try:
            card.wait_for(state='visible', timeout=5000)
            print("Card re-rendered successfully from cached editor text after reload!")
        except Exception as e:
            print("FAILED: Card did not render from cached text after reload.")
            return False

        browser.close()
        return True

if __name__ == '__main__':
    success = test_syntax_card()
    if success:
        print("TEST PASSED")
    else:
        print("TEST FAILED")
        exit(1)
