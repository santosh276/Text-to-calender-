
import os
import sys
import asyncio
from playwright.async_api import async_playwright

# Ensure we can import modules if needed
sys.path.append(os.getcwd())

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Mobile viewport (iPhone SE size)
        context = await browser.new_context(
            viewport={'width': 375, 'height': 667},
            device_scale_factor=2
        )
        page = await context.new_page()

        # Determine the file path
        file_path = os.path.abspath("ai tex to calnder.html")
        url = f"file://{file_path}"

        print(f"Navigating to {url}")
        await page.goto(url)

        # Wait for the month element (part of the new header)
        try:
            await page.wait_for_selector("#cal-month", state="visible", timeout=5000)
            await page.wait_for_selector("#cal-year", state="visible", timeout=5000)
        except Exception as e:
            print(f"Warning: {e}")

        # Capture screenshot of the header area
        # The new header has class .bg-white.rounded-3xl.shadow-sm
        # It is inside #preview-container

        # We can locate it by the specific new structure
        header = page.locator("#preview-container .bg-white.rounded-3xl").first

        if await header.count() > 0:
            await header.screenshot(path="header_mobile.png")
            print("Screenshot saved to header_mobile.png")
        else:
            print("Header not found, screenshotting page")
            await page.screenshot(path="full_page_debug.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
