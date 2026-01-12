
import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os
import time

PORT = 8082

def start_server():
    os.chdir('.')
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def run_server_bg():
    thread = threading.Thread(target=start_server, daemon=True)
    thread.start()
    time.sleep(2)  # Give server time to start

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the page
        await page.goto(f'http://localhost:{PORT}/ai tex to calnder.html')

        # Wait for the calendar to load (header visible)
        await page.wait_for_selector('.nav-btn', state='visible')

        # Take screenshot of the header area
        header = await page.query_selector('.bg-white.rounded-3xl.shadow-xl')
        if header:
            await header.screenshot(path='verification/nav_icons_updated.png')
            print("Screenshot saved to verification/nav_icons_updated.png")
        else:
            print("Header element not found!")
            # Fallback full page
            await page.screenshot(path='verification/nav_icons_fallback.png')

        await browser.close()

if __name__ == '__main__':
    run_server_bg()
    asyncio.run(run())
