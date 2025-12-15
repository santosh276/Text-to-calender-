
from playwright.sync_api import sync_playwright

def verify_button_change():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 800})

        # Navigate to the app (assuming server is running on port 8080 from previous turn)
        # Using a file URL if server is not reliable in this context, but server was left running.
        # Let's try localhost first.
        try:
            page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        except:
            # Fallback if server died (though usually it persists in long-running bash)
            import os
            page.goto("file://" + os.path.abspath("ai tex to calnder.html"))

        # Wait for the editor panel to be visible
        page.wait_for_selector("#editor-panel")

        # Locate the button
        # It's the 3rd button in the first flex row of the header usually, or find by text
        button = page.get_by_role("button", name="Live Sync Docs")

        if button.count() > 0:
            print("Button found with text 'Live Sync Docs'")
            # Check icon class
            icon = button.locator("i")
            class_attr = icon.get_attribute("class")
            if "fa-brands fa-google" in class_attr:
                print("Icon verification passed: fa-brands fa-google")
            else:
                print(f"Icon verification failed. Found: {class_attr}")
        else:
            print("Button with text 'Live Sync Docs' NOT found")

        # Capture screenshot of the header
        header = page.locator("#editor-panel .bg-black.border-b")
        header.screenshot(path="verification/verify_button_change.png")

        browser.close()

if __name__ == "__main__":
    verify_button_change()
