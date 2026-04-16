from playwright.sync_api import sync_playwright
import os
import http.server
import socketserver
import threading
import time

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start server in background
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(1) # wait for server to start

try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={'width': 1200, 'height': 800},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        )
        page = context.new_page()

        print("Navigating to page...")
        page.goto(f'http://localhost:{PORT}/ai%20tex%20to%20calnder.html')
        page.wait_for_load_state('networkidle')

        print("Injecting mock location...")
        page.evaluate('''() => {
            localStorage.setItem('userLocation', JSON.stringify({lat: 28.6139, lng: 77.2090}));
            localStorage.setItem('panchang_autosave_text', '');
        }''')
        page.reload()
        page.wait_for_load_state('networkidle')

        print("Clicking Add Custom Card button...")
        page.click('button:has-text("Add Custom Card")')

        print("Waiting for modal...")
        page.wait_for_selector('#custom-card-modal', state='visible')

        print("Filling form...")
        page.fill('#cc-title', 'My Custom Horoscope')
        page.fill('#cc-desc', 'Custom stars description')
        page.fill('#cc-image', 'https://test.img')
        page.fill('#cc-link', 'https://test.link')

        print("Submitting...")
        page.click('button:has-text("Add Card")')

        print("Waiting for modal to close...")
        page.wait_for_selector('#custom-card-modal', state='hidden')

        print("Switching to More tab...")
        page.evaluate("toggleView('more')")
        page.wait_for_selector('#more-view-container', state='visible')

        print("Verifying card rendered...")
        card = page.locator('a.custom-card-generated')
        card.wait_for(state='visible')

        href = card.get_attribute('href')
        print(f"Card href: {href}")
        assert href == 'https://test.link', f"Expected href https://test.link but got {href}"

        target = card.get_attribute('target')
        assert target == '_blank', f"Expected target _blank but got {target}"

        title_text = card.locator('h3').text_content()
        assert 'My Custom Horoscope' in title_text

        print("Verifying Formatting Guide text...")
        page.evaluate("toggleView('month')")
        page.click('button:has-text("Formatting Guide")')
        page.wait_for_selector('#syntax-guide', state='visible')

        # We need to find the specific guide block
        syntax_blocks = page.locator('.guide-section .code-block').all_text_contents()
        expected_syntax = "::: More tab\nHyperlink: [Your Link]\nTitle: [Your Title]\nDescription: [Your Description]\nImage Link: [Your Image URL]\n:::"

        found = False
        for text in syntax_blocks:
            if "::: More tab" in text:
                print(f"Found block: {repr(text)}")
                if text.strip() == expected_syntax.strip():
                    found = True
                    break

        assert found, "Formatting guide syntax did not exactly match the requested string!"

        print("Reloading to test persistence...")
        page.reload()
        page.wait_for_load_state('networkidle')
        page.evaluate("toggleView('more')")
        page.wait_for_selector('#more-view-container', state='visible')

        persisted_card = page.locator('a.custom-card-generated')
        persisted_card.wait_for(state='visible')
        assert persisted_card.get_attribute('href') == 'https://test.link'

        print("All tests passed successfully!")
        browser.close()

except Exception as e:
    print(f"Test failed: {e}")
