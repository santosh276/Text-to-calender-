import os
import subprocess
import time
from playwright.sync_api import sync_playwright

def run_server():
    # Start a simple HTTP server in the background
    proc = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)  # Give it a moment to start
    return proc

def capture_search_bar():
    server_proc = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            # Set a standard viewport
            page.set_viewport_size({"width": 1280, "height": 800})

            # Go to the local page
            page.goto("http://localhost:8000/ai tex to calnder.html")

            # Wait for the search input to be visible
            search_input = page.wait_for_selector("#festival-search")

            # The search bar is inside a wrapper div with class "relative mb-3 group"
            # Let's find that wrapper to take a screenshot of the whole component
            # The structure is:
            # <div class="relative mb-3 group"> ... input ... </div>
            # We can find the input, then get the parent.
            wrapper = search_input.evaluate_handle("el => el.parentElement")

            # Take screenshot of the wrapper
            wrapper.screenshot(path="verification/search_bar_before.png")
            print("Screenshot saved to verification/search_bar_before.png")

            browser.close()
    finally:
        server_proc.kill()

if __name__ == "__main__":
    # Ensure verification dir exists
    if not os.path.exists("verification"):
        os.makedirs("verification")
    capture_search_bar()
