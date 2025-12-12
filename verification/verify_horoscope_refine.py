from playwright.sync_api import sync_playwright

def verify_horoscope_final_safety(page):
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
    page.wait_for_selector("#horoscope-grid")

    grid = page.locator("#horoscope-grid")
    classes = grid.get_attribute("class")
    print(f"Grid classes: {classes}")

    # Check for the updated responsive classes
    required = ["grid-cols-2", "md:grid-cols-3", "lg:grid-cols-2", "gap-y-6", "gap-x-4"]
    for req in required:
        if req not in classes:
            print(f"FAIL: Missing {req}")
            exit(1)

    print("PASS: All safe responsive classes present.")
    grid.screenshot(path="verification/horoscope_final_safe.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_horoscope_final_safety(page)
        except Exception as e:
            print(f"Error: {e}")
            exit(1)
        finally:
            browser.close()
