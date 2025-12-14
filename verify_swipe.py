from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for app to load
        page.wait_for_selector("#calendar-grid")

        # Inject custom data using single ! to pass existing parser
        input_data = """
::: calendar
++ January 2026 ++
25 ! Event A / Event B
"""
        page.evaluate(f"""() => {{
            const ta = document.getElementById('editor');
            ta.value = `{input_data}`;
            parseInput(ta.value);
        }}""")

        time.sleep(1)

        # Click on day 25
        cells = page.locator(".grid-cell")
        target_cell = None
        for i in range(cells.count()):
            txt = cells.nth(i).inner_text()
            if "25" in txt:
                target_cell = cells.nth(i)
                break

        if target_cell:
            target_cell.click(force=True)
        else:
            return

        # Wait for modal
        page.wait_for_selector("#day-modal", state="visible", timeout=5000)
        time.sleep(1)

        # Check buttons
        nav = page.locator("#modal-nav-container")
        btn = nav.locator("button").first

        if btn.count() == 0:
            print("FAILURE: Buttons missing.")
            return

        cls = btn.get_attribute("class")
        if "bg-black/20" in cls:
            print("SUCCESS: Transparency class found.")
        else:
            print("FAILURE: Transparency class missing.")

        # Check auto-hide
        print("Waiting for auto-hide (2s)...")
        time.sleep(2.0)
        nav_cls = nav.get_attribute("class")
        if "opacity-0" in nav_cls:
            print("SUCCESS: Auto-hide verified.")
        else:
            print("FAILURE: Auto-hide failed.")

        # Check reappear
        print("Interacting with modal...")
        # Use specific locator for day-modal content
        modal_box = page.locator("#day-modal .modal-content").bounding_box()
        if modal_box:
            page.mouse.move(modal_box['x'] + 10, modal_box['y'] + 10)
            # wiggle
            page.mouse.move(modal_box['x'] + 20, modal_box['y'] + 20)

        time.sleep(0.5)
        nav_cls_2 = nav.get_attribute("class")
        if "opacity-0" not in nav_cls_2:
            print("SUCCESS: Reappear verified.")
        else:
            print("FAILURE: Reappear failed.")

        page.screenshot(path="verification_swipe.png")
        browser.close()

if __name__ == "__main__":
    run()
