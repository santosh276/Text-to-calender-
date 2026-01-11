from playwright.sync_api import sync_playwright
import time

def test_toast_zindex_v3():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        def handle_route(route):
            response = route.fetch()
            body = response.text()

            # 1. Remove editor
            body = body.replace('id="editor"', 'id="hidden-editor"')

            # 2. Inject Loader (Crucial for showRetryUI)
            loader_html = '<div id="app-loader" class="fixed inset-0 z-[200] bg-white">LOADER</div>'

            # 3. Inject Config & Data
            injection = f"""
            {loader_html}
            <script>
            window.exportedData = {{ monthsData: [], config: {{ liveUrl: 'https://httpstat.us/404', syncInterval: 0 }} }};
            localStorage.clear();
            </script>
            """
            body = body.replace('<body class="h-screen flex flex-col overflow-hidden">', f'<body class="h-screen flex flex-col overflow-hidden">{injection}')

            route.fulfill(response=response, body=body)

        page.route("**/*ai%20tex%20to%20calnder.html", handle_route)

        print("Loading page in Simulated App Mode V3...")
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Wait for Toast (z-300)
        try:
            toast = page.locator('.z-\\[300\\]')
            toast.wait_for(state="visible", timeout=5000)
            print("SUCCESS: Toast found with z-[300]!")

            # Verify stacking order via bounding box or just presence
            # If z-300 works, it should be clickable/visible over the loader
            # We can check z-index computed style
            z_index = toast.evaluate("el => window.getComputedStyle(el).zIndex")
            print(f"Toast Computed Z-Index: {z_index}")

        except Exception as e:
            print(f"FAIL: Toast not found: {e}")

        # Wait for Retry Modal
        try:
            modal = page.locator('#app-loader.z-\\[200\\]')
            modal.wait_for(state="visible", timeout=5000)
            print("Retry Modal found with z-[200]!")
            z_index = modal.evaluate("el => window.getComputedStyle(el).zIndex")
            print(f"Modal Computed Z-Index: {z_index}")

        except Exception as e:
            print(f"Retry Modal not found: {e}")

        page.screenshot(path="verification/toast_zindex_v3.png")
        browser.close()

if __name__ == "__main__":
    test_toast_zindex_v3()
