import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # use full page screenshot
        page = await browser.new_page(viewport={'width': 800, 'height': 2000})
        # file url
        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        await page.goto(file_url)
        # click on "More" tab to show more view
        await page.evaluate("toggleView('more')")
        await page.wait_for_timeout(1000)
        # take screenshot of the whole page
        await page.screenshot(path='full_page_more.png', full_page=True)
        await browser.close()

asyncio.run(main())
