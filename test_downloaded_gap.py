import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    # first generate downloaded file
    # for testing, we can simulate what downloadCalendar does

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Simulate mobile chrome desktop site (has_touch=True, desktop viewport)
        context = await browser.new_context(
            viewport={'width': 1024, 'height': 800},
            has_touch=True,
            is_mobile=True,
            user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        )
        page = await context.new_page()
        # Serve the file locally or load via file://
        file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"

        # Inject window.exportedData to simulate app mode
        # By setting it before the load event or just running the same modifications
        await page.goto(file_path)

        await page.evaluate('''
            window.exportedData = {};

            const editorPanel = document.getElementById('editor-panel');
            if (editorPanel) editorPanel.style.display = 'none';
            const previewPanel = document.getElementById('preview-container');
            if (previewPanel) {
                previewPanel.className = 'w-full h-auto pb-4 px-2 pt-0 md:px-0 md:pt-0 relative z-0';
            }
            document.body.classList.remove('h-screen', 'overflow-hidden');
            document.body.classList.add('min-h-screen', 'overflow-y-auto', 'bg-[#fdfbf7]');
        ''')


        # Click the "More" menu
        await page.evaluate("toggleView('menu')")
        await page.wait_for_selector('#app-menu-view:not(.hidden)')

        # Give it a second to render
        await page.wait_for_timeout(1000)

        # Take a screenshot
        await page.screenshot(path='test_download_menu_gap_fixed.png')
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
