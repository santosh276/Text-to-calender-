from playwright.sync_api import sync_playwright

def verify_search_bar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the search bar to be present (New ID)
        search_input = page.locator("#festival-search-input")
        search_input.wait_for(state="visible")

        # 1. Verify Placeholder (Updated requirement)
        placeholder = search_input.get_attribute("placeholder")
        print(f"Placeholder found: {placeholder}")
        if placeholder != "Find a festival...":
            raise Exception(f"Expected placeholder 'Find a festival...', found '{placeholder}'")

        # 2. Verify Classes (Input)
        class_attr = search_input.get_attribute("class")
        print(f"Input classes: {class_attr}")
        # Verify a subset of key classes from the new design
        expected_classes = ["bg-white/50", "backdrop-blur-sm", "focus:bg-white", "focus:ring-2"]
        for cls in expected_classes:
            if cls not in class_attr:
                raise Exception(f"Expected class '{cls}' not found in input classes")

        # 3. Verify Clear Button ID and Opacity logic
        clear_btn = page.locator("#search-clear-btn")
        clear_btn_class = clear_btn.get_attribute("class")
        print(f"Clear button classes: {clear_btn_class}")
        if "opacity-0" not in clear_btn_class:
             raise Exception("Clear button should be hidden (opacity-0) initially")

        # Type something to make clear button visible
        search_input.fill("test")
        page.wait_for_timeout(500) # Wait for logic to run

        clear_btn_class_visible = clear_btn.get_attribute("class")
        if "opacity-0" in clear_btn_class_visible:
             raise Exception("Clear button should be visible (opacity-0 removed) after typing")

        # Take screenshot
        festival_section = page.locator("#sec-festivals")
        festival_section.screenshot(path="verification/search_bar_fixed.png")

        browser.close()

if __name__ == "__main__":
    verify_search_bar()
