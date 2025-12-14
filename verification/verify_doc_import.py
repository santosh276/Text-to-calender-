from playwright.sync_api import sync_playwright, expect
import time

def verify_doc_import():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8081/ai%20tex%20to%20calnder.html")

        # Check if the "Import Doc" button exists
        import_btn = page.get_by_role("button", name="Import Doc")
        expect(import_btn).to_be_visible()

        # Mock the prompt to return a valid Doc URL
        # and mock the fetch to return some HTML content
        page.evaluate("""
            window.prompt = () => 'https://docs.google.com/document/d/e/2PACX-1vR_TEST_ID/pub';

            // Store original fetch
            const originalFetch = window.fetch;

            window.fetch = async (url, options) => {
                // Check if the URL is the proxy URL we expect
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {
                    return {
                        ok: true,
                        text: async () => '<html><head></head><body><div id="contents">::: config\\n@ Title : Doc Calendar\\n:::\\n\\n::: calendar\\n++ January 2025 ++ \\n01 * Doc Event\\n:::</div></body></html>'
                    };
                }
                // Fallback for other fetches if any
                return originalFetch(url, options);
            };
        """)

        # Click the button
        import_btn.click()

        # Wait for the editor to update
        editor = page.locator("#editor")
        expect(editor).to_have_value("::: config\n@ Title : Doc Calendar\n:::\n\n::: calendar\n++ January 2025 ++ \n01 * Doc Event\n:::")

        # Take a screenshot
        page.screenshot(path="verification/doc_import_verification.png")
        print("Verification successful, screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_doc_import()
