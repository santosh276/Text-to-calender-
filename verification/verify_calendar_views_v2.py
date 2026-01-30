import http.server
import socketserver
import threading
import time
import os
from playwright.sync_api import sync_playwright

PORT = 8000
FILE_PATH = "ai tex to calnder.html"

def start_server():
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def verify_views():
    # Start server in a separate thread
    thread = threading.Thread(target=start_server, daemon=True)
    thread.start()
    time.sleep(2)  # Give server time to start

    with sync_playwright() as p:
        # Browser setup
        browser = p.chromium.launch(headless=True)

        # 1. Verify MOBILE VIEW
        print("Verifying Mobile View...")
        context_mobile = browser.new_context(
            viewport={'width': 375, 'height': 812},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto(f"http://localhost:{PORT}/{FILE_PATH}")
        time.sleep(2) # Wait for render

        # Take screenshot
        page_mobile.screenshot(path="verification/mobile_view_v2.png")
        print("Mobile view screenshot saved to verification/mobile_view_v2.png")

        # 2. Verify DESKTOP VIEW
        print("Verifying Desktop View...")
        context_desktop = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page_desktop = context_desktop.new_page()
        page_desktop.goto(f"http://localhost:{PORT}/{FILE_PATH}")
        time.sleep(2) # Wait for render

        # Take screenshot
        page_desktop.screenshot(path="verification/desktop_view_v2.png")
        print("Desktop view screenshot saved to verification/desktop_view_v2.png")

        browser.close()

if __name__ == "__main__":
    verify_views()
