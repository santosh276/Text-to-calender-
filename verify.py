import sys
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("file:///app/ai%20tex%20to%20calnder.html")

        # Wait for the formatting guide to be present
        page.wait_for_selector("#syntax-guide")

        # Open the formatting guide
        page.click("button:has-text('Formatting Guide')")

        # Wait for the "Month Partition" section
        try:
            page.wait_for_selector("text=7. Month Partition", timeout=5000)
            print("Successfully found '7. Month Partition' in the syntax guide.")

            # Optionally check if the dashes are present
            dashes = page.locator("text=-----------------------------------")
            if dashes.count() > 0:
                print("Successfully found the dashes snippet.")
            else:
                print("Failed to find the dashes snippet.")
                sys.exit(1)
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ui()