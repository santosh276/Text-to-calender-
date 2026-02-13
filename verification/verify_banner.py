from playwright.sync_api import sync_playwright
import time
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"BROWSER ERROR: {exc}"))

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        page.wait_for_selector("#calendar-grid")

        # --- Test Case 1: No Banner ---
        print("Testing without banner...")

        cell = page.locator(".grid-cell").filter(has_text="15").first
        cell.click()

        page.wait_for_selector("#day-modal:not(.modal-hidden)")
        time.sleep(1)

        page.screenshot(path="verification/no_banner.png")

        content = page.content()
        if "Day Memory / Banner" in content:
            print("FAILURE: 'Day Memory / Banner' text found in DOM.")
        else:
            print("SUCCESS: 'Day Memory / Banner' text not found.")

        banner_exists = page.evaluate("""() => {
            const modal = document.getElementById('day-modal');
            return modal.innerHTML.includes('background-image: url');
        }""")

        if banner_exists:
            print("FAILURE: Banner HTML found when none should be set.")
        else:
            print("SUCCESS: No banner HTML found.")

        # Close modal
        print("Closing modal...")
        page.locator("#day-modal button i.fa-times").first.click()
        time.sleep(1)

        # --- Test Case 2: With Banner ---
        print("Testing with banner...")

        page.evaluate("""() => {
            console.log("Injecting banner...");
            const year = appState.viewDate.year;
            const month = appState.viewDate.month;
            const dayKey = `${year}-${month}-15`;

            if (!appState.details) appState.details = {};

            // Inject correct structure with bodyLines and tags
            appState.details[dayKey] = [{
                bannerUrl: 'https://via.placeholder.com/800x400',
                bodyLines: [],
                tags: []
            }];
            console.log("Banner injected.");

            const mData = appState.monthsData.find(m => m.month === month && m.year === year);
            if (mData) {
                openDayModal(15, mData);
            } else {
                console.error("Could not find month data for", year, month);
            }
        }""")

        print("Waiting for modal...")
        try:
            page.wait_for_selector("#day-modal:not(.modal-hidden)", timeout=5000)
        except Exception as e:
            print("Modal did not open:", e)
            page.screenshot(path="verification/modal_failure.png")
            browser.close()
            return

        time.sleep(1)

        page.screenshot(path="verification/with_banner.png")

        banner_exists = page.evaluate("""() => {
            const modal = document.getElementById('day-modal');
            return modal.innerHTML.includes('background-image: url') && modal.innerHTML.includes('via.placeholder.com');
        }""")

        if banner_exists:
            print("SUCCESS: Banner is visible.")
        else:
            print("FAILURE: Banner NOT visible after injection.")

        content = page.content()
        if "Day Memory / Banner" in content:
            print("FAILURE: 'Day Memory / Banner' text reappeared.")
        else:
            print("SUCCESS: 'Day Memory / Banner' text still absent.")

        browser.close()

if __name__ == "__main__":
    run_verification()
