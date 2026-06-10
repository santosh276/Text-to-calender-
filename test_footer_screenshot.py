from playwright.sync_api import sync_playwright
import time
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={'width': 1200, 'height': 800},
        geolocation={'longitude': 77.2090, 'latitude': 28.6139},
        permissions=['geolocation']
    )
    page = context.new_page()
    page.goto(f"file://{os.getcwd()}/ai tex to calnder.html")

    # Hide any input panels if necessary, otherwise let it be
    page.evaluate("""
        () => {
            const panel = document.querySelector('.bg-gray-900.border-r');
            if (panel) panel.style.display = 'none';
        }
    """)

    # Input content
    editor = page.locator("#editor")
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
    editor.fill(content)
    page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }))")

    time.sleep(2)

    # Switch to More tab
    page.evaluate("toggleView('more')")
    time.sleep(2)

    # Check classes
    classes = page.evaluate("""
        () => {
            const container = document.querySelector('.mt-8.pt-4.border-t');
            return container ? container.className : 'Not found';
        }
    """)
    print(f"Container classes: {classes}")

    # Take screenshot of the app block
    page.screenshot(path="full_more_tab.png", full_page=True)
    print("Screenshot taken: full_more_tab.png")

    browser.close()
