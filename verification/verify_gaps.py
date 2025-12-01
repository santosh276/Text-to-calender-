
from playwright.sync_api import sync_playwright

def verify_banner_gaps():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        editor_content = """
::: config
@ Title : Gap Verification
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

            # Take a screenshot of the banner area including surroundings
            # We want to capture the header, banner, and top of grid
            # Let's locate the parent container
            parent = page.locator("#preview-container .flex-grow.lg\\:w-3\\/4")

            parent.screenshot(path="verification/banner_gaps.png")
            print("Screenshot saved to verification/banner_gaps.png")

            # Verify the class removal
            classes = banner.get_attribute("class")
            print(f"Banner classes: {classes}")

            if "mb-6" not in classes:
                print("SUCCESS: 'mb-6' removed from banner.")
            else:
                print("FAILURE: 'mb-6' still present.")

            # Verify parent space-y
            parent_classes = parent.get_attribute("class")
            print(f"Parent classes: {parent_classes}")
            if "space-y-3" in parent_classes:
                print("SUCCESS: Parent has 'space-y-3'.")
            else:
                print("FAILURE: Parent does not have 'space-y-3'.")

        else:
            print("Banner is NOT visible. Cannot verify.")

        browser.close()

if __name__ == "__main__":
    verify_banner_gaps()
