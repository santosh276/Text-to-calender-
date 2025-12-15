
import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the local server
        await page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Check for Import Doc button
        # It should NOT be visible
        import_doc_btn = page.locator("button:has-text('Import Doc')")
        await expect(import_doc_btn).not_to_be_visible()

        # Take screenshot of the header
        header = page.locator(".bg-black.border-b.border-gray-800")
        await header.screenshot(path="verification/verification_header.png")
        print("Screenshot taken.")

        await browser.close()

asyncio.run(run())
