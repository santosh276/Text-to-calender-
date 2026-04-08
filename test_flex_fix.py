import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os

PORT = 0
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    global PORT
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", 0), Handler) as httpd:
        PORT = httpd.server_address[1]
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

async def main():
    # Start the local server in a separate thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Wait a brief moment to ensure the server is up and port is assigned
    await asyncio.sleep(1)

    async with async_playwright() as p:
        # Simulate iPad Pro viewport dimensions (1024x1366) to test the mobile desktop site edge case
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1024, 'height': 1366})
        page = await context.new_page()

        # Navigate to the local page
        await page.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")

        # Wait for the page to be somewhat loaded
        await page.wait_for_selector('body')

        # Programmatically open the menu view
        await page.evaluate("toggleView('menu')")

        # Wait for the menu view to not be hidden
        await page.wait_for_selector('#app-menu-view:not(.hidden)')

        # Take a screenshot to verify there is no massive stretching
        await page.screenshot(path="verify_spacing_simulated_desktop_site.png", full_page=True)

        await browser.close()
        print("Verification completed and screenshot saved as verify_spacing_simulated_desktop_site.png")

asyncio.run(main())
