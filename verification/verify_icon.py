from playwright.sync_api import sync_playwright

def verify_om_icon():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Serve the file locally or open it directly
        page.goto("file:///app/ai tex to calnder.html")

        # Verify Navbar Icon
        # Look for SVG in logo container
        logo_container = page.locator("#logo-container")
        svg = logo_container.locator("svg")
        if svg.count() > 0:
            print("Navbar SVG found.")
            box = svg.bounding_box()
            if box and box["width"] > 0 and box["height"] > 0:
                print("Navbar SVG is visible.")
            else:
                print("Navbar SVG is not visible.")
        else:
            print("Navbar SVG NOT found.")

        # Take screenshot of Navbar
        navbar = page.locator("nav")
        navbar.screenshot(path="verification/navbar_icon.png")

        # Verify Render Function (Default Logo)
        # We can clear the logo config to force default rendering if it was set (but default is null)
        # The page loads with default logo if no config.
        # Let s ensure the HTML contains the SVG structure we expect.

        content = logo_container.inner_html()
        if "<svg" in content and "M379.3" in content:
            print("SVG content verified in Navbar.")
        else:
            print("SVG content mismatch in Navbar.")
            print(content)

        browser.close()

if __name__ == "__main__":
    verify_om_icon()
