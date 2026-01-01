from playwright.sync_api import sync_playwright

def verify_header():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for the calendar header to be visible
        # We look for the "January" text which is in our new h1 id="cal-month"
        page.wait_for_selector("#cal-month")

        # Ensure the gradient background is applied
        # We can't easily check CSS gradient via simple selector wait, but we can wait for the container
        page.wait_for_selector(".bg-gradient-to-b")

        # Take a screenshot of the preview container area
        # The preview container is #preview-container or we can just screenshot the viewport
        # Let's focus on the calendar header

        header = page.locator(".bg-gradient-to-b.from-\\[\\#D92D20\\]")
        # Since I used arbitrary values like from-[#D92D20], I need to escape special chars for selector or use a simpler one
        # The header has relative z-10 and bg-gradient-to-b

        # Let's just screenshot the whole preview container to see context
        preview = page.locator("#preview-container")
        preview.screenshot(path="verification/header_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_header()
