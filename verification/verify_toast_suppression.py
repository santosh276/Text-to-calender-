from playwright.sync_api import sync_playwright

def verify_toast_suppression():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Intercept routing to simulate failure
        page.route("**/*", lambda route: route.abort() if "fail.com" in route.request.url else route.continue_())

        def handle_html(route):
            try:
                response = route.fetch()
                body = response.text()
                # Remove editor to trigger App Mode
                body = body.replace('id="editor"', 'id="editor-removed"')
                # Inject setup script
                injection = """
                <script>
                try {
                    localStorage.clear();
                    localStorage.setItem('panchangConfig', JSON.stringify({ liveUrl: 'http://fail.com/data.txt', title: 'Test App' }));
                    window.exportedData = { monthsData: [], config: { liveUrl: 'http://fail.com/data.txt' } };
                } catch(e) { console.error(e); }
                </script>
                """
                body = body.replace('<body class="h-screen flex flex-col overflow-hidden">', '<body class="h-screen flex flex-col overflow-hidden">' + injection)

                route.fulfill(response=response, body=body)
            except Exception as e:
                print(f"Error in handle_html: {e}")
                route.continue_()

        page.route("**/ai%20tex%20to%20calnder.html", handle_html)

        # Load the page
        try:
            page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        except:
            pass

        # Wait for Retry UI
        try:
            page.wait_for_selector("text=Connection Failed", timeout=5000)
            print("Retry UI appeared.")
        except:
            print("Retry UI did NOT appear. Debugging...")
            # Take screenshot to debug
            page.screenshot(path="verification/debug_fail.png")
            browser.close()
            return

        # Check for Toast
        page.wait_for_timeout(1000)

        toasts = page.locator("text=Sync Error")
        if toasts.count() > 0 and toasts.first.is_visible():
            print("FAILURE: Toast message appeared.")
        else:
            print("SUCCESS: Toast message suppressed.")

        browser.close()

if __name__ == "__main__":
    verify_toast_suppression()
