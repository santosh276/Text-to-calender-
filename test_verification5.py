import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os

PORT = 8005
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

        # Mock festivals specifically so the first one doesn't get consumed as the ONLY hero event
        await page.evaluate("""() => {
            const t = new Date();
            appState.monthsData = [{
                year: t.getFullYear(),
                month: t.getMonth(),
                events: [
                    { symbol: '!', date: t.getDate(), engName: 'Today Fest' },
                    { symbol: '*', date: t.getDate() + 5, engName: 'Future Fest' },
                    { symbol: '*', date: t.getDate() + 10, engName: 'Another Fest' }
                ]
            }];
            appState.details = {};
            appState.recurringDetails = {};
            renderAppFestivalView();
        }""")

        await page.wait_for_timeout(2000)

        # SCROLL DOWN
        await page.evaluate("""() => {
            window.scrollTo(0, document.body.scrollHeight);
        }""")
        await page.wait_for_timeout(1000)

        await page.screenshot(path="festival_grid_verification5.png", full_page=True)
        await browser.close()

asyncio.run(verify())
