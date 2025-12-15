import time
from playwright.sync_api import sync_playwright

def verify_live_sync():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Setup Request Interception for "GitHub" Mock
        # We will pretend that a request to 'https://raw.githubusercontent.com/user/repo/main/mock_calendar.txt'
        # returns the content of our local mock_calendar.txt

        with open("verification/mock_calendar.txt", "r") as f:
            mock_content = f.read()

        def handle_github_route(route):
            print(f"Intercepted request to: {route.request.url}")
            route.fulfill(
                status=200,
                content_type="text/plain",
                body=mock_content
            )

        page.route("**/raw.githubusercontent.com/**", handle_github_route)

        # 2. Load the App
        # Assuming server is running on 8080
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Verify initial load
        page.wait_for_selector("#editor")
        print("App loaded.")

        # 3. Simulate "Configure Live Sync"
        # We need to mock window.prompt to return the GitHub URL
        # URL to inject: https://github.com/user/repo/blob/main/mock_calendar.txt
        # Expected conversion: https://raw.githubusercontent.com/user/repo/main/mock_calendar.txt

        github_ui_url = "https://github.com/user/repo/blob/main/mock_calendar.txt"

        # Mocking prompt
        page.on("dialog", lambda dialog: dialog.accept(github_ui_url))

        # Click the "Live Sync" button.
        # It's the button calling configureLiveSync()
        page.click("button[onclick='configureLiveSync()']")
        print("Clicked Live Sync button and entered URL.")

        # 4. Wait for Sync to complete
        # We can wait for the toast "Calendar updated from Cloud!" or check the editor value
        # Or wait for request to complete.

        # Wait for a bit
        time.sleep(2)

        # 5. Verify Editor Content
        editor_val = page.eval_on_selector("#editor", "el => el.value")

        if mock_content.strip() in editor_val:
            print("SUCCESS: Editor content matches mock content.")
        else:
            print("FAILURE: Editor content does NOT match mock content.")
            print("Expected to contain:", mock_content.strip())
            print("Actual:", editor_val)
            exit(1)

        # 6. Verify App State Config URL (ensure it was converted)
        # We can access appState via window.appState (since it is global variable in the script,
        # wait, `let appState` is at top level, but not explicitly window.appState.
        # However, at top level `let` in browser creates a global, but not on window object for `let`/`const`?
        # Actually `let` at top level in script tag is global scope but not property of window.
        # But wait, looking at the file:
        # It says `let appState = ...` inside `<script>`.
        # I can try accessing it. If not, I can inspect localStorage 'panchangConfig'.

        saved_config = page.evaluate("localStorage.getItem('panchangConfig')")
        print("Saved Config:", saved_config)

        expected_raw_url = "https://raw.githubusercontent.com/user/repo/main/mock_calendar.txt"
        if expected_raw_url in saved_config:
             print("SUCCESS: URL was correctly converted and saved.")
        else:
             print("FAILURE: URL was NOT correctly converted.")
             print("Expected:", expected_raw_url)
             exit(1)

        browser.close()

if __name__ == "__main__":
    verify_live_sync()
