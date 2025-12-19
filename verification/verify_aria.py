from playwright.sync_api import sync_playwright, expect

def verify_aria_labels():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai tex to calnder.html")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        print("Checking Aria Labels...")

        # 1. Calendar Navigation
        prev_month = page.get_by_label("Previous Month")
        expect(prev_month).to_be_visible()
        print("✅ Previous Month button found")

        next_month = page.get_by_label("Next Month")
        expect(next_month).to_be_visible()
        print("✅ Next Month button found")

        # 2. Open Settings Modal to check its close button
        # Click the Settings button (it has text "Settings")
        page.get_by_role("button", name="Settings").click()
        # Wait for modal
        close_settings = page.get_by_label("Close Settings")
        expect(close_settings).to_be_visible()
        print("✅ Close Settings button found")
        # Close it
        close_settings.click()

        # 3. Open Crop Modal to check its close button
        # Click "Upload Image"
        page.get_by_role("button", name="Upload Image").click()
        # This triggers file input, but maybe we can't easily open the modal without uploading?
        # Actually the "Upload Image" button just clicks the hidden input.
        # But wait, there is no "Crop Modal" open button directly?
        # "handleImageUpload" opens it.
        # Let's skip Crop Modal interactive check if it requires file upload,
        # but we can check if the element exists in DOM (hidden) with the label.

        # We need to use valid state: 'hidden' because the modal is hidden.
        close_crop = page.get_by_label("Close Crop Modal")
        expect(close_crop).to_have_count(1) # It should exist in DOM
        print("✅ Close Crop Modal button found (in DOM)")

        # 4. Open Link Modal
        page.get_by_role("button", name="Insert Link").click()
        close_link = page.get_by_label("Close Link Modal")
        expect(close_link).to_be_visible()
        print("✅ Close Link Modal button found")
        close_link.click()

        # 5. Banner Carousel
        # The banner carousel might be hidden if no banners.
        # But we added labels to the static HTML buttons.
        # They have class "hidden md:flex", so they might not be "visible" if viewport is small or logic hides them.
        # But they should exist in DOM with the label.
        prev_banner = page.get_by_label("Previous Banner")
        expect(prev_banner).to_have_count(1)
        print("✅ Previous Banner button found (in DOM)")

        dismiss_banner = page.get_by_label("Dismiss Banner")
        expect(dismiss_banner).to_have_count(1)
        print("✅ Dismiss Banner button found (in DOM)")

        # Take a screenshot just to prove page loaded and we interacted
        page.screenshot(path="verification/aria_verification.png")
        print("📸 Screenshot taken")

        browser.close()

if __name__ == "__main__":
    verify_aria_labels()
