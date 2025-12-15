
import os
import sys
import json
import http.server
import socketserver
import threading
import time
from playwright.sync_api import sync_playwright

PORT = 8001
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    # Allow address reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def verify_download():
    # Start server in a separate thread
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()
    time.sleep(2) # Wait for server to start

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"PAGE CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        print("Navigating to page...")
        page.goto(f"http://localhost:{PORT}/ai tex to calnder.html")

        # Wait for page to load
        page.wait_for_load_state("networkidle")

        print("Page loaded. Injecting interceptors...")

        # Inject script to intercept download
        page.evaluate("""
            window.downloadedContent = null;

            // Hook URL.createObjectURL
            const originalCreateObjectURL = URL.createObjectURL;
            URL.createObjectURL = (blob) => {
                console.log("URL.createObjectURL called");
                const reader = new FileReader();
                reader.onload = function() {
                    window.downloadedContent = reader.result;
                    console.log("Download content intercepted (" + window.downloadedContent.length + " bytes)");
                };
                reader.readAsText(blob);
                return "blob:intercepted";
            };

            // Hook document.createElement to intercept 'a' tags
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
                // Handle potential missing tagName or non-string
                if (!tagName || typeof tagName !== 'string') {
                    return originalCreateElement.apply(document, arguments);
                }

                const el = originalCreateElement.apply(document, arguments);
                if (tagName.toLowerCase() === 'a') {
                    el.click = function() { console.log("Anchor click intercepted"); };
                }
                return el;
            };
        """)

        print("Triggering downloadCalendar()...")
        # Ensure downloadCalendar exists
        exists = page.evaluate("typeof downloadCalendar === 'function'")
        if not exists:
            print("ERROR: downloadCalendar function not found!")
            sys.exit(1)

        page.evaluate("downloadCalendar()")

        # Wait for content to be captured
        print("Waiting for download content...")
        # Poll for window.downloadedContent
        content = None
        for i in range(20):
            content = page.evaluate("window.downloadedContent")
            if content:
                break
            time.sleep(0.5)

        if not content:
            print("FAILED: Did not capture downloaded content.")
            sys.exit(1)

        print(f"Content captured ({len(content)} bytes). Verifying...")

        # 1. Check for Loader
        if '<div id="initial-loader"' in content:
            print("SUCCESS: Loader found in downloaded HTML.")
        else:
            print("FAILURE: Loader NOT found in downloaded HTML.")
            sys.exit(1)

        # 2. Check for Lightweight Data
        if 'window.exportedData = {"config":' in content and '"monthsData":[]' in content:
             print("SUCCESS: exportedData seems to be lightweight (monthsData: []).")
        else:
             print("FAILURE: exportedData does not look lightweight.")
             # Extract exportedData to be sure
             import re
             match = re.search(r'window\.exportedData = (\{.*?\});', content)
             if match:
                 print(f"Found exportedData: {match.group(1)[:200]}...")
             else:
                 print("Could not find window.exportedData assignment.")
             sys.exit(1)

        # 3. Check for initAutoSync logic
        if 'CACHE_KEY_TEXT' in content and 'initAutoSync' in content:
            print("SUCCESS: initAutoSync logic found.")
        else:
            print("FAILURE: initAutoSync logic NOT found.")
            sys.exit(1)

        # 4. Check Editor Removal
        if 'id="editor-panel"' not in content:
            print("SUCCESS: editor-panel removed.")
        else:
            print("FAILURE: editor-panel still present in downloaded file.")
            sys.exit(1)

        print("ALL CHECKS PASSED for Download Logic.")

        # Now verify the source page (Editor Mode)
        print("Verifying Editor Mode (Source Page)...")
        # Check if editor exists
        if page.locator("#editor").count() > 0:
            print("SUCCESS: Editor exists in source page.")
        else:
            print("FAILURE: Editor missing in source page.")
            sys.exit(1)

        # Take a screenshot of the source page to ensure it rendered
        page.screenshot(path="verification/source_page.png")
        print("Screenshot saved to verification/source_page.png")

        browser.close()

if __name__ == "__main__":
    verify_download()
