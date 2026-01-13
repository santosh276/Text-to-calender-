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
                    { date: 13, symbol: '!', engName: "Test Festival", locName: "" },
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

        # Check Today Highlight (Jan 13 2026 should be today)
        today_highlight = await first_card.query_selector('.bg-orange-500.text-white.transform.scale-110')
        if today_highlight:
            print("SUCCESS: 'Today' highlight found for Jan 13.")
            text = await today_highlight.inner_text()
            if text.strip() == '13':
                print("SUCCESS: Highlight is on the correct day (13).")
            else:
                print(f"FAILURE: Highlight is on day {text}, expected 13.")
        else:
            print("FAILURE: 'Today' highlight NOT found.")
            # Debug: print the grid content
            grid_html = await first_card.inner_html()
            # print(grid_html)

        # Check Smart Reveal Footer
        # We added an event for Today (13th), so it should show "Today: Test Festival"
        footer = await first_card.query_selector('.animate-pulse')
        if footer:
            print("SUCCESS: Smart Reveal Footer found (Pulse animation present).")
            footer_text = await first_card.inner_text()
            if "Today" in footer_text and "Test Festival" in footer_text:
                print("SUCCESS: Footer content matches 'Today: Test Festival'.")
            else:
                print(f"FAILURE: Footer text mismatch. Got: {footer_text}")
        else:
            print("FAILURE: Smart Reveal Footer NOT found.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
