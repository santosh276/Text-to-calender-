import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os

PORT = 8003
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

        await page.evaluate("""() => {
            const editor = document.getElementById('editor-panel');
            if(editor) editor.style.display = 'none';
            toggleView('festivals');
        }""")

        # Now mock some festivals so the grid gets populated!
        await page.evaluate("""() => {
            appState.monthsData = [{
                year: 2026,
                month: 3,
                events: [
                    { symbol: '!', date: 6, engName: 'Test Festival Today' },
                    { symbol: '*', date: 16, engName: 'Test Festival 10 Days' }
                ]
            }];
            appState.details = {};
            appState.recurringDetails = {};
            renderAppFestivalView();
        }""")

        await page.wait_for_timeout(2000)

        await page.screenshot(path="festival_grid_verification3.png", full_page=True)
        await browser.close()

asyncio.run(verify())
