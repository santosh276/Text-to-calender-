from playwright.sync_api import sync_playwright
import os
import time

def test_footer_spacing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1000, 'height': 1500})

        page.add_init_script("window.navigator.geolocation.getCurrentPosition = function(success){ success({coords: {latitude: 28.6139, longitude: 77.2090}}); };")

        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_url)

        editor_content = """
::: Footer tab
Hyperlink: [https://example.com/story]
Main Title: [About Us]
Title: [Our Story]

::: Footer tab
Hyperlink: [https://example.com/contact]
Main Title: [About Us]
Title: [Contact]

::: Social tab
Hyperlink: [https://facebook.com]
Title: [Facebook]
Image Link: [https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg]

::: Social tab
Hyperlink: [https://twitter.com]
Title: [Twitter]
Image Link: [https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg]
"""

        page.fill('#editor', editor_content)
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }))")
        time.sleep(2)

        page.evaluate("if(typeof toggleView === 'function') { toggleView('more'); } else { document.getElementById('tab-more').click(); }")
        time.sleep(2)

        page.screenshot(path="screenshot_footer_check.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    test_footer_spacing()
