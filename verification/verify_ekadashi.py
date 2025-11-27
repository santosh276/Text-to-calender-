from playwright.sync_api import sync_playwright

def verify_ekadashi_icons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        print("Checking for Ekadashi Icons in Grid...")

        # Purnima icon: fa-circle text-amber-400
        purnima_icons = page.locator(".fa-circle.text-amber-400")

        # Amavasya icon: fa-circle text-gray-900
        amavasya_icons = page.locator(".fa-circle.text-gray-900")

        # Shukla Ekadashi icon: fa-solid fa-star text-orange-500
        shukla_icons = page.locator(".fa-star.text-orange-500")

        # Krishna Ekadashi icon: fa-regular fa-star text-blue-600
        krishna_icons = page.locator(".fa-star.text-blue-600")

        print(f"Found {purnima_icons.count()} Purnima icons.")
        print(f"Found {amavasya_icons.count()} Amavasya icons.")
        print(f"Found {shukla_icons.count()} Shukla Ekadashi icons.")
        print(f"Found {krishna_icons.count()} Krishna Ekadashi icons.")

        # Take screenshot
        page.screenshot(path="verification/verification_ekadashi.png")
        print("Screenshot saved to verification/verification_ekadashi.png")

        browser.close()

if __name__ == "__main__":
    verify_ekadashi_icons()
