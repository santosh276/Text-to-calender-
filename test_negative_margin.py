from playwright.sync_api import sync_playwright
import socket
from threading import Thread
import http.server
import socketserver
import os

def get_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

PORT = get_free_port()

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

thread = Thread(target=start_server, daemon=True)
thread.start()

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={'width': 1024, 'height': 800})
    page = context.new_page()
    page.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")
    page.evaluate("toggleView('more')")
    page.wait_for_selector('#more-view-container:not(.hidden)')
    page.wait_for_timeout(500)

    # Check what scrollWidth and clientWidth are
    scroll_w = page.evaluate("document.querySelector('#more-view-container').scrollWidth")
    client_w = page.evaluate("document.querySelector('#more-view-container').clientWidth")
    print(f"Inner container scrollWidth: {scroll_w}, clientWidth: {client_w}")

    # Which child is causing scroll?
    children_widths = page.evaluate("""
        Array.from(document.querySelector('#more-view-container').children).map(c => c.scrollWidth)
    """)
    print(f"Children scrollWidths: {children_widths}")

    browser.close()
