from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        # Simulate mobile Chrome in "Desktop site" mode
        # High width (e.g. 1024), low/medium height (e.g. 800 or less)
        # Usually mobile browser UI takes up vertical space, let's use 1024 x 600
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={'width': 1024, 'height': 600},
            user_agent='Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            has_touch=True,
            is_mobile=True
        )
        page = context.new_page()
        page.goto('file://' + __import__('os').path.abspath('ai tex to calnder.html'))

        # Switch to the menu view
        page.evaluate("toggleView('menu')")
        page.wait_for_selector('#app-menu-view:not(.hidden)')

        # Take screenshot
        page.screenshot(path='desktop_site_before.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    run()
