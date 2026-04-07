from playwright.sync_api import sync_playwright
import threading
import http.server
import socketserver
import time
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(('localhost', 0))
port = sock.getsockname()[1]
sock.close()

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args): pass

httpd = socketserver.TCPServer(("", port), Handler)
thread = threading.Thread(target=httpd.serve_forever)
thread.daemon = True
thread.start()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    context = p.chromium.launch_persistent_context(
        user_data_dir="/tmp/playwright_user_data_fix4",
        viewport={'width': 375, 'height': 812}
    )

    page = context.new_page()
    url = f"http://localhost:{port}/ai tex to calnder.html"

    print("1. Opening app...")
    page.goto(url)
    page.wait_for_selector("#mobile-bottom-nav", timeout=5000)

    print("2. Clicking 'Festivals' tab...")
    page.click("#nav-btn-festivals", force=True)
    time.sleep(1)

    print("3. Reloading page...")
    page.reload()
    page.wait_for_selector("#mobile-bottom-nav", timeout=5000)
    time.sleep(1)

    nav_btns = page.locator("#mobile-bottom-nav button")
    cal_class = nav_btns.nth(0).get_attribute("class")
    fest_class = nav_btns.nth(1).get_attribute("class")
    print(f"After reload:")
    print(f"  Calendar btn class: {cal_class}")
    print(f"  Festivals btn class: {fest_class}")

    assert "text-orange-600" not in cal_class, "Calendar should not be active"
    assert "text-orange-600" in fest_class, "Festivals should be active"
    print("Test passed successfully!")

    context.close()
    browser.close()
