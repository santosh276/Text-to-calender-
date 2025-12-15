from playwright.sync_api import sync_playwright

def verify_calendar_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for calendar title to be visible (indicates successful render)
        page.wait_for_selector("#app-title", state="visible")

        # Check if the title text is correct
        title = page.text_content("#app-title")
        print(f"App Title: {title}")

        # Wait for the grid to render
        page.wait_for_selector("#calendar-grid", state="visible")

        # Take a screenshot to verify visual state
        page.screenshot(path="verification/calendar_init.png")

        # Verify Editor Panel exists (we are in Editor Mode by default)
        editor_panel = page.query_selector("#editor-panel")
        if editor_panel:
            print("Editor Panel is visible.")
        else:
            print("Editor Panel is NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_calendar_load()
