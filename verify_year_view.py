import os
import sys
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Load the HTML file
        # Using a file URL or starting a local server
        # Since I'm in the root, and the file is in root
        cwd = os.getcwd()
        file_path = os.path.join(cwd, 'ai tex to calnder.html')
        file_url = f'file://{file_path}'

        print(f"Loading {file_url}...")
        await page.goto(file_url)

        # Wait for the app to initialize
        await page.wait_for_timeout(1000)

        # Switch to Year View
        print("Switching to Year View...")
        # Check if button is visible, it might be hidden if not initialized properly or if loaded in mobile view?
        # The navbar should be visible.
        await page.click('#btn-year-view')

        # Wait for transition
        await page.wait_for_timeout(1000)

        # Verify Year Grid is visible
        year_grid = await page.query_selector('#year-grid')
        if year_grid:
            print("Year Grid found.")
        else:
            print("Year Grid NOT found.")
            sys.exit(1)

        # Check for month cards
        cards = await page.query_selector_all('#year-grid > div')
        print(f"Found {len(cards)} month cards.")

        if len(cards) == 0:
            print("No month cards rendered.")
            sys.exit(1)

        # Inspect first card
        first_card = cards[0]
        html = await first_card.inner_html()
        print("First card HTML content preview:")
        print(html[:200]) # Print first 200 chars

        # Check for specific classes added
        class_attr = await first_card.get_attribute('class')
        print(f"Card classes: {class_attr}")

        if "hover:shadow-lg" in class_attr and "hover:-translate-y-1" in class_attr:
            print("New hover classes verified.")
        else:
            print("New hover classes MISSING.")

        # Check for Today highlight (if any)
        # We need to find a day with today's date highlighted
        today_highlights = await page.query_selector_all('.bg-orange-500.text-white.rounded-full')
        if today_highlights:
             print(f"Found {len(today_highlights)} 'Today' highlights.")
        else:
             print("No 'Today' highlights found (this is expected if today is not in the data or if logic is wrong).")

        # Take screenshot
        os.makedirs('verification', exist_ok=True)
        screenshot_path = 'verification/year_view.png'
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
