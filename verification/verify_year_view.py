from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})

    # URL encoded path
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Wait for editor
    page.wait_for_selector("#editor")

    # Inject 2026 data to match system date (Jan 13 2026)
    new_content = """::: config
@ Title : Verified Calendar 2026
:::

::: calendar
++ January 2026 ++
13 ! Lohri / Bhogi
14 ^ Makar Sankranti
26 * Republic Day
:::
"""
    # Use evaluate to set value and trigger input event
    page.evaluate("""(content) => {
        const editor = document.getElementById('editor');
        editor.value = content;
        editor.dispatchEvent(new Event('input'));
    }""", new_content)

    # Wait for render (title change is a good proxy)
    page.wait_for_function("document.getElementById('app-title').innerText.includes('Verified Calendar 2026')")

    # Click Year View
    page.click("#btn-year-view")

    # Wait for grid
    page.wait_for_selector("#year-grid > div")

    # Take screenshot of whole view
    page.screenshot(path="verification/year_view_full.png")

    # Hover over the first card (January)
    # January is index 0.
    # The grid might rearrange based on screen size, but usually Jan is first.
    first_card = page.locator("#year-grid > div").nth(0)
    first_card.hover()

    # Wait for transition (500ms)
    page.wait_for_timeout(500)

    # Take screenshot of the hovered card
    first_card.screenshot(path="verification/card_hover.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
