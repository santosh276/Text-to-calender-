from playwright.sync_api import sync_playwright, expect
import http.server
import socketserver
import threading
import time

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", 8000), Handler)
    httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(2)

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        time.sleep(2)

        # Test navigation toggle to Dharma Player
        dharma_btn = page.locator("#btn-dharma-view")
        dharma_btn.click()

        time.sleep(1)

        # Verify Dharma view is active
        expect(page.locator("#dharma-app-view")).to_be_visible()

        # Test interaction - go to mala
        mala_btn = page.locator('button[data-page="mala"]')
        if mala_btn.is_visible():
            mala_btn.click()
            time.sleep(1)
            # Find the increment button
            inc_btn = page.locator('button[onclick="incrementMala()"]')
            if inc_btn.is_visible():
                inc_btn.click()
                count = page.locator('#malaCount').inner_text()
                print(f"Mala incremented to: {count}")
                if count != "1":
                    print("ERROR: Mala did not increment correctly")
        else:
            print("Mala button not visible, might be on mobile view")

        # Test local storage by saving persistence
        page.evaluate("if(typeof savePersist === 'function') { savePersist(); }")

        # Check console errors
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        time.sleep(1)
        if errors:
            print(f"Console errors during execution: {errors}")
        else:
            print("No console errors detected.")

        browser.close()

if __name__ == "__main__":
    run_tests()
