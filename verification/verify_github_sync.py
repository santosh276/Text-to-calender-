
import time
from playwright.sync_api import sync_playwright, expect

def verify_frontend_github_sync():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Setup Request Interception for "GitHub" Mock
        with open("verification/mock_calendar.txt", "r") as f:
            mock_content = f.read()

        def handle_github_route(route):
            print(f"Intercepted request to: {route.request.url}")
            time.sleep(0.5)
            route.fulfill(
                status=200,
                content_type="text/plain",
                body=mock_content
            )

        page.route("**/raw.githubusercontent.com/**", handle_github_route)

        # 2. Load the App
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#editor")
        print("App loaded.")

        # 3. Trigger GitHub Sync via new button
        # We need to target the new button specifically.
        # It has onclick="configureGitHubSync()"

        github_ui_url = "https://github.com/user/repo/blob/main/mock_calendar.txt"
        page.on("dialog", lambda dialog: dialog.accept(github_ui_url))

        # Click and capture "Syncing..." state
        page.click("button[onclick='configureGitHubSync()']")
        print("Clicked Live Sync GitHub button.")

        # 4. Wait for Toast and capture success state
        toast = page.locator("text=Calendar updated from Cloud!")
        expect(toast).to_be_visible(timeout=5000)
        print("Toast appeared.")

        # 5. Verify Editor Content matches mock content
        editor_val = page.eval_on_selector("#editor", "el => el.value")
        if mock_content.strip() in editor_val:
            print("SUCCESS: Editor content matches mock content.")
        else:
            print("FAILURE: Editor content does NOT match mock content.")
            print("Expected to contain:", mock_content.strip())
            print("Actual:", editor_val)
            exit(1)

        browser.close()

if __name__ == "__main__":
    verify_frontend_github_sync()
