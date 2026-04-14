import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading

PORT = 8085
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1024, 'height': 800})
        page = await context.new_page()

        await page.goto(f'http://localhost:{PORT}/ai tex to calnder.html')
        await page.evaluate("toggleView('more')")

        # Focus on the search input
        await page.locator('input[placeholder="Search tools..."]').focus()

        # Hide animations and wait briefly
        await page.add_style_tag(content="* { animation: none !important; }")
        await page.locator('#editor-panel').evaluate("el => el.style.display = 'none'")
        await page.wait_for_timeout(500)

        await page.screenshot(path='search_focus_fixed.png')
        await browser.close()

asyncio.run(main())
