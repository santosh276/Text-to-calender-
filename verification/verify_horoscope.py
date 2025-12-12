
from playwright.sync_api import sync_playwright

def verify_horoscope_icon(page):
    # Load the page from local server
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for the page to load
    page.wait_for_selector("#editor")

    # We need to simulate uploading an image or finding an existing one.
    # But since we can't easily upload a file in headless mode without a file on disk,
    # and we want to verify the CSS changes for 'horoscope' specifically.

    # We can inject a custom horoscope configuration into the editor.
    # The default content has:
    # ::: horoscope
    # ~ Aries : New beginnings are favored.
    # ...

    # We want to test the 'horoscope_details' with an icon, which triggers the image rendering.
    # Or 'horoscope' block with custom icon if that's supported.
    # Actually, the code renders horoscope grid from 'data.horoscope'.
    # And it checks 'appState.horoscopeDetails[signKey].icon'.

    # So we need to add a horoscope_details block with an icon.
    # We can use a dummy image URL (placeholder).

    new_content = """
::: config
@ Title : Verification
:::

::: calendar
++ January 2025 ++
01 * New Year
:::

::: horoscope_details
>> Aries
@ Icon : ![Aries Icon](https://via.placeholder.com/150)
@ Element : Fire
:::

::: horoscope
~ Aries : Test Horoscope
:::
"""

    # Set the editor content
    page.evaluate(f"document.getElementById('editor').value = `{new_content}`;")

    # Trigger input event to parse
    page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'));")

    # Wait for render
    page.wait_for_timeout(1000)

    # Locate the horoscope grid item for Aries
    # It should be in #horoscope-grid
    aries_btn = page.locator("#horoscope-grid button").first

    # Check if image is present
    img = aries_btn.locator("img")
    if img.count() > 0:
        print("Image found in horoscope button.")

        # Take a screenshot of the horoscope section
        page.locator(".glass.border-purple-600").screenshot(path="verification/horoscope_card.png")

        # Verify CSS classes using evaluation
        class_attr = img.get_attribute("class")
        print(f"Image classes: {class_attr}")

        if "w-12" in class_attr and "h-12" in class_attr and "object-contain" in class_attr:
            print("CSS classes verified.")
        else:
            print("CSS classes MISSING or incorrect.")

    else:
        print("Image NOT found in horoscope button.")
        page.screenshot(path="verification/full_page_fail.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_horoscope_icon(page)
        finally:
            browser.close()
