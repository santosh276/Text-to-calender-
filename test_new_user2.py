from playwright.sync_api import sync_playwright
import os
import time

def run():
    html_path = os.path.abspath('ai tex to calnder.html')
    file_url = f"file://{html_path}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport configuration
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()

        # Override localStorage with NO cached state to simulate new user
        page.add_init_script("""
            window.localStorage.clear();
        """)

        print("1. Opening app (no cache)...")
        page.goto(file_url)
        time.sleep(2) # wait for DOM & init

        # Check class names
        calendar_btn = page.locator("#nav-btn-calendar")
        cal_class = calendar_btn.get_attribute("class")

        print(f"  Calendar btn class: {cal_class}")

        # Execute toggleView in browser context and see what happens
        page.evaluate("toggleView(appState.view);")
        time.sleep(1)

        cal_class = calendar_btn.get_attribute("class")
        print(f"  Calendar btn class AFTER manual toggle: {cal_class}")
        print("  appState.view is: " + page.evaluate("appState.view"))

        browser.close()

if __name__ == "__main__":
    run()
