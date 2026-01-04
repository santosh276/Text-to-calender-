from playwright.sync_api import sync_playwright

def verify_search_bar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the search bar to be present
        search_input = page.locator("#festival-search")
        search_input.wait_for(state="visible")

        # 1. Verify Placeholder
        placeholder = search_input.get_attribute("placeholder")
        print(f"Placeholder found: {placeholder}")
        if placeholder != "Search festivals...":
            raise Exception(f"Expected placeholder 'Search festivals...', found '{placeholder}'")

        # 2. Verify Classes (Input)
        class_attr = search_input.get_attribute("class")
        print(f"Input classes: {class_attr}")
        expected_classes = ["bg-gray-50", "focus:bg-white", "hover:border-orange-300", "hover:shadow-md", "focus:border-orange-400"]
        for cls in expected_classes:
            if cls not in class_attr:
                raise Exception(f"Expected class '{cls}' not found in input classes")

        # 3. Verify Clear Button Hover Class
        clear_btn = page.locator("#search-clear")
        clear_btn_class = clear_btn.get_attribute("class")
        print(f"Clear button classes: {clear_btn_class}")
        if "hover:text-red-500" not in clear_btn_class:
            raise Exception("Expected 'hover:text-red-500' in clear button classes")

        # Type something to make clear button visible (logic check)
        search_input.fill("test")
        page.wait_for_timeout(500) # Wait for logic to run

        # Take screenshot of the festival section
        festival_section = page.locator("#sec-festivals")
        festival_section.screenshot(path="verification/search_bar.png")

        browser.close()

if __name__ == "__main__":
    verify_search_bar()
