from playwright.sync_api import sync_playwright
import urllib.parse
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    filename = "ai tex to calnder.html"
    encoded_filename = urllib.parse.quote(filename)
    url = f"http://localhost:8080/{encoded_filename}"
    page.goto(url)

    # 1. Take a screenshot of the buttons
    buttons_panel = page.locator("#editor-panel > div").first
    buttons_panel.screenshot(path="verification/sync_buttons.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
