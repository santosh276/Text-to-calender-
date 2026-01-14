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

        # Verify Icon Classes
        icon_span = await page.query_selector('#view-btn-icon')
        classes = await icon_span.get_attribute('class')
        print(f"Icon Classes: {classes}")

        if "text-xs" in classes:
            print("SUCCESS: Icon class updated to text-xs.")
        else:
            print("FAILURE: Icon class mismatch.")

        # Take screenshot
        os.makedirs('verification', exist_ok=True)
        screenshot_path = 'verification/verify_icon_xs.png'
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
