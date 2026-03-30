from playwright.sync_api import sync_playwright, expect
import http.server
import socketserver
import threading
import time

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", 8002), Handler)
    httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(2)

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8002/ai%20tex%20to%20calnder.html")
        time.sleep(2)

        print("Clicking via JS...")
        page.evaluate("document.getElementById('btn-dharma-view').click()")
        time.sleep(2)

        classes = page.locator("#dharma-app-view").get_attribute("class")
        print(f"Dharma classes after click: {classes}")

        expect(page.locator("#dharma-app-view")).to_be_visible()

        browser.close()

if __name__ == "__main__":
    run_tests()
