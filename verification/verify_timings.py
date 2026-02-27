from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Load the local HTML file
    cwd = os.getcwd()
    file_url = f"file://{cwd}/ai tex to calnder.html"
    page.goto(file_url)

    # Wait for the page to load
    page.wait_for_timeout(2000)

    # Force appState initialization and location if needed
    page.evaluate("""
        if (!window.appState) window.appState = { config: {} };
        if (!window.appState.config) window.appState.config = {};
        window.appState.config.location = { lat: 28.6139, lng: 77.2090, name: 'New Delhi' };
        // Force render
        if (window.render) window.render();
    """)

    # Wait for timings to render
    page.wait_for_timeout(2000)

    # Force the section visible if it's hidden by CSS/logic
    page.evaluate("""
        const section = document.getElementById('sec-timings');
        if (section) {
            section.classList.remove('hidden');
            section.style.display = 'block';
        }
    """)

    page.wait_for_timeout(1000)

    # Scroll to the timings section
    section = page.locator("#sec-timings")
    if section.is_visible():
        section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/timings_section.png", full_page=False)
        print("Screenshot taken: verification/timings_section.png")
    else:
        print("Timings section not visible")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
