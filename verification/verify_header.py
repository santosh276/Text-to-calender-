from playwright.sync_api import sync_playwright
import time

def verify_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the header to render (it's static but ensuring load)
        page.wait_for_selector("#cal-month")

        # Take a screenshot of the header area specifically
        # We target the header container which has the gradient
        header = page.locator(".bg-gradient-to-r.from-orange-500.to-red-600")

        # Ensure it's visible before screenshot
        if header.is_visible():
            print("Header found!")
            header.screenshot(path="verification/header_verification.png")
        else:
            print("Header not found or not visible!")
            # Fallback: full page screenshot
            page.screenshot(path="verification/full_page_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_header()
