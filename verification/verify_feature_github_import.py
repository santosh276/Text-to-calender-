
import asyncio
from playwright.async_api import async_playwright, expect
import re

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen to console logs
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        # Route the fake GitHub raw URL to return our test content
        async def handle_github_raw(route):
            print(f"Intercepted fetch request to: {route.request.url}")
            await route.fulfill(
                status=200,
                content_type="text/plain",
                body="::: config\n@ Title : GitHub Imported Calendar\n:::"
            )

        # Mock the raw URL
        await page.route("https://raw.githubusercontent.com/user/repo/main/test.txt", handle_github_raw)

        # Navigate to the local server
        await page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Mock prompt
        async def handle_dialog(dialog):
            print(f"Dialog appeared: {dialog.message}")
            await dialog.accept("https://github.com/user/repo/blob/main/test.txt")

        page.on("dialog", handle_dialog)

        # Find the button and take a screenshot before clicking
        button = page.get_by_text("Import GitHub")
        await expect(button).to_be_visible()

        # Click
        print("Clicking button...")
        await button.click()

        # Wait for editor to update
        print("Waiting for editor update...")
        editor = page.locator("#editor")

        # Use to_have_value for textarea
        await expect(editor).to_have_value(re.compile("GitHub Imported Calendar"), timeout=5000)
        print("SUCCESS: Editor updated.")

        # Take screenshot of the header and editor
        await page.screenshot(path="verification/verification.png")
        print("Screenshot taken.")

        await browser.close()

asyncio.run(run())
