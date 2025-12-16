
from playwright.sync_api import sync_playwright, expect
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the app
        url = "http://localhost:8080/ai%20tex%20to%20calnder.html"
        page.goto(url)

        # Wait for render
        page.wait_for_selector("#calendar-grid", state="visible")
        time.sleep(1) # Extra wait for animations

        # 1. Verify basic render
        print("Initial render complete.")
        page.screenshot(path="verification/step1_initial_render.png")

        # 2. Check if caching logic is working (by checking Console logs or localStorage)
        # We can evaluate js

        # Set some data in editor
        editor = page.locator("#editor")
        editor.fill("::: config\n@ Title : Cached Title Test\n:::")

        # Wait for debounce and render (parseInput)
        time.sleep(2)

        # Verify title changed
        title = page.locator("#app-title")
        expect(title).to_contain_text("Cached Title Test")
        print("Title updated.")

        # Check if saved to cache
        cache_state = page.evaluate("localStorage.getItem('panchang_cached_state')")
        if cache_state and "Cached Title Test" in cache_state:
            print("State saved to cache successfully.")
        else:
            print("State NOT saved to cache.")
            print("Cache Content:", cache_state)

        # 3. Simulate reload (Fast Boot check)
        # We reload the page. Since we are on localhost, it should load from cache.
        page.reload()
        page.wait_for_selector("#app-title", state="visible")

        # Verify title immediately
        expect(title).to_contain_text("Cached Title Test")
        print("Title persisted after reload (Fast Boot verified).")

        page.screenshot(path="verification/step2_after_reload.png")

        browser.close()

if __name__ == "__main__":
    run()
