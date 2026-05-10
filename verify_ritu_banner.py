from playwright.sync_api import sync_playwright
import os

def run():
    html_path = f"file://{os.path.abspath('ai tex to calnder.html').replace(' ', '%20')}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(html_path)

        # Wait for the Ritu card to render
        page.wait_for_selector('.season-ui-card')

        # Ensure default image is loaded
        img_element = page.locator('#ritu-banner-img')
        initial_src = img_element.get_attribute('src')
        print(f"Initial image src: {initial_src}")

        # Open edit mode
        edit_btn = page.locator('button[title="Edit Image"]')
        edit_btn.click(force=True)

        # Verify form is visible
        form = page.locator('#ritu-edit-form')
        form.wait_for(state="visible")

        # Input test URL
        test_url = 'https://via.placeholder.com/600x200.png?text=Test+Ritu+Banner'
        input_field = page.locator('#ritu-image-input')
        input_field.fill(test_url)

        # Click save
        save_btn = page.locator('#ritu-edit-form button:has-text("Save")')
        save_btn.click()

        # Wait for render and verify new image
        page.wait_for_function(f'document.querySelector("#ritu-banner-img").src === "{test_url}"')

        new_src = img_element.get_attribute('src')
        print(f"New image src: {new_src}")

        assert new_src == test_url, f"Expected {test_url}, got {new_src}"
        print("Playwright test passed 100% for this exact string.")

        # Capture screenshot
        page.locator('.season-ui-card').screenshot(path='ritu_banner_updated.png')
        print("Screenshot captured as ritu_banner_updated.png")

        browser.close()

if __name__ == "__main__":
    run()
