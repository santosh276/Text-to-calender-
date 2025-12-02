from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    # Serve the file locally. Since it is a single file, we can access it directly via file protocol,
    # but the instructions suggest a server is better. However, for a single file, file:// is often enough if no complex fetching.
    # But wait, the app fetches fonts and has some local logic.
    # To be safe, I will start a python http server in background and access localhost.

    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Wait for page load
    page.wait_for_load_state("networkidle")

    # Enable the banner in settings because it might be hidden by default or require data.
    # The default data has some banner images?
    # Let"s check the editor content in the file.
    # The default editor text has "![Banner](...)"?
    # Looking at the file content I read earlier...
    # The default text in textarea has:
    # ::: details
    # >> 21-11-2025
    # @ Tag : Major Agricultural Festival
    # ...
    # No image url in the default details block in the textarea I saw?
    # Wait, I see "![Banner](https://image.url)" in the syntax guide, but in the default text:
    # ::: details
    # >> 21-11-2025
    # @ Tag : Major Agricultural Festival
    # ...
    # It does NOT have a banner image in the default text.
    # So the banner container will be hidden initially because `banners.length === 0`.

    # I need to inject some text with a banner image into the editor to make the banner appear.
    # Or I can just check the CSS classes in the DOM even if hidden?
    # But visual verification is better if visible.

    # Let"s inject data into the editor.

    # 1. Open Settings to ensure banner is enabled (it is enabled by default "isBannerDismissed = false").
    # But I need to add a banner to the current month.
    # The default month is January 2025? No, the code says:
    # findTodayIndex(); if (appState.todayIndex !== -1) appState.activeMonthIndex = appState.todayIndex;
    # So it opens the current month.
    # I should force it to a specific month or just add a banner for "today".

    # Let"s just append a banner for the current displayed month.
    # We can get the current displayed month from the header #cal-month-year.

    # Actually, simpler: overwrite the editor with known content that has a banner for a specific date in Jan 2025, and force month to Jan 2025.

    new_content = """::: config
@ Title : Test Calendar
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

    # Set editor value and trigger input
    page.evaluate(f"document.getElementById(\"editor\").value = `{new_content}`;")
    page.evaluate("document.getElementById(\"editor\").dispatchEvent(new Event(\"input\"));")

    # Force navigate to January 2025 (Month 0)
    page.evaluate("appState.activeMonthIndex = 0; render();")

    # Wait for render
    page.wait_for_timeout(1000)

    # The banner container should now be visible.
    # Selector: #month-banner-container

    banner = page.locator("#month-banner-container")
    if banner.is_visible():
        print("Banner is visible")
    else:
        print("Banner is NOT visible")

    # Take screenshot of the banner area
    banner.screenshot(path="verification/gap_screenshot.png")

    # Also take full page screenshot for context
    page.screenshot(path="verification/full_page_gap.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
