from playwright.sync_api import sync_playwright

def verify_half_moon_icons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar to render
        page.wait_for_selector("#calendar-grid")

        print("Checking for Half-Moon Ekadashi Icons in Grid...")

        # Shukla Ekadashi icon: fa-solid fa-circle-half-stroke text-amber-500
        # (Since it's dynamic based on date, we might not find it in current view, but we check if code runs)
        shukla_icons = page.locator(".fa-circle-half-stroke.text-amber-500")

        # Krishna Ekadashi icon: fa-solid fa-circle-half-stroke text-slate-600
        krishna_icons = page.locator(".fa-circle-half-stroke.text-slate-600")

        print(f"Found {shukla_icons.count()} Shukla Ekadashi icons (Half Glow Moon).")
        print(f"Found {krishna_icons.count()} Krishna Ekadashi icons (Half Dark Moon).")

        # Take screenshot
        page.screenshot(path="verification/verification_ekadashi_moon.png")
        print("Screenshot saved to verification/verification_ekadashi_moon.png")

        browser.close()

if __name__ == "__main__":
    verify_half_moon_icons()
