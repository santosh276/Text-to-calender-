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

        # Test default load
        time.sleep(1)
        print("Checking default state (should be calendar)...")
        page.screenshot(path='mobile-bottom-nav-default.png', full_page=True)

        # Test clicking festivals
        print("Clicking festivals...")
        page.click('#nav-btn-festivals', force=True)
        time.sleep(1)
        page.screenshot(path='mobile-bottom-nav-festivals.png', full_page=True)

        # Test clicking back to calendar
        print("Clicking calendar...")
        page.locator('#mobile-bottom-nav button').nth(0).click(force=True)
        time.sleep(1)
        page.screenshot(path='mobile-bottom-nav-calendar.png', full_page=True)

        browser.close()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1) # wait for server to start
    run_test()
