from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:8080/ai%20tex%20to%20calnder.html')

        # Verify Calendar Loaded
        page.wait_for_selector('.app-container')

        # Verify New Sidebar
        season_icon = page.wait_for_selector('.app-gradient svg') # SVG icon inside sidebar
        print("Sidebar Season Icon Found")

        # Verify Filters
        filters = page.wait_for_selector('#festival-filters button')
        print("Festival Filters Found")

        # Verify Panchang Section (Sunrise/Sunset)
        page.wait_for_selector('text=Daily Panchang')
        print("Panchang Section Found")

        # Verify Horoscope Grid
        page.wait_for_selector('text=Horoscope')
        horo_buttons = page.query_selector_all('button[onclick^="openHoroscopeModal"]')
        if len(horo_buttons) > 0:
            print(f"Horoscope Buttons Found: {len(horo_buttons)}")

        # Take Screenshot
        page.screenshot(path='verification/restored_features.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
