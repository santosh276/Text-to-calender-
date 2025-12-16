from playwright.sync_api import sync_playwright

def verify_calendar_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the file
        # Since I'm running a server at root, and file is ai tex to calnder.html
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to load (app-title should be visible)
        page.wait_for_selector("#app-title")

        # Verify JSON cache logic (by checking console logs or localStorage if possible, but visual is enough)
        # We can check if the editor value is populated (it should be default)

        editor = page.query_selector("#editor")
        if editor:
            print("Editor found")

        # Check for caching logs in console
        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        # Reload to test cache
        page.reload()
        page.wait_for_selector("#app-title")

        # Take a screenshot
        page.screenshot(path="verification/calendar_app.png")

        browser.close()

if __name__ == "__main__":
    verify_calendar_app()
