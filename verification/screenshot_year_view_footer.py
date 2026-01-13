import datetime
import os
import sys
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Start server to serve the file
    # We assume the server is running on port 8000
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Calculate today's date
    today = datetime.datetime.now()
    month_name = today.strftime("%B")
    year = today.year
    day = today.day

    # Construct input
    calendar_input = f"""
::: config
@ Title : Verification Calendar
:::

::: calendar
++ {month_name} {year} ++
{day:02d} ! Test Festival Today [Test Loc]
:::
"""

    print(f"Injecting input for date: {day} {month_name} {year}")

    # Inject input
    page.evaluate(f"""
        const editor = document.getElementById('editor');
        editor.value = `{calendar_input}`;
        // Trigger input event to parse
        editor.dispatchEvent(new Event('input'));
    """)

    # Wait for render (debounced 500ms)
    page.wait_for_timeout(1000)

    # Click Year View
    print("Clicking Year View...")
    page.click("button[onclick=\"toggleView('year')\"]")

    # Wait for view transition
    page.wait_for_timeout(500)

    # Take screenshot
    page.screenshot(path="verification/year_view_footer.png")
    print("Screenshot saved to verification/year_view_footer.png")

    # Clean up
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
