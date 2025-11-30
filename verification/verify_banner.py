from playwright.sync_api import sync_playwright, expect
import time

def verify_banner(page):
    # Navigate to the local server
    page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

    # Listen to console and page errors
    page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
    page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

    # Wait for the calendar to load (app title should appear)
    page.wait_for_selector("#app-title")

    # Fill the editor with data including banners
    input_data = """
::: config
@ Title : Banner Test
:::

::: calendar
++ January 2025 ++
01 * New Year
14 ! Makar Sankranti
:::

::: details
>> 01-01-2025
![Banner](https://via.placeholder.com/800x400/FF0000/FFFFFF?text=New+Year)
@ Tag : Celebration

>> 14-01-2025
![Banner](https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Makar+Sankranti)
@ Tag : Festival
:::
"""
    page.evaluate(f"""
        const editor = document.getElementById('editor');
        editor.value = `{input_data}`;
        editor.dispatchEvent(new Event('input'));
    """)

    # Wait for rendering
    time.sleep(2)

    # Debug info
    debug_info = page.evaluate("""() => {
        return {
            detailsKeys: Object.keys(appState.details),
            firstDetail: appState.details['2025-0-1'],
            activeMonth: appState.monthsData[appState.activeMonthIndex],
            monthIndex: appState.activeMonthIndex,
            containerClasses: document.getElementById('month-banner-container') ? document.getElementById('month-banner-container').className : 'Not Found',
            slidesContainer: document.getElementById('banner-slides') ? 'Exists' : 'Missing'
        }
    }""")
    print("Debug Info:", debug_info)

    # Verify the banner container is visible
    banner_container = page.locator("#month-banner-container")
    expect(banner_container).to_be_visible()

    page.screenshot(path="verification/banner_test.png", full_page=False)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            verify_banner(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification script failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
