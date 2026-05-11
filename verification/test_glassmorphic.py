import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Open local file
        file_path = os.path.abspath('ai tex to calnder.html').replace(' ', '%20')
        await page.goto(f'file://{file_path}')

        # Wait for rendering
        await page.wait_for_timeout(2000)

        # We also need to check the "6. SEASONS (RITU)" section, but that depends on Markdown input.
        # The #ritu-content (Current Ritu) banner should also have the same structure.

        flex_container = page.locator('.season-ui-card .flex.items-center.gap-3').first
        await flex_container.wait_for(state="visible", timeout=5000)

        icon_box = flex_container.locator('.flex.items-center.justify-center.w-9.h-9.rounded-xl.bg-white\\/20.backdrop-blur-md.border.border-white\\/30.shadow-sm.text-lg').first
        await icon_box.wait_for(state="visible", timeout=5000)

        text_span = flex_container.locator('.text-xl.font-bold.text-white.drop-shadow-lg').first
        await text_span.wait_for(state="visible", timeout=5000)

        # Capture screenshot
        await page.screenshot(path='verification/glassmorphic_emoji_box.png')
        print("Ritu emoji glassmorphic icon box implemented and verified")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
