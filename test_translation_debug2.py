import time
from playwright.sync_api import sync_playwright

def test_translation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        # We need a proper http server to test cookies. Let's use a simple python server
        import subprocess
        proc = subprocess.Popen(["python", "-m", "http.server", "8000"])
        time.sleep(1)

        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        print("Initial combo value:", page.evaluate("document.querySelector('.goog-te-combo') ? document.querySelector('.goog-te-combo').value : 'NO COMBO'"))

        page.evaluate("changeCustomLanguage('hi', 'Hindi')")
        time.sleep(2)

        print("New combo value:", page.evaluate("document.querySelector('.goog-te-combo') ? document.querySelector('.goog-te-combo').value : 'NO COMBO'"))

        cookies = page.context.cookies()
        print("Cookies:", [c for c in cookies if 'googtrans' in c['name']])

        proc.kill()
        browser.close()

if __name__ == "__main__":
    test_translation()
