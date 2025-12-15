
import os
from playwright.sync_api import sync_playwright, expect

def verify_github_import(page):
    page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

    # Wait for the app to load
    expect(page.locator("#app-title")).to_be_visible()

    # 1. Test configureLiveSync with GitHub URL
    # Mock window.prompt
    github_url = "https://github.com/user/repo/blob/main/data.txt"
    raw_url = "https://raw.githubusercontent.com/user/repo/main/data.txt"

    # Intercept the network request to verify URL conversion
    # We will mock the response so we don't actually hit GitHub (and can verify the fetch URL)
    # We also check that no alert is shown

    request_intercepted = False

    def handle_route(route):
        nonlocal request_intercepted
        req = route.request
        if "raw.githubusercontent.com" in req.url:
            request_intercepted = True
            # Verify URL structure
            print(f"Intercepted Request URL: {req.url}")
            if raw_url in req.url:
                 print("URL conversion successful!")

            route.fulfill(status=200, body="::: config\n@ Title : GitHub Sync Test\n:::")
        else:
            route.continue_()

    page.route("**/*", handle_route)

    # Setup Dialog handler (for Prompt and Alert)
    def handle_dialog(dialog):
        print(f"Dialog opened: {dialog.type} - {dialog.message}")
        if dialog.type == "prompt":
            dialog.accept(github_url)
        elif dialog.type == "alert":
            print("Alert received (Unexpected if valid URL)!")
            dialog.accept()

    page.on("dialog", handle_dialog)

    # Click Live Sync button
    # The button text is " Live Sync" (with space or icon)
    # Selector based on onclick might be safer or text
    page.locator("button", has_text="Live Sync").click()

    # Wait for sync
    page.wait_for_timeout(2000)

    if request_intercepted:
        print("GitHub Live Sync request verification PASSED")
    else:
        print("GitHub Live Sync request verification FAILED - Request not seen")

    # Take screenshot of the UI after sync (Title should change if sync worked)
    page.screenshot(path="verification/live_sync_after.png")

    # 2. Test Import Doc with GitHub URL
    # Reset request intercepted flag
    request_intercepted = False

    # Click Import Doc button
    page.locator("button", has_text="Import Doc").click()

    page.wait_for_timeout(2000)

    if request_intercepted:
        print("GitHub Import Doc request verification PASSED")
    else:
        print("GitHub Import Doc request verification FAILED - Request not seen")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_github_import(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
