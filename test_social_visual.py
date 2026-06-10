import os
import time
from playwright.sync_api import sync_playwright

def test_footer():
    html_file = f"file://{os.getcwd()}/ai tex to calnder.html"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800},
            geolocation={'latitude': 28.6139, 'longitude': 77.2090},
            permissions=['geolocation']
        )

        context.add_init_script("""
            navigator.geolocation.getCurrentPosition = (success, error) => {
                success({ coords: { latitude: 28.6139, longitude: 77.2090 } });
            };
        """)

        page = context.new_page()
        page.goto(html_file)

        # Inject custom cards content.
        # Hyperlink MUST be the first property after the block header according to memory rules!
        content = """::: Footer tab
Hyperlink: [https://example.com/contact]
Main Title: [Company]
Title: [Contact]

::: Social tab
Hyperlink: [https://facebook.com]
Title: [Facebook]
Image: [https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg]

::: Social tab
Hyperlink: [https://twitter.com]
Title: [Twitter]
Image: [https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg]
"""

        page.fill('#editor', content)
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }))")
        time.sleep(2)

        # Switch to more view
        page.evaluate("toggleView('more')")
        page.wait_for_load_state('networkidle')
        time.sleep(2)

        # Hide standard elements that cause popups or visual clutter
        page.evaluate("""
            document.querySelectorAll('.fixed').forEach(el => { el.style.display = 'none'; });
            document.querySelector('#sidebar')?.remove();
        """)

        # Verify DOM
        has_classes = page.evaluate("""() => {
            const container = document.querySelector('.w-full.mt-8.pt-4.border-t.border-white\\\\/20.flex.justify-end');
            return container !== null;
        }""")
        print(f"DOM Verification - Wrapper has required classes: {has_classes}")

        # Check if icons are loaded
        social_count = page.evaluate("document.querySelectorAll('.w-full.mt-8.pt-4 a').length")
        print(f"Number of social icons found in DOM: {social_count}")

        # Take full page screenshot
        page.screenshot(path='social_icons_visual.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    test_footer()
