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

    # Check for the footer
    # We look for "Today: Test Festival Today"

    # The footer is inside the month card.
    # We can search for the text.

    try:
        footer = page.locator(f"text=Today: Test Festival Today [Test Loc]")
        footer.wait_for(state="visible", timeout=5000)
        print("Success: Footer found!")

        # Check style classes
        # The parent div should have 'animate-pulse'
        # The span should have 'text-orange-600'

        # Get the element handle
        element = footer.element_handle()
        parent = element.evaluate_handle("el => el.parentElement")
        parent_class = parent.get_attribute("class")

        if "animate-pulse" in parent_class:
            print("Success: Animation class present.")
        else:
            print(f"Failure: Animation class missing. Found: {parent_class}")

        span_class = element.get_attribute("class")
        if "text-orange-600" in span_class and "font-bold" in span_class:
             print("Success: Style classes present.")
        else:
             print(f"Failure: Style classes missing. Found: {span_class}")

    except Exception as e:
        print(f"Error: {e}")
        # Capture screenshot for debug
        page.screenshot(path="verification/failure.png")
        print("Screenshot saved to verification/failure.png")
        sys.exit(1)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
