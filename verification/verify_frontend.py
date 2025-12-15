
import time
from playwright.sync_api import sync_playwright, expect

def verify_frontend_live_sync():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Setup Request Interception for "GitHub" Mock
        with open("verification/mock_calendar.txt", "r") as f:
            mock_content = f.read()

        def handle_github_route(route):
            # Delay slightly to capture "Syncing..." state
            time.sleep(1)
            route.fulfill(
                status=200,
                content_type="text/plain",
                body=mock_content
            )

        page.route("**/raw.githubusercontent.com/**", handle_github_route)

        # 2. Load the App
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#editor")

        # 3. Trigger Live Sync
        github_ui_url = "https://github.com/user/repo/blob/main/mock_calendar.txt"
        page.on("dialog", lambda dialog: dialog.accept(github_ui_url))

        # Click and capture "Syncing..." state
        page.click("button[onclick='configureLiveSync()']")

        # Take screenshot of Syncing state (approx 500ms after click)
        time.sleep(0.5)
        page.screenshot(path="verification/live_sync_loading.png")
        print("Captured loading state.")

        # 4. Wait for Toast and capture success state
        toast = page.locator("text=Calendar updated from Cloud!")
        expect(toast).to_be_visible(timeout=5000)

        page.screenshot(path="verification/live_sync_success.png")
        print("Captured success toast.")

        browser.close()

if __name__ == "__main__":
    verify_frontend_live_sync()
