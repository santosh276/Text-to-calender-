from playwright.sync_api import sync_playwright

def verify_import_doc_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the button to be visible
        button = page.get_by_role("button", name="Import Doc")
        button.wait_for()

        # Take a screenshot of the button area
        # We can take a screenshot of the header container
        header = page.locator(".bg-black.border-b.border-gray-800")
        header.screenshot(path="verification/header_screenshot.png")

        # Also take a specific screenshot of the button for closer inspection
        button.screenshot(path="verification/button_screenshot.png")

        print("Screenshots taken.")
        browser.close()

if __name__ == "__main__":
    verify_import_doc_button()
