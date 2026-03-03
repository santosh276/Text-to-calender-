from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Check for any console errors
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

        # Open the calendar page
        page.goto("file:///app/ai tex to calnder.html")
        page.wait_for_timeout(2000) # let JS execute

        page.screenshot(path="panchang_view.png", full_page=True)

        # Check if 'Upcoming Special Tithis' is present
        print("Checking for Upcoming Special Tithis...")
        upcoming_locator = page.locator("text=Upcoming Special Tithis")
        count = upcoming_locator.count()
        print(f"Found 'Upcoming Special Tithis' elements: {count}")

        if count > 0:
            print("Successfully found 'Upcoming Special Tithis'.")
        else:
            print("ERROR: Could not find 'Upcoming Special Tithis'.")

        print("Console errors:")
        for e in errors:
            print(e)

        browser.close()

if __name__ == "__main__":
    run()
