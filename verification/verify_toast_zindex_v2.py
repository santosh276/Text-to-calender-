from playwright.sync_api import sync_playwright
import time

def test_toast_zindex_v2():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Intercept request to simulate App Mode (remove editor, inject skeleton)
        def handle_route(route):
            response = route.fetch()
            body = response.text()

            # 1. Remove editor ID so isEditor becomes false
            body = body.replace('id="editor"', 'id="hidden-editor"')

            # 2. Inject skeleton data for App Mode detection
            # And inject config with invalid URL to force sync error
            injection = """
            <script>
            window.exportedData = { monthsData: [], config: { liveUrl: 'https://httpstat.us/404', syncInterval: 0 } };
            // Clear cache to ensure cold start
            localStorage.clear();
            </script>
            """
            body = body.replace('<body class="h-screen flex flex-col overflow-hidden">', f'<body class="h-screen flex flex-col overflow-hidden">{injection}')

            route.fulfill(response=response, body=body)

        page.route("**/*ai%20tex%20to%20calnder.html", handle_route)

        print("Loading page in Simulated App Mode...")
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Now initApp should run:
        # 1. Checks cache -> empty.
        # 2. Checks isEditor -> false (we renamed it).
        # 3. Checks exportedData -> skeleton.
        # 4. hasValidData -> false.
        # 5. Scenario B -> Force Sync from 'https://httpstat.us/404'.
        # 6. Fetch fails -> Toast "GitHub Sync Error".
        # 7. initApp continues -> hasValidData false -> showRetryUI.

        # Wait for Toast (z-300)
        try:
            # Note: We need to escape brackets in selector string for Playwright if strictly CSS
            # But get_by_text might be easier for debug
            # Let's check class presence
            toast = page.locator('.z-\\[300\\]')
            toast.wait_for(state="visible", timeout=10000)
            print("SUCCESS: Toast found with z-[300]!")
            print(f"Toast Text: {toast.inner_text()}")
        except Exception as e:
            print(f"FAIL: Toast not found: {e}")

        # Wait for Retry Modal (Loader)
        try:
            modal = page.locator('#app-loader.z-\\[200\\]') # Note: showRetryUI modifies app-loader
            # Actually showRetryUI uses the passed loader element.
            # If loader was removed, it might not work.
            # In downloadCalendar, loader is added with id="app-loader".
            # But wait, downloadCalendar adds it to the downloaded HTML.
            # In our simulation, we didn't add the loader!
            # The loader is NOT in the source HTML.
            # showRetryUI(loader) is called.
            # initApp tries: const loader = document.getElementById('app-loader');
            # If loader is null, showRetryUI(null) -> returns immediately!

            # AHA! If loader is missing, showRetryUI does NOTHING.
            # So the user sees NOTHING (blank screen?).
            # But in the REAL downloaded app, loader IS there.

            # So I must inject the loader too!
            print("Loader missing from source, checking if we need to inject it...")

        except Exception as e:
            print(f"Retry Modal check failed: {e}")

        page.screenshot(path="verification/toast_zindex_v2_fail.png")

        # Let's try injecting loader in the route handler too.

        browser.close()

if __name__ == "__main__":
    test_toast_zindex_v2()
