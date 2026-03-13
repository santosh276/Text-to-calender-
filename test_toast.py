import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        # Mock location data to empty to trigger the toast
        await page.add_init_script("""
            window.localStorage.setItem('panchang_cached_state', JSON.stringify({
                config: { location: { lat: null, lng: null, name: "" } }
            }));
        """)

        await page.goto("file://" + __import__('os').path.abspath("ai tex to calnder.html"))

        # Wait for the toast to be visible (it has a timeout of 5 seconds usually, let's force it)
        await page.evaluate("""
            const toast = document.getElementById('location-prompt-toast');
            if (toast) {
                toast.classList.remove('translate-y-full', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
                toast.style.transition = 'none'; // stop animation
            }
        """)

        await asyncio.sleep(1) # small delay to let UI settle

        await page.screenshot(path="toast.png")
        await browser.close()

asyncio.run(run())
