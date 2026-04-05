import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os

PORT = 8001
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

def start_server():
    httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        # Open local page
        await page.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")

        # Wait for initialization
        await page.wait_for_timeout(2000)

        # We need to set appState and trigger festival view rendering to check the grid
        await page.evaluate("""() => {
            toggleView('festivals');
        }""")

        await page.wait_for_timeout(2000)

        await page.screenshot(path="festival_grid_verification.png", full_page=True)
        await browser.close()

asyncio.run(verify())
