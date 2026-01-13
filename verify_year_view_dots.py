import os
import sys
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        cwd = os.getcwd()
        file_path = os.path.join(cwd, 'ai tex to calnder.html')
        file_url = f'file://{file_path}'

        print(f"Loading {file_url}...")
        await page.goto(file_url)
        await page.wait_for_timeout(1000)

        # Inject 2026 Data for testing
        print("Injecting 2026 data...")
        await page.evaluate("""() => {
            // Create Jan 2026 data
            const jan2026 = {
                month: 0, // Jan
                year: 2026,
                events: [
                    { date: 1, symbol: '!', engName: "New Year", locName: "" },
                    { date: 13, symbol: '!', engName: "Today Event", locName: "" }, // Today
                    { date: 14, symbol: '^', engName: "Next Event", locName: "" }
                ],
                panchang: {},
                horoscope: []
            };

            // Replace or append
            appState.monthsData = [jan2026];
            appState.activeMonthIndex = 0;
            render();
        }""")

        # Switch to Year View
        print("Switching to Year View...")
        await page.click('#btn-year-view')
        await page.wait_for_timeout(500)

        # Check first card (Should be Jan 2026)
        cards = await page.query_selector_all('#year-grid > div')
        first_card = cards[0]

        # 1. Check Today Highlight (Jan 13)
        # Should have bg-orange-500 container, and NO dot (implied by design logic)
        today_cell = await first_card.query_selector("xpath=//div[contains(@class, 'bg-orange-500')]")

        if today_cell:
            print("SUCCESS: 'Today' highlight found (Orange BG).")
            text = await today_cell.inner_text()
            if text.strip() == '13':
                print("SUCCESS: Highlight is on correct day 13.")
                # Check for dot inside
                dot = await today_cell.query_selector(".w-1.h-1")
                if not dot:
                    print("SUCCESS: No dot inside Today cell (as requested).")
                else:
                    print("FAILURE: Found a dot inside Today cell!")
            else:
                print(f"FAILURE: Highlight is on day {text}, expected 13.")
        else:
            print("FAILURE: 'Today' highlight NOT found.")

        # 2. Check Event Dot (Jan 14 - Green Dot)
        # Find cell with text '14'
        # The cell itself should NOT have bg-green-100
        # It should contain a div with bg-green-500

        # We can find all cells and iterate
        cells = await first_card.query_selector_all(".grid-cols-7 > div")
        found_14 = False
        found_1 = False

        for cell in cells:
            text = await cell.inner_text()
            text = text.strip()

            if text == '14':
                found_14 = True
                cls = await cell.get_attribute('class')
                if 'bg-green-100' in cls:
                    print("FAILURE: Day 14 still has bg-green-100 class.")
                else:
                    print("SUCCESS: Day 14 container does not have bg-green-100.")

                dot = await cell.query_selector(".bg-green-500")
                if dot:
                    print("SUCCESS: Day 14 has Green Dot.")
                else:
                    print("FAILURE: Day 14 missing Green Dot.")

            if text == '1':
                found_1 = True
                dot = await cell.query_selector(".bg-red-500")
                if dot:
                    print("SUCCESS: Day 1 has Red Dot.")
                else:
                    print("FAILURE: Day 1 missing Red Dot.")

        if not found_14: print("FAILURE: Could not find cell for day 14.")
        if not found_1: print("FAILURE: Could not find cell for day 1.")

        # Take screenshot
        os.makedirs('verification', exist_ok=True)
        screenshot_path = 'verification/year_view_dots.png'
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
