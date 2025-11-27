from playwright.sync_api import sync_playwright

def verify_svg_icons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        print("Checking for SVG Ekadashi Icons in Grid...")

        # Shukla Ekadashi SVG Container
        shukla_icons = page.locator("div[title='Shukla Ekadashi']")

        # Krishna Ekadashi SVG Container
        krishna_icons = page.locator("div[title='Krishna Ekadashi']")

        print(f"Found {shukla_icons.count()} Shukla Ekadashi icons.")
        print(f"Found {krishna_icons.count()} Krishna Ekadashi icons.")

        # Check if they contain SVGs
        if shukla_icons.count() > 0:
            svg_count = shukla_icons.first.locator("svg").count()
            print(f"Shukla icon contains {svg_count} SVG.")

        if krishna_icons.count() > 0:
            svg_count = krishna_icons.first.locator("svg").count()
            print(f"Krishna icon contains {svg_count} SVG.")

        # Take screenshot
        page.screenshot(path="verification/verification_ekadashi_svg.png")
        print("Screenshot saved to verification/verification_ekadashi_svg.png")

        browser.close()

if __name__ == "__main__":
    verify_svg_icons()
