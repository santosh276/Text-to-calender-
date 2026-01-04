from playwright.sync_api import sync_playwright

def verify_search_highlight():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the search bar to be present
        search_input = page.locator("#festival-search-input")
        search_input.wait_for(state="visible")

        # Type "New" (should match "New Year's Day")
        search_input.fill("New")
        page.wait_for_timeout(500) # Wait for logic to run

        # Check if highlighting exists
        highlighted = page.locator(".search-highlight").first
        if not highlighted.is_visible():
            raise Exception("Expected .search-highlight element not found or not visible")

        text = highlighted.inner_text()
        print(f"Highlighted text: {text}")
        if text.lower() != "new":
            raise Exception(f"Expected highlighted text 'New', found '{text}'")

        # Check Clear Button visibility
        clear_btn = page.locator("#search-clear-btn")
        class_attr = clear_btn.get_attribute("class")
        if "opacity-0" in class_attr or "pointer-events-none" in class_attr:
             raise Exception(f"Clear button should be visible (classes removed), got: {class_attr}")

        # Take screenshot of the highlight
        festival_section = page.locator("#sec-festivals")
        festival_section.screenshot(path="verification/search_highlight.png")

        browser.close()

if __name__ == "__main__":
    verify_search_highlight()
