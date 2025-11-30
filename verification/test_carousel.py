from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context(viewport={"width": 1280, "height": 720})
    page = context.new_page()

    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    input_text = """
::: config
@ Title : Banner Test
:::

::: calendar
++ January 2025 ++
01 * New Year
14 ! Festival
:::

::: details
>> 01-01-2025
![Banner](https://via.placeholder.com/800x450.png?text=Test+Banner+1)
@ Tag : Test Tag
:::

::: details
>> 14-01-2025
![Banner](https://via.placeholder.com/800x450.png?text=Test+Banner+2)
@ Tag : Festival Tag
:::
"""
    page.fill("#editor", input_text)

    page.evaluate("""
        const editor = document.getElementById("editor");
        editor.dispatchEvent(new Event("input"));
    """)

    # Verify Carousel Appears
    page.wait_for_selector("#banner-carousel", state="visible")
    page.locator("#banner-carousel").screenshot(path="verification/carousel_visible.png")
    page.screenshot(path="verification/full_page_with_carousel.png")

    # Open Settings
    page.get_by_role("button", name="Settings").click()
    page.wait_for_selector("#settings-modal", state="visible")

    # Toggle Off
    # We use JS click to be 100% sure we hit the input even if styled with pseudo-elements
    page.evaluate("document.getElementById('banner-carousel-toggle').click()")

    # Close Settings
    page.click("#settings-modal button .fa-times")
    # The close button is: <button onclick="closeSettingsModal()"><i class="fa-solid fa-times"></i></button>
    # It might be safer to call closeSettingsModal directly or click the button specifically
    page.evaluate("closeSettingsModal()")

    page.wait_for_selector("#settings-modal", state="hidden")

    # Verify Carousel Hidden
    page.wait_for_selector("#banner-carousel", state="hidden")
    page.screenshot(path="verification/carousel_hidden.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
