import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"
        await page.goto(file_path)

        # Click the right corner gear icon
        await page.click("button[title='Settings']")
        await page.wait_for_selector("#settings-sidebar:visible")

        # Take screenshot of open sidebar
        await page.screenshot(path="sidebar_open.png")

        await browser.close()

asyncio.run(run())
