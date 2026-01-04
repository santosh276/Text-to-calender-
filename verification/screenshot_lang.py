
import sys
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(ignore_https_errors=True, java_script_enabled=True, bypass_csp=True)
        page = context.new_page()

        url = "http://localhost:8080/ai%20tex%20to%20calnder.html?t=screenshot_lang_v2"
        print(f"Loading {url}...")
        page.goto(url)
        page.wait_for_selector("#editor")

        # Inject content
        new_text = """
::: config
@ Title : Language Test
:::

::: calendar
++ January 2025 ++
05 > Generic Event
:::
"""
        print("Injecting calendar data...")
        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{new_text}`;
            editor.dispatchEvent(new Event('input'));
        """)

        page.wait_for_timeout(1000)

        # Switch to Hindi via JS function
        print("Switching language to Hindi...")
        page.evaluate("changeLanguage('hi')")
        page.wait_for_timeout(1000)

        # Verify the 4th button label
        buttons = page.locator("#festival-filters button").all()
        found_hindi = False

        for btn in buttons:
            text = btn.inner_text().strip()
            # Normalize whitespace
            text = " ".join(text.split())
            if "अन्य त्यौहार" in text:
                found_hindi = True
                break

        if found_hindi:
            print("SUCCESS: Found Hindi label 'अन्य त्यौहार'.")
        else:
            print("FAILURE: Hindi label not found.")

        print("Taking screenshot...")
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
