from playwright.sync_api import sync_playwright, expect
import time

def verify_drive_import():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Check if the "Import Drive" button exists
        import_btn = page.get_by_role("button", name="Import Drive")
        expect(import_btn).to_be_visible()

        # Mock the prompt to return a valid Drive URL
        # and mock the fetch to return some text content
        page.evaluate("""
            window.prompt = () => 'https://drive.google.com/file/d/1-1dJ9RDv3_TEST_ID/view?usp=sharing';

            // Store original fetch
            const originalFetch = window.fetch;

            window.fetch = async (url, options) => {
                // Check if the URL is the proxy URL we expect
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {
                    return {
                        ok: true,
                        text: async () => '::: config\\n@ Title : Imported Calendar\\n:::\\n\\n::: calendar\\n++ January 2025 ++ \\n01 * Test Event\\n:::'
                    };
                }
                // Fallback for other fetches if any
                return originalFetch(url, options);
            };
        """)

        # Click the button
        import_btn.click()

        # Wait for the editor to update
        # For <textarea>, .to_contain_text checks children text nodes which is the initial content.
        # We need to check the 'value' property.
        editor = page.locator("#editor")
        expect(editor).to_have_value("::: config\n@ Title : Imported Calendar\n:::\n\n::: calendar\n++ January 2025 ++ \n01 * Test Event\n:::")

        # Take a screenshot
        page.screenshot(path="verification/drive_import_verification.png")
        print("Verification successful, screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_drive_import()
