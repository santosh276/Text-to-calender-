
import sys
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create context with no cache
        context = browser.new_context(ignore_https_errors=True, java_script_enabled=True, bypass_csp=True)
        page = context.new_page()

        # Use a timestamp to bust cache
        url = "http://localhost:8080/ai%20tex%20to%20calnder.html?t=123456"
        print(f"Loading {url}...")
        page.goto(url)
        page.wait_for_selector("#editor")

        # Inject content with a Generic Event to ensure filters are active/useful (though they render anyway)
        new_text = """
::: config
@ Title : Test Calendar
:::

::: calendar
++ January 2025 ++
05 > Generic Event Item
:::
"""
        print("Injecting calendar data...")
        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{new_text}`;
            // Trigger input event
            editor.dispatchEvent(new Event('input'));
        """)

        # Wait for render
        page.wait_for_timeout(2000)

        # 1. Verify "Other Events" Label
        print("Checking filter buttons...")
        # The filters are in #festival-filters
        # We look for the button containing "Other Events"

        buttons = page.locator("#festival-filters button").all()
        found_other = False
        other_btn = None

        btn_texts = []
        for btn in buttons:
            text = btn.inner_text().strip()
            btn_texts.append(text)
            if "Other Events" in text:
                found_other = True
                other_btn = btn
                break

        if not found_other:
            print(f"FAILURE: 'Other Events' filter button NOT found. Available buttons: {btn_texts}")
            # Debug: print HTML of filter container
            print(page.inner_html("#festival-filters"))
            sys.exit(1)
        else:
            print("SUCCESS: Found 'Other Events' filter button.")

        # 2. Verify Styling (Classes)
        print("Verifying styling classes...")
        # Expected: bg-gray-600, shadow-gray-200
        class_attr = other_btn.get_attribute("class")
        print(f"Button classes: {class_attr}")

        required_classes = ["bg-gray-600", "shadow-gray-200"]
        missing = [c for c in required_classes if c not in class_attr]

        if missing:
            print(f"FAILURE: Missing styling classes: {missing}")
            sys.exit(1)
        else:
            print("SUCCESS: Button has correct base styling.")

        # 3. Verify Active State (Click it)
        print("Clicking button to verify active state...")
        other_btn.click()
        page.wait_for_timeout(500)

        class_attr_active = other_btn.get_attribute("class")
        print(f"Active Button classes: {class_attr_active}")

        required_active = ["ring-2", "ring-gray-600"]
        missing_active = [c for c in required_active if c not in class_attr_active]

        if missing_active:
            print(f"FAILURE: Missing active state classes: {missing_active}")
            sys.exit(1)
        else:
            print("SUCCESS: Button has correct active styling (rings).")

        print("Taking screenshot...")
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved to verification/verification.png")

        print("ALL CHECKS PASSED.")
        browser.close()

if __name__ == "__main__":
    run()
