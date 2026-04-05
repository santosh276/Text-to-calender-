import time
from playwright.sync_api import sync_playwright

PORT = 8000

with sync_playwright() as p:
    # Desktop
    browser = p.chromium.launch()
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    page.goto(f"http://localhost:{PORT}/ai tex to calnder.html")
    page.wait_for_load_state("networkidle")

    # Wait until app is ready by checking for toggleView
    page.wait_for_function("typeof toggleView !== 'undefined'")

    # Mock data to show a festival
    page.evaluate("""
        if(!window.appState) window.appState = {};
        window.appState.monthsData = [
            {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                days: [
                    {
                        day: new Date().getDate() + 1,
                        festival: "Test Festival"
                    }
                ]
            }
        ];
        window.appState.details = { "Test Festival": { img: "https://via.placeholder.com/800x400" } };
        window.appState.recurringDetails = {};
    """)
    page.evaluate("toggleView('festivals')")
    page.evaluate("if(typeof renderAppFestivalView !== 'undefined') renderAppFestivalView()")

    # Wait for the hero banner
    page.wait_for_selector("#hero-festival-banner:visible", state="visible")
    time.sleep(1)

    # Hide editor panel for a clean shot
    page.evaluate("""
        var el = document.getElementById('editor-panel');
        if(el) el.style.display = 'none';
    """)

    banner = page.locator("#hero-festival-banner")
    banner.screenshot(path="desktop_banner_fixed.png")
    browser.close()

print("Screenshots captured successfully.")
