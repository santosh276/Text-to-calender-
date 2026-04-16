from playwright.sync_api import sync_playwright
import os

def test_exported_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Open local HTML file directly
        file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
        page.goto(file_url)
        page.wait_for_load_state("networkidle")

        # Click export button
        # Wait, the problem is testing the downloaded file. Let's just create a test version where we strip EDITOR LOGIC manually like the export does.

        # First we need to simulate the downloaded file by actually generating it!
        # Click download
        with page.expect_download() as download_info:
            # We need to trigger the downloadCalendar function
            page.evaluate("downloadCalendar()")

        download = download_info.value
        download.save_as("test_download.html")

        # Now open the downloaded file
        page2 = context.new_page()
        page2.goto(f"file://{os.path.abspath('test_download.html')}")

        try:
            page2.wait_for_load_state("networkidle")
            # Wait a sec
            page2.wait_for_timeout(2000)

            # Check for "Something went wrong"
            if page2.locator("text=Something went wrong").count() > 0:
                print("BUG FOUND: 'Something went wrong' overlay is visible.")
                error_msg = page2.locator(".text-red-500").inner_text() if page2.locator(".text-red-500").count() > 0 else "Unknown error"
                print(f"Error text on page: {error_msg}")
                # We can also check console logs
            else:
                print("App loaded successfully without error overlay!")
        except Exception as e:
            print(f"Exception while testing downloaded file: {e}")

        browser.close()

if __name__ == "__main__":
    test_exported_app()
