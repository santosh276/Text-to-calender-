from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        cwd = os.getcwd()
        if not cwd.startswith('/'):
            cwd = '/' + cwd

        file_url = f"file://{cwd}/ai tex to calnder.html"
        page.goto(file_url)

        page.wait_for_selector("#calendar-grid")

        page.evaluate("""
            const newConfig = appState.config || {};
            newConfig.location = {lat: 28.6139, lng: 77.2090, name: "New Delhi"};
            appState.config = newConfig;
            localStorage.setItem('panchangConfig', JSON.stringify(newConfig));
            // Trigger render to update UI
            render();
        """)

        time.sleep(1)

        page.locator("#calendar-grid .grid-cell").filter(has_text="15").first.click()

        page.wait_for_selector("#day-modal .modal-content", state="visible")

        # Verify "Astro Details" text is present
        print("Checking for Astro Details...")
        if page.locator("text=Astro Details").is_visible():
            print("SUCCESS: Astro Details section found.")
        else:
            print("WARNING: Astro Details section not immediately visible (might be below fold).")

        # Scroll down in the modal to reveal the Astro Details
        # The scrollable container is likely the one with overflow-y-auto inside #day-modal
        # In the HTML structure: #day-modal > .modal-content > .h-full.overflow-y-auto
        print("Scrolling down...")
        page.eval_on_selector("#day-modal .overflow-y-auto", "el => el.scrollTop = el.scrollHeight")

        time.sleep(1) # Wait for scroll

        screenshot_path = os.path.join(cwd, "verification/astro_details_scrolled.png")
        print(f"Saving screenshot to {screenshot_path}")
        page.screenshot(path=screenshot_path)

        browser.close()

if __name__ == "__main__":
    run()
