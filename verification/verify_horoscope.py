import os
from playwright.sync_api import sync_playwright

def verify_horoscope_removal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Take a screenshot of the whole page
        page.screenshot(path="verification/full_page.png", full_page=True)

        # Verify that horoscope section is not present
        # We can check if element with id 'sec-horoscope' exists (it should not)
        horoscope_section = page.query_selector("#sec-horoscope")
        if horoscope_section:
            print("FAILURE: #sec-horoscope is still present!")
        else:
            print("SUCCESS: #sec-horoscope is NOT present.")

        # Verify settings modal toggle is not present
        # Click settings button to open modal
        page.click("button[onclick='openSettingsModal()']")
        page.wait_for_timeout(500) # Wait for animation
        page.screenshot(path="verification/settings_modal.png")

        toggle = page.query_selector("#toggle-horoscope")
        if toggle:
            print("FAILURE: #toggle-horoscope is still present in settings!")
        else:
            print("SUCCESS: #toggle-horoscope is NOT present in settings.")

        browser.close()

if __name__ == "__main__":
    verify_horoscope_removal()
