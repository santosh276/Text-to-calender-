from playwright.sync_api import sync_playwright
import os

def visual_unhide():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # 1. Inject Data
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

        # 2. Click Close Button
        banner = page.locator("#month-banner-container")
        close_btn = banner.locator("button[onclick='dismissBanner(event)']")
        # Ensure it is visible first
        page.wait_for_function("!document.getElementById('month-banner-container').classList.contains('hidden')")
        close_btn.click()

        # 3. Open Settings
        page.evaluate("openSettingsModal()")
        page.wait_for_timeout(500)

        # 4. Take screenshot of settings modal showing the toggle
        modal = page.locator("#settings-modal .modal-content")
        modal.screenshot(path="verification/settings_toggle.png")
        print("Screenshot saved to verification/settings_toggle.png")

        browser.close()

visual_unhide()
