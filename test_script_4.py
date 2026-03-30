from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import time

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", 8003), Handler)
    httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(2)

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8003/ai%20tex%20to%20calnder.html")
        time.sleep(2)

        # Let's catch any errors that might occur on click
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else print(msg.text))

        try:
            page.evaluate("showDharmaView()")
        except Exception as e:
            print("Evaluation failed:", e)

        time.sleep(1)
        print("Console Errors:", errors)
        browser.close()

if __name__ == "__main__":
    run_tests()
