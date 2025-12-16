from playwright.sync_api import sync_playwright
import urllib.parse
import sys

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    filename = "ai tex to calnder.html"
    encoded_filename = urllib.parse.quote(filename)
    url = f"http://localhost:8080/{encoded_filename}"
    print(f"Navigating to {url}")
    page.goto(url)

    # Wait for the buttons to be visible
    print("Waiting for buttons...")
    try:
        page.wait_for_selector("text=Live Sync Docs", timeout=5000)
        page.wait_for_selector("text=Live Sync GitHub", timeout=5000)
    except Exception as e:
        print(f"Error waiting for selectors: {e}")
        # Take full page screenshot to debug
        page.screenshot(path="verification/debug_full_page.png")
        browser.close()
        return

    # Docs Button
    docs_btn = page.locator("button:has-text('Live Sync Docs')")
    docs_icon = docs_btn.locator("i")
    icon_class = docs_icon.get_attribute('class')
    print(f"Docs Button Icon Class: {icon_class}")

    # GitHub Button
    github_btn = page.locator("button:has-text('Live Sync GitHub')")
    btn_class = github_btn.get_attribute('class')
    print(f"GitHub Button Class: {btn_class}")

    # Screenshot
    # The header is the first child div of #editor-panel
    header = page.locator("#editor-panel > div").first
    header.screenshot(path="verification/buttons_screenshot.png")
    print("Screenshot taken: verification/buttons_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
