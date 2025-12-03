from playwright.sync_api import sync_playwright

def explore():
    with sync_playwright() as p:
        # Use a user agent to avoid immediate blocking, though headless mode often triggers captcha
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")

        # Search query
        query = "Sunrise sunset Bhubaneswar December 2025"
        # Google's weather widget usually appears for "sunrise location"

        print(f"Navigating to Google for: {query}")
        page.goto("https://www.google.com/search?q=sunrise+sunset+Bhubaneswar+December+4+2025")

        page.wait_for_timeout(3000) # Wait for widget

        # Take screenshot
        page.screenshot(path="google_explore.png")
        print("Screenshot saved.")

        # Dump HTML
        with open("google_explore.html", "w") as f:
            f.write(page.content())

        browser.close()

if __name__ == "__main__":
    explore()
