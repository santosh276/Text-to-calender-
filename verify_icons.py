import os
import time
import subprocess
import sys
from playwright.sync_api import sync_playwright

def verify_icons():
    # Start server
    server_process = subprocess.Popen([sys.executable, "-m", "http.server", "8080"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)  # Wait for server to start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()

            # 1. Verify Mobile View
            context_mobile = browser.new_context(
                viewport={"width": 390, "height": 844},
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
            )
            page_mobile = context_mobile.new_page()
            page_mobile.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
            page_mobile.wait_for_selector("#app-title")

            # Wait a bit for rendering
            time.sleep(1)

            # Capture Header
            header_loc = page_mobile.locator("nav")
            if not os.path.exists("verification"):
                os.makedirs("verification")
            header_loc.screenshot(path="verification/header_icons_mobile.png")
            print("Captured header_icons_mobile.png")

            browser.close()

    finally:
        server_process.terminate()
        server_process.wait()

if __name__ == "__main__":
    verify_icons()
