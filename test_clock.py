import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        await page.goto(file_url, wait_until="networkidle")

        # Check cal-indian-month
        c = await page.locator("#live-clock-time").evaluate("el => el.className")
        print("live-clock-time class:", c)

        await browser.close()

asyncio.run(run())
