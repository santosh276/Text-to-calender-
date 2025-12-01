from playwright.sync_api import sync_playwright
import os

def visual_check():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Set viewport to desktop size to check md:aspect-[8/1]
        page.set_viewport_size({"width": 1280, "height": 800})

        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # Inject complete valid data
        page.evaluate("""
            const validMonth = {
                month: 0,
                year: 2025,
                events: [{date: 1, engName: 'New Year', symbol: '*'}],
                panchang: {},
                horoscope: []
            };
            appState.monthsData = [validMonth];

            // Inject banner for Jan 1, 2025
            appState.details = {
                '2025-0-1': {
                    bannerUrl: 'https://via.placeholder.com/800x200',
                    tags: [],
                    bodyLines: []
                }
            };

            appState.activeMonthIndex = 0;
            render();
        """)

        # Wait for banner to appear
        try:
            page.wait_for_function("!document.getElementById('month-banner-container').classList.contains('hidden')", timeout=2000)

            # Take screenshot of the banner container specifically
            banner = page.locator("#month-banner-container")
            banner.screenshot(path="verification/banner_visual.png")
            print("Screenshot saved to verification/banner_visual.png")

        except Exception as e:
            print(f"Error: {e}")

        browser.close()

visual_check()
