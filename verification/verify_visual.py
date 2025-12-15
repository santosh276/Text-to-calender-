
import time
from playwright.sync_api import sync_playwright, expect

def verify_frontend_visual():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the App
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#editor")

        # Take screenshot of the Editor Header to verify the new button
        header = page.locator(".bg-black.border-b.border-gray-800")
        header.screenshot(path="verification/header_button.png")
        print("Captured header screenshot.")

        browser.close()

if __name__ == "__main__":
    verify_frontend_visual()
