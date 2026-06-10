import os
import time
from playwright.sync_api import sync_playwright

def test_footer():
    html_file = f"file://{os.getcwd()}/ai tex to calnder.html"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Setup context
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

        # Inject custom cards content
        content = """::: Footer tab
Main Title: [Company]
Title: [Contact]
Hyperlink: [https://example.com/contact]

::: Social tab
Title: [Facebook]
Hyperlink: [https://facebook.com]
Image: [https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg]

::: Social tab
Title: [Twitter]
Hyperlink: [https://twitter.com]
Image: [https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg]
"""

        page.fill('#editor', content)
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }))")
        time.sleep(2)

        # Switch to more view
        page.evaluate("toggleView('more')")
        page.wait_for_load_state('networkidle')
        time.sleep(2)

        # Force hide geolocation popup if present
        page.evaluate("document.querySelectorAll('.fixed').forEach(el => { if(el.innerText.includes('location')) el.style.display = 'none'; });")

        # Wait for the social icons wrapper to exist and be visible
        social_container = page.locator('.w-full.mt-8.pt-4.border-t.border-white\\/20.flex')
        social_container.wait_for(state='visible')

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)

        page.screenshot(path='footer_view.png', full_page=True)
        social_container.screenshot(path='social_icons_only.png')

        browser.close()

if __name__ == '__main__':
    test_footer()
    print("Screenshot saved.")
