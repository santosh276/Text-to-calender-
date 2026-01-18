from playwright.sync_api import sync_playwright
import os

def test_background(page):
    # Get absolute path to the HTML file
    filepath = os.path.abspath("ai tex to calnder.html")
    page.goto(f"file://{filepath}")

    # Wait for the page to load (editor panel usually loads)
    page.wait_for_selector("#editor-panel")

    # Check body styles
    body_style = page.evaluate("""() => {
        const body = document.querySelector('body');
        const style = window.getComputedStyle(body);
        return {
            backgroundImage: style.backgroundImage,
            backgroundSize: style.backgroundSize
        }
    }""")

    print("Body Style:", body_style)

    # Take screenshot
    page.screenshot(path="verification/background_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_background(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
