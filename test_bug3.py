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

        # Add a custom card first so it's in the state
        page.evaluate("""
            const editor = document.getElementById('editor');
            editor.value = "::: More tab\\nHyperlink: [https://example.com/testlink]\\nTitle: [Test Export Card]\\nDescription: [Desc]\\nImage Link: [img.jpg]\\n:::";
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        """)

        page.wait_for_timeout(1000)

        with page.expect_download() as download_info:
            page.evaluate("downloadCalendar()")

        download = download_info.value
        download.save_as("test_download3.html")

        # Now open the downloaded file
        page2 = context.new_page()
        page2.goto(f"file://{os.path.abspath('test_download3.html')}")

        try:
            page2.wait_for_load_state("networkidle")
            page2.wait_for_timeout(2000)

            # Switch to "More" view where custom cards live
            page2.evaluate("toggleView('more')")
            page2.wait_for_timeout(1000)

            # Look for the card
            if page2.locator("text=Test Export Card").count() > 0:
                print("SUCCESS: Custom card found in downloaded app.")
            else:
                print("BUG FOUND: Custom card missing in downloaded app.")

            if page2.locator("a[href='https://example.com/testlink']").count() > 0:
                print("SUCCESS: Custom card link found in downloaded app.")
            else:
                print("BUG FOUND: Custom card link missing in downloaded app.")

        except Exception as e:
            print(f"Exception while testing: {e}")

        browser.close()

if __name__ == "__main__":
    test_exported_app()
