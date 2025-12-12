from playwright.sync_api import sync_playwright

def verify_horoscope(page):
    # Go to the local page
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for the grid
    page.wait_for_selector("#horoscope-grid")

    # Check grid class
    grid = page.locator("#horoscope-grid")
    classes = grid.get_attribute("class")
    print(f"Grid classes: {classes}")
    if "grid-cols-3" not in classes:
        print("FAIL: grid-cols-3 missing")
        exit(1)

    # Check item count
    buttons = grid.locator("button")
    count = buttons.count()
    print(f"Button count: {count}")
    if count != 12:
        print(f"FAIL: Expected 12 buttons, found {count}")
        exit(1)

    # Check styling of first button circle
    first_circle = buttons.first.locator("div").first
    circle_classes = first_circle.get_attribute("class")
    print(f"First circle classes: {circle_classes}")
    if "rounded-full" not in circle_classes or "w-16" not in circle_classes:
        print("FAIL: Circle styling missing (rounded-full or w-16)")
        exit(1)

    # Take screenshot of the grid area
    grid.screenshot(path="verification/horoscope_grid.png")
    print("Screenshot saved to verification/horoscope_grid.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_horoscope(page)
        except Exception as e:
            print(f"Error: {e}")
            exit(1)
        finally:
            browser.close()
