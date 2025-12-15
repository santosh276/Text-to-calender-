from playwright.sync_api import sync_playwright, expect
import time

def verify_lightweight_download():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a new context for better isolation
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()

        # Navigate to the file directly (served via http server)
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # 1. Trigger Download
        # The download button calls downloadCalendar().
        # We need to intercept the download.

        # Click "Download HTML" button
        # There are two buttons, one for HTML and one for TXT.
        # HTML button has text "Download HTML"

        with page.expect_download() as download_info:
            page.get_by_role("button", name="Download HTML").click()

        download = download_info.value
        download_path = "verification/downloaded_calendar.html"
        download.save_as(download_path)
        print(f"Downloaded file to {download_path}")

        # 2. Verify the Downloaded File content
        # We need to open the downloaded file and check if it has the Loading Screen
        # and if monthsData is empty.

        page_downloaded = context.new_page()
        import os
        abs_path = os.path.abspath(download_path)
        page_downloaded.goto(f"file://{abs_path}")

        # Check for Loading Screen
        loader = page_downloaded.locator("#initial-loader")
        if loader.is_visible():
            print("Loader is visible initially.")
        else:
            print("Loader NOT visible initially (might have been removed fast if localStorage has data).")
            # Clear localStorage and reload to verify loader persists if no data
            page_downloaded.evaluate("localStorage.clear()")
            page_downloaded.reload()
            loader = page_downloaded.locator("#initial-loader")
            expect(loader).to_be_visible()
            print("Loader visible after clearing localStorage and reloading.")

        # Take screenshot of the loader
        page_downloaded.screenshot(path="verification/loader_screen.png")
        print("Screenshot of loader taken.")

        # Check that exportedData has empty monthsData
        exported_data = page_downloaded.evaluate("window.exportedData")
        if exported_data['monthsData'] == []:
            print("Verified: exportedData.monthsData is empty.")
        else:
            print(f"Error: exportedData.monthsData is NOT empty: {exported_data['monthsData']}")

        # Check if Editor Panel is removed
        if page_downloaded.locator("#editor-panel").count() == 0:
            print("Verified: Editor Panel is removed.")
        else:
            print("Error: Editor Panel is present.")

        # Check if Download Button is removed (id="download-btn" ? No, the button in nav is removed)
        # The user code removes #download-btn if it exists.
        # But in the original file, the download button calls downloadCalendar() and is inside editor panel which is removed.
        # Wait, the code says:
        # const navBtn = clone.querySelector('#download-btn'); if(navBtn) navBtn.remove();
        # I should check if there is any #download-btn in the original file.
        # In the original file, download button is <button onclick="downloadCalendar()" ...> inside #editor-panel.
        # So removing #editor-panel removes it.
        # There is no element with id="download-btn" in the provided file content.
        # But the code adds check for it, maybe for safety.

        browser.close()

if __name__ == "__main__":
    verify_lightweight_download()
