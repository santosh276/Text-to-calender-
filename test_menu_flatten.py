from playwright.sync_api import sync_playwright
import os

def run():
    html_file_path = f"file://{os.path.abspath('ai tex to calnder.html')}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using a mobile context as mentioned in memory for bottom nav checking
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()

        page.goto(html_file_path)

        # Click the menu tab using evaluate
        page.evaluate("toggleView('menu')")

        # Wait for the view to become visible
        page.wait_for_selector('#app-menu-view:not(.hidden)')

        # Give a moment for animations/fonts
        page.wait_for_timeout(1000)

        screenshot_path = 'menu_tab_flattened.png'
        page.screenshot(path=screenshot_path, full_page=True)

        browser.close()

        print(f"Screenshot saved to {screenshot_path}")

if __name__ == '__main__':
    run()
