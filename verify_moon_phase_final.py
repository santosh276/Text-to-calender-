from playwright.sync_api import sync_playwright
import os

def verify_moon_phase():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        page.wait_for_selector("#calendar-grid")

        # Take a screenshot of the grid
        element = page.locator("#calendar-grid")
        element.screenshot(path="/home/jules/verification/moon_phase_final.png")

        print("Screenshot saved to /home/jules/verification/moon_phase_final.png")
        browser.close()

if __name__ == "__main__":
    verify_moon_phase()
