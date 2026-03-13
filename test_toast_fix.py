import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        # Mock location data
        await page.add_init_script("""
            window.localStorage.setItem('panchang_cached_state', JSON.stringify({
                config: { location: { lat: null, lng: null, name: "" } }
            }));
        """)

        await page.goto("file://" + __import__('os').path.abspath("ai tex to calnder.html"))

        # force toast to show via its internal function
        await page.evaluate("""
            window.showLocationPrompt();
        """)

        await asyncio.sleep(2) # wait for animation

        await page.screenshot(path="toast_fix.png")
        await browser.close()

asyncio.run(run())
