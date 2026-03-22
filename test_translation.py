import time
from playwright.sync_api import sync_playwright

def test_translation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        # Load the page via file://
        page.goto("file:///app/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        page.evaluate("openSettingsModal()")
        time.sleep(1)

        page.evaluate("toggleCustomLangMenu()")
        time.sleep(1)

        page.evaluate("changeCustomLanguage('hi', 'Hindi')")
        time.sleep(5)

        text = page.evaluate("document.body.innerText")
        if "हिन्दी" in text or "दैनिक पंचांग" in text or "आज" in text or "सेटिंग्स" in text:
            print("Translation looks like it worked!")
            # We can print some translated text
            print("Body snippet:", text[:200])
        else:
            print("Translation DID NOT work!")
            print("Body snippet:", text[:200])

            # Print google translate element content
            gt_html = page.evaluate("document.getElementById('google_translate_element').innerHTML")
            print("GT Element HTML:", gt_html)

        browser.close()

if __name__ == "__main__":
    test_translation()
