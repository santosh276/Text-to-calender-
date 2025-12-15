from playwright.sync_api import sync_playwright

def verify_sync_timer_logic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")

        # 1. Verify parseInput correctly parses the sync timer
        # We can inject a test string into the editor and check appState
        test_input = """
::: config
@ Title : Sync Test
@ Docs Sync trigger in every : 30 minutes
:::
"""
        page.evaluate(f"document.getElementById('editor').value = `{test_input}`")
        # Trigger input event to parse
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'))")

        # Check appState.config.syncInterval
        sync_interval = page.evaluate("window.appState.config.syncInterval")
        print(f"Parsed Sync Interval: {sync_interval}")

        if sync_interval == "30 minutes":
            print("SUCCESS: Sync Interval parsed correctly.")
        else:
            print(f"FAILURE: Expected '30 minutes', got '{sync_interval}'")

        # 2. Verify Helper Function getSyncIntervalMs
        ms_val = page.evaluate("getSyncIntervalMs('30 minutes')")
        print(f"30 minutes in ms: {ms_val}")
        if ms_val == 30 * 60 * 1000:
            print("SUCCESS: getSyncIntervalMs('30 minutes') calculation correct.")
        else:
            print(f"FAILURE: Calculation incorrect. Got {ms_val}")

        # 3. Verify Helper Function defaults
        ms_val_default = page.evaluate("getSyncIntervalMs('')")
        if ms_val_default == 24 * 60 * 60 * 1000:
            print("SUCCESS: Default interval calculation correct (24 hours).")
        else:
             print(f"FAILURE: Default calculation incorrect. Got {ms_val_default}")

        # 4. Verify fetchLiveDoc exists and has new signature
        # We can check the function string to see if it contains "forceInstant"
        func_str = page.evaluate("fetchLiveDoc.toString()")
        if "forceInstant" in func_str and "CHECK TIMER" in func_str:
             print("SUCCESS: fetchLiveDoc seems to be the updated version.")
        else:
             print("FAILURE: fetchLiveDoc does not look like the updated version.")

        # Take a screenshot just to be safe
        page.screenshot(path="verification/sync_logic_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_sync_timer_logic()
