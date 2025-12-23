from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1000})

        # 1. Load Page
        page.goto("http://localhost:8080/ai tex to calnder.html")
        page.wait_for_selector("#calendar-grid .grid-cell")

        # 2. Wait for rendering
        time.sleep(2)

        # 3. Screenshot Main View (Sidebar + Grid)
        # Focus on the Sidebar specifically too?
        # Let's take full page.
        page.screenshot(path="verification/main_view.png")

        browser.close()

if __name__ == "__main__":
    run()
