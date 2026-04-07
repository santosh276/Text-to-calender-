import threading
import http.server
import socketserver
import os
import time
from playwright.sync_api import sync_playwright

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", 8000), Handler)
    httpd.serve_forever()

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()
        page.goto('http://localhost:8000/ai%20tex%20to%20calnder.html')
        page.wait_for_selector('#mobile-bottom-nav')

        # Take a screenshot
        page.screenshot(path='mobile-bottom-nav.png', full_page=True)
        print("Screenshot saved to mobile-bottom-nav.png")

        browser.close()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1) # wait for server to start
    run_test()
