from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        page = context.new_page()

        with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Let's check the original HTML for the toast prompt again
        print(content.find('<div id="location-prompt-toast"'))

if __name__ == '__main__':
    run()