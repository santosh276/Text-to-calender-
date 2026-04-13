import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # file url
        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        await page.goto(file_url)
        # take screenshot of the red banner
        element = await page.query_selector('.bg-deep-red')
        await element.screenshot(path='banner_screenshot.png')
        await browser.close()

asyncio.run(main())
