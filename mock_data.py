import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        await page.goto("file:///app/ai%20tex%20to%20calnder.html")
        await page.wait_for_timeout(2000)

        await page.evaluate("""() => {
            const val = `::: config
@ Title : Vaidik Calendar
@ Location : New Delhi
:::
::: calendar
++ January 2026 ++
01 * New Year's Day
14 ! Makar Sankranti
26 * Republic Day
:::
::: details
>> 14-01-2026
## tag : Major Festival, Public Holiday, Holiday
# Significance
Some text`;
            document.getElementById('editor').value = val;
            window.parseInput(val);
            window.render();
        }""")

        try:
            await page.wait_for_selector(".texture-transition, #festival-tag-filters", timeout=10000)
            await page.wait_for_timeout(2000)

            await page.screenshot(path="dashboard_with_red_tags.png")
        except Exception as e:
            print("Tag container not found, taking raw screenshot:", e)
            await page.screenshot(path="error_dashboard.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
