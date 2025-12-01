from playwright.sync_api import sync_playwright
import os

def visual_download_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # Inject Data for Banner
        page.evaluate("""
            const validMonth = {
                month: 0,
                year: 2025,
                events: [{date: 1, engName: 'New Year', symbol: '*'}],
                panchang: {},
                horoscope: []
            };
            appState.monthsData = [validMonth];
            appState.details = {
                '2025-0-1': { bannerUrl: 'https://via.placeholder.com/800x200', tags: [], bodyLines: [] }
            };
            appState.activeMonthIndex = 0;
            render();
        """)

        # Take screenshot of Navbar showing the Settings button
        navbar = page.locator("nav")
        navbar.screenshot(path="verification/navbar_settings.png")
        print("Screenshot saved to verification/navbar_settings.png")

        browser.close()

visual_download_features()
