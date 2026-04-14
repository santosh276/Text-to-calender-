from playwright.sync_api import sync_playwright

def check_title():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('file:///app/ai%20tex%20to%20calnder.html')

        # We need to target the h1 element containing Vaidik Margam
        locator = page.locator('h1:has-text("Vaidik Margam")')
        locator.wait_for(state="attached")

        style = locator.get_attribute("style") or ""
        class_attr = locator.get_attribute("class") or ""

        print(f"Style attribute: {style}")
        print(f"Class attribute: {class_attr}")

        assert "font-weight: 850" in style, f"Expected font-weight: 850 in style, got {style}"
        assert "-webkit-text-stroke" not in style, "Expected -webkit-text-stroke to be removed"
        assert "font-black" not in class_attr, "Expected font-black to be removed"

        print("Test passed successfully.")

        browser.close()

if __name__ == "__main__":
    check_title()
