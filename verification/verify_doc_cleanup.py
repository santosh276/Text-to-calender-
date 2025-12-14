from playwright.sync_api import sync_playwright, expect
import time

def verify_doc_cleanup():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8082/ai%20tex%20to%20calnder.html")

        # Check if the "Import Doc" button exists
        import_btn = page.get_by_role("button", name="Import Doc")
        expect(import_btn).to_be_visible()

        # Mock the prompt to return a valid Doc URL
        # and mock the fetch to return HTML content containing styles and structured text
        # This simulates the "wrong data" scenario to check if cleanup works
        mock_html = """
        <html>
        <head>
            <style>
                ol{margin:0;padding:0}
                table td,table th{padding:0}
                .c0{color:#000000;}
            </style>
        </head>
        <body>
            <div id="header">Banner Header</div>
            <div id="contents">
                <p>::: config</p>
                <p>@ Title : Cleaned Calendar</p>
                <p>:::</p>
                <br>
                <p>::: calendar</p>
                <p>++ January 2026 ++</p>
                <p>01 * Clean Event</p>
                <p>:::</p>
            </div>
            <div id="footer">Footer Info</div>
        </body>
        </html>
        """

        page.evaluate(f"""
            window.prompt = () => 'https://docs.google.com/document/d/e/2PACX-1vR_TEST_ID/pub';

            // Store original fetch
            const originalFetch = window.fetch;

            window.fetch = async (url, options) => {{
                // Check if the URL is the proxy URL we expect
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {{
                    return {{
                        ok: true,
                        text: async () => `{mock_html.replace('`', '\\`').replace('\n', '\\n')}`
                    }};
                }}
                // Fallback for other fetches if any
                return originalFetch(url, options);
            }};
        """)

        # Click the button
        import_btn.click()

        # Wait for the editor to update
        editor = page.locator("#editor")

        # Assertions:
        # 1. CSS content should NOT be present (e.g. "ol{margin:0")
        expect(editor).not_to_contain_text("ol{margin:0")
        expect(editor).not_to_contain_text("padding:0")

        # 2. Header/Footer should be removed
        expect(editor).not_to_contain_text("Banner Header")
        expect(editor).not_to_contain_text("Footer Info")

        # 3. Content should be present and formatted
        # We expect newlines between paragraphs
        # Note: expect(locator).to_have_value() checks exact value.
        # Let's get the value and print it for inspection, and do assertions.
        time.sleep(1) # Give a moment for value set
        value = editor.input_value()
        print(f"Editor Content:\n{value}")

        assert "::: config" in value
        assert "@ Title : Cleaned Calendar" in value
        assert "::: calendar" in value
        assert "01 * Clean Event" in value

        # Check structure (newlines)
        # We expect something like:
        # ::: config
        # @ Title : Cleaned Calendar
        # :::
        #
        # ::: calendar
        # ...

        if "::: config\n@ Title : Cleaned Calendar" in value:
            print("Formatting looks correct.")
        else:
            print("Formatting might be off.")

        browser.close()

if __name__ == "__main__":
    verify_doc_cleanup()
