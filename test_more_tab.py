from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()
        page.goto('file:///app/ai tex to calnder.html')

        # Navigate to More tab
        page.evaluate("toggleView('menu')")
        page.wait_for_selector('#app-menu-view:not(.hidden)')
        time.sleep(1) # wait for render

        page.screenshot(path='more_tab_before.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
