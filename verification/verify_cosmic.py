
from playwright.sync_api import sync_playwright

def verify_cosmic_theme(page):
    page.set_viewport_size({"width": 1920, "height": 1080})
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Wait for attached
    page.wait_for_selector("#horoscope-grid", state="attached")

    # Check visibility
    is_visible = page.locator("#horoscope-grid").is_visible()
    print(f"Is visible: {is_visible}")

    if not is_visible:
        # Debug why
        display = page.eval_on_selector("#horoscope-grid", "el => window.getComputedStyle(el).display")
        print(f"Computed display: {display}")
        visibility = page.eval_on_selector("#horoscope-grid", "el => window.getComputedStyle(el).visibility")
        print(f"Computed visibility: {visibility}")

    # Take screenshot of the sidebar/horoscope container
    # The parent of grid
    try:
        container = page.locator(".cosmic-container")
        container.wait_for(timeout=5000)
        container.screenshot(path="verification/cosmic_horoscope.png")
        print("Screenshot taken of cosmic container.")

        # Verify content
        if container.locator(".stars-bg").count() > 0:
            print("Stars background confirmed.")
        if container.locator(".constellation").count() > 0:
            print("Constellation confirmed.")

    except Exception as e:
        print(f"Could not capture container: {e}")
        page.screenshot(path="verification/full_page_debug.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_cosmic_theme(page)
        finally:
            browser.close()
