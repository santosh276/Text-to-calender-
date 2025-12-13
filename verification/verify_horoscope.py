from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Navigate to the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for editor to be visible
        page.wait_for_selector("#editor")

        # Check if the "Add Horoscopes" button exists
        add_horo_btn = page.get_by_role("button", name="Add Horoscopes")
        expect(add_horo_btn).to_be_visible()

        # Click the button
        add_horo_btn.click()

        # Verify the text was inserted into the editor
        # Since editor content might be large, we check if it contains the new block
        editor_val = page.locator("#editor").input_value()

        if "::: horoscope_details" in editor_val and ">> Aries" in editor_val:
            print("Horoscope template inserted successfully.")
        else:
            print("Horoscope template insertion failed.")
            print("Editor content end:", editor_val[-500:])

        # Take a screenshot of the header to show the button
        page.screenshot(path="verification/header_button.png", clip={'x': 0, 'y': 0, 'width': 500, 'height': 300})

        # Take a screenshot of the editor content (scrolled to bottom)
        page.evaluate("document.getElementById('editor').scrollTop = document.getElementById('editor').scrollHeight")
        page.screenshot(path="verification/editor_content.png")

        # Also verify the typo fix in default text
        # The default text is loaded on start if no local storage or empty.
        # Since we might have local storage from previous runs in this browser context (unlikely in headless new context but possible if reusing profile, here new context so fresh),
        # Actually, the default text is inside the HTML <textarea> tag.
        # Let's check if the text "Yoga : Indra" is present in the initial load if we reset.

        # To verify typo fix, we can check the initial value of editor before click
        # But we already clicked.

        # Let's check if the typo is fixed in the HTML source or initial value
        # We can check the text content of the textarea element in DOM
        # Note: input_value() gets current value. text_content() gets inner text.
        # Since we modified the HTML, the inner text should reflect the fix.

        # Reset page to check default content
        page.reload()
        # Clear localStorage if needed? The app loads from localStorage if available.
        page.evaluate("localStorage.clear()")
        page.reload()

        initial_val = page.locator("#editor").input_value()
        if "@ Yoga : Indra" in initial_val:
            print("Typo fix verified: '@ Yoga : Indra' found.")
        elif "3 Yoga: Indral" in initial_val:
             print("Typo fix FAILED: '3 Yoga: Indral' found.")
        else:
             print("Could not verify typo fix in default text.")

        browser.close()

if __name__ == "__main__":
    run()
