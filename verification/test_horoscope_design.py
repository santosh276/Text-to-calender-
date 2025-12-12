
from playwright.sync_api import sync_playwright

def verify_horoscope_design():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Navigate to the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")

        # 2. Check Sidebar Horoscope Grid
        # Check for grid-cols-2 class
        grid = page.locator("#horoscope-grid")
        class_attr = grid.get_attribute("class")
        if "grid-cols-2" in class_attr:
            print("PASS: Sidebar grid has 'grid-cols-2'.")
        else:
            print(f"FAIL: Sidebar grid class is '{class_attr}'")

        # Check for larger icons
        # We look for text-3xl class on the icon
        icon = grid.locator("button i").first
        if icon.count() > 0:
            icon_class = icon.get_attribute("class")
            if "text-3xl" in icon_class:
                print("PASS: Sidebar icon has 'text-3xl'.")
            else:
                print(f"FAIL: Sidebar icon class is '{icon_class}'")
        else:
            print("FAIL: No icons found in sidebar.")

        # 3. Open Horoscope Modal (Click first item)
        page.click("#horoscope-grid button >> nth=0")
        page.wait_for_selector("#horoscope-modal", state="visible")

        # 4. Check Modal Header Icon
        header_icon = page.locator("#horo-modal-title .w-16.h-16")
        if header_icon.count() > 0:
             print("PASS: Modal header has a large icon container (w-16 h-16).")
        else:
             print("FAIL: Modal header icon container not found.")

        # Screenshot
        page.screenshot(path="verification/horoscope_design.png")

        browser.close()

if __name__ == "__main__":
    verify_horoscope_design()
