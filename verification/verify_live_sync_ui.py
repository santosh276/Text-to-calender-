
import sys
from playwright.sync_api import sync_playwright
import time
import os
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Start HTTP server
def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print("Server running on port 8000")
    httpd.serve_forever()

# Start server in background
t = threading.Thread(target=run_server)
t.daemon = True
t.start()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("--- Step 1: Open Page ---")
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Wait for page load
    page.wait_for_load_state("networkidle")

    # Check if "Live Sync" button exists
    sync_btn = page.get_by_role("button", name="Live Sync")
    if sync_btn.count() > 0:
        print("SUCCESS: Live Sync button found.")
    else:
        print("FAILURE: Live Sync button not found.")
        sys.exit(1)

    # Take screenshot
    screenshot_path = "verification/live_sync_ui.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

    browser.close()
