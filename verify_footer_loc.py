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

        # Inject 2026 Data with Local Name
        print("Injecting 2026 data with local name...")
        await page.evaluate("""() => {
            const jan2026 = {
                month: 0,
                year: 2026,
                events: [
                    { date: 13, symbol: '!', engName: "Lohri", locName: "ਲੋਹੜੀ" } // Today
                ],
                panchang: {},
                horoscope: []
            };
            appState.monthsData = [jan2026];
            appState.activeMonthIndex = 0;
            render();
        }""")

        # Switch to Year View
        print("Switching to Year View...")
        await page.click('#btn-year-view')
        await page.wait_for_timeout(500)

        # Check Footer
        cards = await page.query_selector_all('#year-grid > div')
        first_card = cards[0]

        footer = await first_card.query_selector('.animate-pulse')
        if footer:
            text = await first_card.inner_text()
            print(f"Footer Content: {text}")
            if "Lohri" in text and "ਲੋਹੜੀ" in text:
                print("SUCCESS: Local name found in footer.")
            else:
                print("FAILURE: Local name NOT found in footer.")
        else:
            print("FAILURE: Footer not found.")

        # Take screenshot
        os.makedirs('verification', exist_ok=True)
        screenshot_path = 'verification/year_view_loc_footer.png'
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
