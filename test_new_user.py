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

        # Override localStorage with NO cached state to simulate new user
        context.add_init_script("""
            window.localStorage.clear();
        """)

        page = context.new_page()

        # 1. Load the page initially
        print("1. Opening app (no cache)...")
        page.goto(file_url)
        time.sleep(2) # wait for DOM & init

        # Check class names
        calendar_btn = page.locator("#nav-btn-calendar")
        cal_class = calendar_btn.get_attribute("class")

        print(f"  Calendar btn class: {cal_class}")

        page.screenshot(path="new_user_screenshot.png")
        browser.close()

if __name__ == "__main__":
    run()
