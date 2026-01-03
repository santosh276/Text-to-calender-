
from playwright.sync_api import sync_playwright

def verify_gray_badges():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open the app
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Inject custom data with Generic events (>)
        # We simulate the user typing into the editor and parsing
        input_data = """
::: config
@ Title : Test
:::

::: calendar
++ February 2025 ++
15 ! Festival
16 > Generic Event
17 ^ Auspicious
18 * Holiday
:::
"""
        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{input_data}`;
            editor.dispatchEvent(new Event('input'));
        """)

        # Wait for render
        page.wait_for_timeout(1000)

        # Take screenshot of the festivals section
        section = page.locator("#sec-festivals")
        section.screenshot(path="verification/gray_badges_test.png")

        browser.close()

if __name__ == "__main__":
    verify_gray_badges()
