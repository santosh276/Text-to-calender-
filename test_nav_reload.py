from playwright.sync_api import sync_playwright
import threading
import http.server
import socketserver
import time
import socket

# Find an available port
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(('localhost', 0))
port = sock.getsockname()[1]
sock.close()

# Start simple HTTP server in background thread
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass # Suppress logging

httpd = socketserver.TCPServer(("", port), Handler)
thread = threading.Thread(target=httpd.serve_forever)
thread.daemon = True
thread.start()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # We create a persistent context to simulate a browser session where local storage persists
    context = p.chromium.launch_persistent_context(
        user_data_dir="/tmp/playwright_user_data",
        viewport={'width': 375, 'height': 812}
    )

    page = context.new_page()
    url = f"http://localhost:{port}/ai tex to calnder.html"

    print("1. Opening app...")
    page.goto(url)
    page.wait_for_selector("#mobile-bottom-nav", timeout=5000)

    # Check default active state initially
    print("Checking default state...")
    nav_btns = page.locator("#mobile-bottom-nav button")
    assert "text-orange-600" in nav_btns.nth(0).get_attribute("class"), "Calendar should be active"
    assert "text-orange-600" not in nav_btns.nth(1).get_attribute("class"), "Festivals should not be active"

    print("2. Clicking 'Festivals' tab...")
    page.click("#nav-btn-festivals", force=True)
    time.sleep(1) # wait for DOM updates

    # Verify state after click
    print("Checking state after click...")
    assert "text-orange-600" not in nav_btns.nth(0).get_attribute("class"), "Calendar should not be active"
    assert "text-orange-600" in nav_btns.nth(1).get_attribute("class"), "Festivals should be active"

    # Save a screenshot to verify what it looks like before reload
    page.screenshot(path="before-reload.png")

    print("3. Reloading page (simulating opening in new tab/closing browser if caching issue)...")
    page.reload()
    page.wait_for_selector("#mobile-bottom-nav", timeout=5000)
    time.sleep(1)

    # Take screenshot after reload
    page.screenshot(path="after-reload.png")

    # Check if the state persisted correctly (or reset correctly depending on what we want)
    # The user complains "Whenever I open a tab, I close the browser. The next time I open that tab, it stays there, but the navigation button keeps changing."
    # Wait, the problem is caching. "Whenever I open a tab... it stays there (meaning the view stays on Festivals) but the navigation button keeps changing (meaning the button active state goes back to Calendar)"
    # Let's check the current class of the buttons
    nav_btns = page.locator("#mobile-bottom-nav button")
    cal_class = nav_btns.nth(0).get_attribute("class")
    fest_class = nav_btns.nth(1).get_attribute("class")
    print(f"After reload:")
    print(f"  Calendar btn class: {cal_class}")
    print(f"  Festivals btn class: {fest_class}")

    # Check which view is actually visible
    is_calendar_visible = page.locator("#month-view-container").is_visible()
    is_festivals_visible = page.locator("#app-festival-view").is_visible()

    print(f"  Calendar view visible: {is_calendar_visible}")
    print(f"  Festivals view visible: {is_festivals_visible}")

    context.close()
    browser.close()
