from playwright.sync_api import sync_playwright

def verify_search_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the app to load
        page.wait_for_selector("#editor")

        # Focus on the search input to trigger the focus styles
        search_input = page.locator("#festival-search")
        search_input.focus()

        # Take a screenshot of the search bar area
        # Locate the festival search wrapper or the festival section
        festival_section = page.locator("#sec-festivals")

        # Capture screenshot
        festival_section.screenshot(path="verification/search_ui.png")

        # Also verify classes presence programmatically if possible
        # Check if icon has fa-search
        icon = page.locator("#sec-festivals .fa-search")
        if icon.count() > 0:
            print("Icon fa-search found.")
        else:
            print("Icon fa-search NOT found.")

        # Check classes on input
        input_class = search_input.get_attribute("class")
        print(f"Input classes: {input_class}")

        browser.close()

if __name__ == "__main__":
    verify_search_ui()
