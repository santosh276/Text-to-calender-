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

        # Verify Title Update
        editor = await page.query_selector('#editor')
        editor_value = await editor.input_value()
        if "Vaidik Calendar" in editor_value:
            print("SUCCESS: Title updated to 'Vaidik Calendar'.")
        else:
            print("FAILURE: Title update mismatch.")

        # Verify Button Classes
        btn = await page.query_selector('#btn-year-view')
        classes = await btn.get_attribute('class')
        print(f"Button Classes: {classes}")

        if "text-xs" in classes and "md:text-sm" in classes:
            print("SUCCESS: Button classes updated for responsiveness.")
        else:
            print("FAILURE: Button classes mismatch.")

        # Take screenshot
        os.makedirs('verification', exist_ok=True)
        screenshot_path = 'verification/verify_title_and_btn.png'
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
