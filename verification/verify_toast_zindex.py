from playwright.sync_api import sync_playwright
import time

def test_toast_zindex():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Setup: Clear cache and set a failing live URL
        # We need to access the page context first
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        page.evaluate("""() => {
            localStorage.clear();
            localStorage.setItem('panchangConfig', JSON.stringify({
                liveUrl: 'https://raw.githubusercontent.com/santosh276/panchang-data/main/INVALID.txt',
                syncInterval: 0
            }));
            // Remove editor to simulate App Mode (so Retry UI appears)
            document.getElementById('editor-panel').remove();
            // Force exportedData to skeleton to ensure cold start
            window.exportedData = { monthsData: [], config: {} };
        }""")

        # 2. Trigger Init (Reload or call initApp)
        # Since we modified DOM (removed editor), calling initApp() again is better than reload (which resets DOM)
        # But initApp runs on load.
        # If we reload, the DOM will have #editor again.
        # We need to Simulate "App Mode" logic.
        # To simulate App Mode on reload, we need to modify the HTML file?
        # Or we can use page.route to modify response?
        # Let's just manually trigger initApp logic after modifying DOM in the same session.

        # Override window.location.reload to do nothing (so retry button doesn't reset us)
        page.evaluate("window.location.reload = () => {}")

        # Call initApp again.
        # Note: initApp logic checks document.getElementById('editor').
        # We removed it. So isEditor = false.
        # It checks window.exportedData. We set it.
        # It should trigger Scenario B.

        print("Triggering initApp()...")
        page.evaluate("initApp()")

        # 3. Wait for Loader (z-200) and Toast (z-300)
        # The toast appears when fetch fails.
        # The Retry UI appears when hasValidData returns false.

        # Wait for toast
        try:
            toast = page.wait_for_selector(".fixed.bottom-10.z-\\[300\\]", state="visible", timeout=5000)
            print("Toast found with z-[300]!")
        except:
            print("Toast NOT found or z-index mismatch!")
            # Take debug screenshot
            page.screenshot(path="verification/debug_toast.png")

        # Wait for Retry Modal (Loader)
        try:
            modal = page.wait_for_selector("#app-loader.z-\\[200\\]", state="visible", timeout=5000)
            print("Retry Modal found with z-[200]!")
        except:
            print("Retry Modal NOT found!")

        # Take visual proof
        time.sleep(1) # Let animations finish
        page.screenshot(path="verification/toast_zindex.png")
        print("Screenshot saved to verification/toast_zindex.png")

        browser.close()

if __name__ == "__main__":
    test_toast_zindex()
