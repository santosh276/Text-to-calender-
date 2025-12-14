
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Load the HTML file (assuming served via python http.server on port 8000)
        await page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Input data with multiple events and specific details
        input_text = """
::: calendar
++ January 2025 ++
15 ! Alpha Festival / Beta Festival
:::

::: details
>> 15-01-2025
This is a common intro for the day.

# Alpha Festival
This is the detail for Alpha.
- Alpha Item 1
- Alpha Item 2

# Beta Festival
This is the detail for Beta.
- Beta Item 1
- Beta Item 2
:::
"""
        # Set content in editor and trigger input event
        await page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{input_text}`;
            editor.dispatchEvent(new Event('input'));
        """)

        # Wait for render (calendar grid update)
        await page.wait_for_timeout(1000)

        # Click on the 15th cell
        await page.click(".grid-cell:has-text('15')")

        # Wait for modal
        await page.wait_for_selector("#day-modal", state="visible")
        await page.wait_for_timeout(500)

        # Take screenshot of Slide 1
        await page.screenshot(path="verification/slide1.png")
        print("Screenshot slide1.png saved")

        # Click Next button
        await page.click("#modal-nav-container button:has(.fa-chevron-right)")

        await page.wait_for_timeout(500)

        # Take screenshot of Slide 2
        await page.screenshot(path="verification/slide2.png")
        print("Screenshot slide2.png saved")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
