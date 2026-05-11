import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        file_path = os.path.abspath('ai tex to calnder.html').replace(' ', '%20')
        await page.goto(f'file://{file_path}')

        # Click the Formatting Guide toggle
        await page.click('button[onclick="toggleSyntaxGuide()"]')
        await page.wait_for_timeout(1000)

        # Verify the text exists in the DOM
        content = await page.content()
        if "@ 🌼 Vasant" in content and "@ 🏜️ Grishma" in content:
            print("Formatting Guide emojis updated successfully.")
            await page.screenshot(path="verification/guide_emojis.png", full_page=True)
        else:
            print("Failed to find updated emojis in Formatting Guide.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
