from playwright.sync_api import sync_playwright

def verify_composite_ekadashi():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        print("Checking for Composite Ekadashi Icons in Grid...")

        # Shukla Ekadashi SVG Container
        shukla_icons = page.locator("div[title='Shukla Ekadashi'] svg")

        # Krishna Ekadashi SVG Container
        krishna_icons = page.locator("div[title='Krishna Ekadashi'] svg")

        print(f"Found {shukla_icons.count()} Shukla Ekadashi icons.")
        print(f"Found {krishna_icons.count()} Krishna Ekadashi icons.")

        # Check if they contain circle + path
        if shukla_icons.count() > 0:
            circle_count = shukla_icons.first.locator("circle").count()
            path_count = shukla_icons.first.locator("path").count()
            print(f"Shukla icon contains {circle_count} circle and {path_count} path.")

        if krishna_icons.count() > 0:
            circle_count = krishna_icons.first.locator("circle").count()
            path_count = krishna_icons.first.locator("path").count()
            print(f"Krishna icon contains {circle_count} circle and {path_count} path.")

        # Take screenshot
        page.screenshot(path="verification/verification_ekadashi_composite.png")
        print("Screenshot saved to verification/verification_ekadashi_composite.png")

        browser.close()

if __name__ == "__main__":
    verify_composite_ekadashi()
