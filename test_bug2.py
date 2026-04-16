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
            editor.value = "::: More tab\\nHyperlink: [https://example.com]\\nTitle: [Test Card]\\nDescription: [Desc]\\nImage Link: [img.jpg]\\n:::";
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        """)

        page.wait_for_timeout(1000)

        with page.expect_download() as download_info:
            page.evaluate("downloadCalendar()")

        download = download_info.value
        download.save_as("test_download2.html")

        # Now open the downloaded file
        page2 = context.new_page()

        # Capture console errors
        console_errors = []
        page2.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page2.on("pageerror", lambda err: console_errors.append(str(err)))

        page2.goto(f"file://{os.path.abspath('test_download2.html')}")

        try:
            page2.wait_for_load_state("networkidle")
            page2.wait_for_timeout(2000)

            if page2.locator("text=Something went wrong").count() > 0:
                print("BUG FOUND: 'Something went wrong' overlay is visible.")
            else:
                print("App loaded successfully!")

            if console_errors:
                print(f"Console errors: {console_errors}")
        except Exception as e:
            print(f"Exception while testing: {e}")

        browser.close()

if __name__ == "__main__":
    test_exported_app()
