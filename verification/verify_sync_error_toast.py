from playwright.sync_api import sync_playwright
import os

def verify_sync_error():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the page (assuming server is running on 8000)
        page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html")

        # Trigger the GitHub fetch with a known failing URL to provoke the error
        # We use a non-existent port on localhost to ensure connection failure
        page.evaluate("fetchGitHubData('http://localhost:9999/fail.txt')")

        # Wait for the toast to appear
        # We look for the text "Sync Error:" which is what we just changed it to
        try:
            # We expect a toast with "Sync Error:"
            toast = page.wait_for_selector("text=Sync Error:", timeout=5000)
            if toast:
                print("Toast found with correct text.")
                text = toast.inner_text()
                print(f"Toast text: {text}")

                if "GitHub Sync Error" in text:
                    print("FAILURE: Old text 'GitHub Sync Error' still present.")
                elif "Sync Error" in text:
                    print("SUCCESS: New text 'Sync Error' confirmed.")

        except Exception as e:
            print(f"Error finding toast: {e}")

        # Capture screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/sync_error_toast.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_sync_error()
