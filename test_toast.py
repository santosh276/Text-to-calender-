from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport to see the squishing
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        page = context.new_page()

        # Load the local HTML file
        page.goto('file:///app/ai tex to calnder.html')

        # Override the local storage to ensure the toast shows
        page.evaluate('''
            localStorage.setItem("panchang_cached_state", JSON.stringify({"config": {"location": {"lat": null, "lng": null, "name": ""}}}));
        ''')
        page.reload()

        # Wait for the toast to be shown
        page.wait_for_selector('#location-prompt-toast', state='visible', timeout=5000)

        # Force it to be fully opaque and transitioned
        page.evaluate('''
            const prompt = document.getElementById("location-prompt-toast");
            prompt.style.display = "block";
            prompt.style.opacity = "1";
            prompt.style.transform = "none";
        ''')

        # Take a screenshot of the toast area
        element = page.locator('#location-prompt-toast')
        element.screenshot(path='/app/toast_before.png')

        # Take a full page screenshot just in case
        page.screenshot(path='/app/page_before.png')

        browser.close()

if __name__ == '__main__':
    run()
