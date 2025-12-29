from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_selector("#calendar-grid")
        page.screenshot(path="verification/after_changes.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
