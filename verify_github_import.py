
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Route the fake GitHub raw URL to return our test content
        async def handle_github_raw(route):
            await route.fulfill(
                status=200,
                content_type="text/plain",
                body="::: config\n@ Title : GitHub Imported Calendar\n:::"
            )

        await page.route("https://raw.githubusercontent.com/user/repo/main/test.txt", handle_github_raw)

        # Navigate to the local server
        await page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Handle the prompt dialog
        page.on("dialog", lambda dialog: dialog.accept("https://github.com/user/repo/blob/main/test.txt"))

        # Click the Import GitHub button
        # It's the one with text "Import GitHub" or icon fa-github
        # Let's target by text "Import GitHub"
        await page.click("button:has-text('Import GitHub')")

        # Wait for the editor to update (polling)
        editor_handle = await page.wait_for_selector("#editor")

        # Give it a moment for the fetch and update to complete
        await page.wait_for_timeout(1000)

        content = await editor_handle.input_value()

        if "GitHub Imported Calendar" in content:
            print("SUCCESS: Editor content updated from GitHub import.")
        else:
            print(f"FAILURE: Editor content did not match. Got: {content[:100]}...")

        # Also verify toast message if possible
        # toast = await page.wait_for_selector("text=Data imported from GitHub successfully!", timeout=2000)
        # if toast:
        #     print("SUCCESS: Toast message appeared.")

        await browser.close()

asyncio.run(run())
