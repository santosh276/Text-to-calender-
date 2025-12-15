
import sys
from playwright.sync_api import sync_playwright
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Start HTTP server
def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print("Server running on port 8000")
    httpd.serve_forever()

t = threading.Thread(target=run_server)
t.daemon = True
t.start()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("--- Opening App ---")
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
    page.wait_for_load_state("networkidle")

    # 1. Open Settings
    print("Opening Settings...")
    page.click("button:has-text('Settings')")
    page.wait_for_selector("#settings-modal")

    # 2. Take Screenshot
    screenshot_path = "verification/updated_toggles.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

    browser.close()
