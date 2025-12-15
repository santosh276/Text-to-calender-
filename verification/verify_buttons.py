
from playwright.sync_api import sync_playwright, expect

def verify_buttons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate via HTTP server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Check "Live Sync Docs" button exists and has correct text
        live_sync_btn = page.get_by_role("button", name="Live Sync Docs")
        expect(live_sync_btn).to_be_visible()

        # Check "Import Doc" button does NOT exist
        count = page.get_by_role("button", name="Import Doc").count()
        assert count == 0, f"Found {count} buttons with text 'Import Doc', expected 0"

        # Take screenshot of the header
        header = page.locator(".bg-black.border-b.border-gray-800").first
        header.screenshot(path="verification/header_buttons.png")

        browser.close()

if __name__ == "__main__":
    verify_buttons()
