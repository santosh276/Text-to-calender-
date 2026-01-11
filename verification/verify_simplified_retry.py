from playwright.sync_api import sync_playwright

def verify_simplified_retry():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Intercept the request to serve modified HTML (Simulate App Mode)
        def handle_route(route):
            try:
                response = route.fetch()
                body = response.text()

                # Remove editor to trigger App Mode logic
                # We rename the ID so document.getElementById('editor') returns null
                body = body.replace('id="editor"', 'id="editor-removed"')

                # Inject empty exportedData with a liveUrl that fails
                injection = '<script>window.exportedData = { monthsData: [], config: { liveUrl: "http://fail.com/data.txt" } };</script>'
                # Insert after body start
                body = body.replace('<body class="h-screen flex flex-col overflow-hidden">', '<body class="h-screen flex flex-col overflow-hidden">' + injection)

                route.fulfill(
                    response=response,
                    body=body,
                    headers=response.headers
                )
            except Exception as e:
                print(f"Route handler error: {e}")
                route.continue_()

        page.route("**/ai%20tex%20to%20calnder.html", handle_route)

        # Route failure for the liveUrl
        page.route("**/*", lambda route: route.abort() if "fail.com" in route.request.url else route.continue_())

        # Load the app
        try:
            page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")
        except:
            pass

        # Clear local storage to ensure no cache interfering
        page.evaluate("localStorage.clear()")

        # Reload to apply clear and trigger logic with fresh state
        page.reload()

        # Wait for Retry UI
        try:
            # Look for the specific text "Connection Failed"
            page.wait_for_selector("text=Connection Failed", timeout=5000)
            print("Retry UI appeared.")
        except:
            print("Retry UI did not appear.")
            page.screenshot(path="verification/failed_state_2.png")
            browser.close()
            return

        # Assertions
        input_count = page.locator("#retry-url-input").count()
        if input_count > 0:
            print("FAILURE: URL Input is still present!")
        else:
            print("SUCCESS: URL Input is absent.")

        retry_btn = page.locator("button:has-text('Retry Connection')")
        reset_btn = page.locator("button:has-text('Reset Settings')")

        if retry_btn.count() > 0:
            print("SUCCESS: Retry button present.")
        else:
            print("FAILURE: Retry button missing.")

        if reset_btn.count() > 0:
            print("SUCCESS: Reset button present.")
        else:
            print("FAILURE: Reset button missing.")

        page.screenshot(path="verification/simplified_retry_ui.png")
        browser.close()

if __name__ == "__main__":
    verify_simplified_retry()
