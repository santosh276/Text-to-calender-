import os
import subprocess
import time
from playwright.sync_api import sync_playwright

def run_server():
    proc = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)
    return proc

def verify_search_ui():
    server_proc = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.set_viewport_size({"width": 1280, "height": 800})

            page.goto("http://localhost:8000/ai tex to calnder.html")

            # Get the search input
            search_input = page.wait_for_selector("#festival-search")

            # Check properties
            placeholder = search_input.get_attribute("placeholder")
            print(f"Placeholder: {placeholder}")
            assert placeholder == "Search festivals...", f"Expected placeholder 'Search festivals...', got '{placeholder}'"

            # Check CSS class for rounded-full
            # Note: We can check class list or computed style
            # Computed style is better for final render check, but class check is easier/faster for specific implementation
            classes = search_input.get_attribute("class")
            print(f"Classes: {classes}")
            assert "rounded-full" in classes, "Expected 'rounded-full' class not found"
            assert "rounded-xl" not in classes, "Found 'rounded-xl' class, should be removed"

            # Take screenshot
            wrapper = search_input.evaluate_handle("el => el.parentElement")
            wrapper.screenshot(path="verification/search_bar_after.png")
            print("Screenshot saved to verification/search_bar_after.png")

            browser.close()
    finally:
        server_proc.kill()

if __name__ == "__main__":
    verify_search_ui()
