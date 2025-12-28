from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        try:
            page.goto("http://localhost:8080/ai tex to calnder.html")
            # Wait for content to render (though it's static/JS rendered)
            page.wait_for_timeout(2000)
            page.screenshot(path="verification/screenshot_after.png", full_page=True)
            print("Screenshot saved to verification/screenshot_after.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
