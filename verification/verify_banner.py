
from playwright.sync_api import sync_playwright

def verify_banner_height():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # In this specific file, we need to populate data to see the banner.
        # But wait, the banner HTML is present but hidden by default unless there is data.
        # However, we changed the classes on the container div itself.
        # We can check the computed style or just inspect the HTML structure via playwright
        # or screenshot it if we can make it visible.

        # Let's try to inject some data into the editor to make the banner appear.
        # The editor ID is 'editor'.

        editor_content = """
::: config
@ Title : Banner Verification
:::

::: calendar
++ January 2025 ++
01 * New Year
:::

::: details
>> 01-01-2025
![Banner](https://via.placeholder.com/800x200)
@ Tag : Test
:::
"""
        # Set content and trigger input event
        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{editor_content}`;
            editor.dispatchEvent(new Event('input'));
        """)

        # Wait for rendering (the banner should appear)
        page.wait_for_timeout(1000)

        # The banner container ID is 'month-banner-container'
        banner = page.locator("#month-banner-container")

        # Check if it is visible
        if banner.is_visible():
            print("Banner is visible.")

            # Take a screenshot of the banner area
            banner.screenshot(path="verification/banner_screenshot.png")
            print("Screenshot saved to verification/banner_screenshot.png")

            # Also verify the classes
            classes = banner.get_attribute("class")
            print(f"Banner classes: {classes}")

            if "aspect-[2/1]" in classes and "md:aspect-[4/1]" in classes:
                print("SUCCESS: New aspect ratio classes found.")
            else:
                print("FAILURE: New aspect ratio classes NOT found.")

        else:
            print("Banner is NOT visible. Trying to force show it for screenshot.")
            page.evaluate("document.getElementById('month-banner-container').classList.remove('hidden')")
            banner.screenshot(path="verification/banner_screenshot_forced.png")

        browser.close()

if __name__ == "__main__":
    verify_banner_height()
