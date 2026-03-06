import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        # Load local HTML file
        await page.goto("file:///app/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load fully
        await page.wait_for_selector("#month-view")
        await page.wait_for_timeout(2000)

        # Take a screenshot of the initial state
        await page.screenshot(path="dashboard_with_red_tags.png")

        # Wait for the tags container to be visible
        try:
            await page.wait_for_selector(".texture-wrapper", timeout=5000)
            await page.locator("#festival-tag-filters button").first.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path="filtered_tags_red.png")
        except Exception as e:
            print("Tag container not found, skipping click test:", e)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
