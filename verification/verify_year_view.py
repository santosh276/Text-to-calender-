from playwright.sync_api import sync_playwright
import datetime

def verify_year_view():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Load the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for app to load
        page.wait_for_selector("#app-title")

        # Get current date to ensure we match the system date
        now = datetime.datetime.now()
        month_name = now.strftime("%B")
        year = now.year
        day = now.day

        # Inject data for CURRENT month/year so "Today" logic triggers
        new_data = f"""::: config
@ Title : Verification 2026
:::

::: calendar
++ {month_name} {year} ++
{day} ! Verification Day [ପରୀକ୍ଷା ଦିବସ]
:::
"""
        print(f"Injecting data for {day} {month_name} {year}")

        # Use evaluate to set value and dispatch event
        page.evaluate(f"const e = document.getElementById('editor'); e.value = `{new_data}`; e.dispatchEvent(new Event('input'));")

        # Wait a bit for processing
        page.wait_for_timeout(1000)

        # Click "Year View" button
        page.click("#btn-year-view")

        # Wait for Year Grid
        page.wait_for_selector("#year-grid")

        # Wait for cards
        page.wait_for_selector(".bg-white.rounded-2xl")

        # Find the card for the current month (index should be now.month - 1)
        # But since we only injected ONE month of data, the logic might only show that one?
        # renderYearView loops 0 to 11.
        # It finds monthData if exists.

        # Screenshot full view
        page.screenshot(path="verification/year_view_full.png")

        # Find the card with "Verification Day" in footer
        # The footer text is "Today: Verification Day [ପରୀକ୍ଷା ଦିବସ]"
        footer_locator = page.locator("text=Today: Verification Day")
        if footer_locator.count() > 0:
            print("Found Today footer!")
            # Screenshot the card containing the footer
            card = footer_locator.first.locator("xpath=../..") # Parent of footer is card
            card.screenshot(path="verification/year_view_card_with_footer.png")
        else:
            print("Today footer NOT found.")
            # Screenshot the Jan card anyway (first card)
            page.locator("#year-grid > div").nth(now.month - 1).screenshot(path="verification/target_month_card.png")

        browser.close()

if __name__ == "__main__":
    verify_year_view()
