import time
import os
from playwright.sync_api import sync_playwright

current_dir = os.getcwd()
file_url = f'file://{current_dir}/ai tex to calnder.html'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1024, 'height': 768})
    page.goto(file_url)
    page.evaluate("toggleView('menu')")
    time.sleep(1)

    # Take screenshot before scroll
    page.screenshot(path="before_scroll.png")

    browser.close()
