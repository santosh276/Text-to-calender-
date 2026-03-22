import time
from playwright.sync_api import sync_playwright

def test_translation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("file:///app/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        # Initial check
        print("Initial combo value:", page.evaluate("document.querySelector('.goog-te-combo') ? document.querySelector('.goog-te-combo').value : 'NO COMBO'"))

        # Change lang
        page.evaluate("changeCustomLanguage('hi', 'Hindi')")
        time.sleep(2)

        # Check combo again
        print("New combo value:", page.evaluate("document.querySelector('.goog-te-combo') ? document.querySelector('.goog-te-combo').value : 'NO COMBO'"))

        # Check cookies
        cookies = page.context.cookies()
        print("Cookies:", [c for c in cookies if 'googtrans' in c['name']])

        browser.close()

if __name__ == "__main__":
    test_translation()
