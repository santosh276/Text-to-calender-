
import sys
from playwright.sync_api import sync_playwright
import os
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

    # 1. Setup download handler
    print("--- Testing Download Logic ---")
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
    page.wait_for_load_state("networkidle")

    # Trigger download
    with page.expect_download() as download_info:
        page.click("button:has-text('Download HTML')")

    download = download_info.value
    download_path = "verification/downloaded_calendar.html"
    download.save_as(download_path)
    print(f"File downloaded to {download_path}")

    # 2. Verify Content
    with open(download_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # CHECK 1: Editor Panel Removal
    if 'id="editor-panel"' not in content and 'id="editor"' not in content:
        print("SUCCESS: Editor panel removed.")
    else:
        print("FAILURE: Editor panel still present.")
        sys.exit(1)

    # CHECK 2: Language Pruning
    # By default, language is 'en'. So only 'en' should be in langData.
    if '"hi":' not in content and '"or":' not in content:
        print("SUCCESS: Unused languages (hi, or) removed.")
    else:
        print("FAILURE: Unused languages found in content.")
        # Debug: print snippet
        idx = content.find("const langData")
        print(f"Debug Snippet: {content[idx:idx+200]}...")
        sys.exit(1)

    # CHECK 3: State Injection
    if 'window.exportedData' in content:
        print("SUCCESS: window.exportedData injected.")
    else:
        print("FAILURE: State not injected.")
        sys.exit(1)

    print("Download verification complete.")
    browser.close()
