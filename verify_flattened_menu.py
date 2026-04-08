import sys
from playwright.sync_api import sync_playwright
import time
import socket
import http.server
import socketserver
import threading
import os

PORT = 0

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve from the current working directory
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def start_server():
    global PORT
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", 0), Handler)
    PORT = httpd.server_address[1]
    print(f"Serving at port {PORT}")
    httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

time.sleep(1) # Wait for server to start

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Desktop site style
    context = browser.new_context(
        viewport={'width': 1024, 'height': 800},
        has_touch=True,
        is_mobile=True,
    )
    page = context.new_page()
    page.goto(f'http://localhost:{PORT}/ai%20tex%20to%20calnder.html')

    # Wait for the main UI
    page.wait_for_selector('#month-view-container', state='visible', timeout=10000)

    # Click More tab via evaluated JS
    page.evaluate("toggleView('menu')")

    # Wait for menu view to be visible
    page.wait_for_selector('#app-menu-view:not(.hidden)', state='visible')

    time.sleep(2) # Give it time to fully render

    # Capture full page screenshot
    screenshot_path = "test_menu_flattened.png"
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"Screenshot saved to {screenshot_path}")

    browser.close()
