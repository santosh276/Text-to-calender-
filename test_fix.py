from playwright.sync_api import sync_playwright
import threading
import http.server
import socketserver
import time

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

# Give server time to start
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 375, 'height': 812})
    page.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")

    # Wait for the menu icon to be visible and click it
    page.evaluate("toggleView('menu')")

    # Wait for the app-menu-view to be visible
    page.wait_for_selector("#app-menu-view", state="visible", timeout=5000)

    # ensure we scroll slightly to test stickiness (it's absolute layout usually, but just in case)
    page.evaluate("document.querySelector('#app-menu-view').scrollBy(0, 50)")

    time.sleep(1)

    page.screenshot(path="verify_spacing_mobile_after_fix.png")
    print("Screenshot captured to verify_spacing_mobile_after_fix.png")

    page_desktop = browser.new_page(viewport={'width': 1280, 'height': 800})
    page_desktop.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")

    # Wait for the menu icon to be visible and click it
    page_desktop.evaluate("toggleView('menu')")

    # Wait for the app-menu-view to be visible
    page_desktop.wait_for_selector("#app-menu-view", state="visible", timeout=5000)

    time.sleep(1)

    page_desktop.screenshot(path="verify_spacing_desktop_after_fix.png")
    print("Screenshot captured to verify_spacing_desktop_after_fix.png")

    browser.close()