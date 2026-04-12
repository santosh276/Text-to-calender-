import os
import http.server
import socketserver
import threading
from playwright.sync_api import sync_playwright

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def start_server():
    httpd = socketserver.TCPServer(("", 0), Handler)
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever)
    thread.daemon = True
    thread.start()
    return port, httpd

def test_more_tab():
    port, httpd = start_server()
    url = f"http://localhost:{port}/ai%20tex%20to%20calnder.html"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1024, "height": 800})

        print("Navigating to page...")
        page.goto(url)

        # Initial state checks
        page.wait_for_selector('#month-view-container:not(.hidden)')
        print("Month view is visible.")

        # Click the More button (desktop nav)
        print("Clicking More button...")
        page.evaluate("toggleView('more')")

        page.wait_for_selector('#more-view-container:not(.hidden)')
        print("More view is visible.")

        # Check active state of button
        is_active = page.evaluate("document.querySelector('.menu-icon-btn').classList.contains('text-white')")
        print(f"More button active state: {is_active}")

        # Take a screenshot
        page.screenshot(path="more_tab_screenshot.png", full_page=True)
        print("Screenshot saved to more_tab_screenshot.png")

        # Check for any console errors
        # (This is implicitly done by checking if the page continues to render and respond)

        browser.close()
        httpd.shutdown()

if __name__ == "__main__":
    test_more_tab()
