from playwright.sync_api import sync_playwright

def verify_retry_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Serve the file locally or open it directly
        page.goto('file:///app/ai tex to calnder.html')

        # Inject the #app-loader element which downloadCalendar usually injects
        page.evaluate("""
            const loader = document.createElement('div');
            loader.id = 'app-loader';
            document.body.appendChild(loader);
            // Trigger showRetryUI manually to verify the button
            showRetryUI(loader);
        """)

        # Verify Close Button exists
        close_btn = page.locator('#app-loader button svg')
        if close_btn.count() > 0:
            print('Close Button Found')
        else:
            print('Close Button NOT Found')

        page.screenshot(path='verification/retry_ui_close_btn.png')
        browser.close()

if __name__ == '__main__':
    verify_retry_ui()
