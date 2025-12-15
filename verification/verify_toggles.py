
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

    # 2. Toggle off Festivals
    # The input is sr-only, so we click the div sibling which is the visual switch
    print("Toggling off Festivals...")
    # Locate the checkbox
    toggle = page.locator("#toggle-festivals")
    # Click its parent label (Playwright usually handles label clicks by triggering the input)
    # But since input is hidden, let's try force click or JS
    page.evaluate("document.getElementById('toggle-festivals').click()")

    # Wait for render update
    time.sleep(0.5)

    # 4. Verify Sidebar Update
    print("Verifying Sidebar visibility...")
    fest_section = page.locator("#sec-festivals")

    # It should be hidden (display: none)
    is_hidden = page.evaluate("document.getElementById('sec-festivals').style.display === 'none'")

    if is_hidden:
        print("SUCCESS: Festival section hidden.")
    else:
        print("FAILURE: Festival section still visible.")
        sys.exit(1)

    # 5. Take Screenshot
    page.screenshot(path="verification/settings_toggles.png")

    browser.close()
