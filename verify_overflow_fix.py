import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Load the HTML file
        await page.goto("file:///app/ai tex to calnder.html")

        # Wait for app to initialize
        await page.wait_for_selector("#festival-list")

        # Inject a long Odia string to demonstrate overflow
        long_text = "This is a very long text to test wrapping behavior. It should go to the next line instead of being cut off with ellipsis. If truncated, it fails. If wrapped, it passes." * 3

        await page.evaluate(f"""
            const event = appState.monthsData[0].events[0];
            if (event) {{
                event.locName = "{long_text}";
                render();
            }} else {{
                // create dummy event if none exists
                appState.monthsData[0].events.push({{
                    date: 1,
                    symbol: '!',
                    engName: 'Test Long Text Event',
                    locName: "{long_text}"
                }});
                render();
            }}
        """)

        # Wait for render update
        await page.wait_for_timeout(1000)

        # Take screenshot of the festival list area
        festival_section = await page.query_selector("#sec-festivals")
        if festival_section:
            await festival_section.screenshot(path="festival_overflow_final.png")
            print("Screenshot saved to festival_overflow_final.png")
        else:
            print("Festival section not found!")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
