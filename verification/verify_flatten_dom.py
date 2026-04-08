import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Load the local HTML file
        filepath = os.path.join(os.getcwd(), 'ai tex to calnder.html')
        await page.goto(f"file://{filepath}")

        # Wait for initialization
        await page.wait_for_timeout(1000)

        # Open "More" view using JS (as testing by clicking might be tricky without rendering bounds)
        await page.evaluate("toggleView('menu')")

        # Wait for the "More" view to become visible
        await page.wait_for_selector('#app-menu-view:not(.hidden)')

        # Take a screenshot
        await page.screenshot(path="verification/flatten_dom.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
