from playwright.sync_api import sync_playwright, expect
import time

def verify_live_sync_missing_editor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:8084/ai%20tex%20to%20calnder.html")

        # Simulate "Downloaded App Mode" by removing the editor panel
        page.evaluate("""
            const editor = document.getElementById('editor');
            if (editor) editor.remove();
            // Also remove the editor panel container to mimic the download logic completely if needed,
            // but removing #editor is the key constraint in the user request.
        """)

        # Setup mock fetch
        mock_html = "<html><body><div id='contents'><p>::: config</p><p>@ Title : Downloaded Sync</p><p>:::</p></div></body></html>"

        page.evaluate(f"""
            window.fetch = async (url) => {{
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {{
                    console.log("FETCH HIT: " + url);
                    return {{
                        ok: true,
                        text: async () => `{mock_html}`
                    }};
                }}
                return Promise.resolve({{ ok: true, text: async () => "" }});
            }};
        """)

        # Manually trigger fetchLiveDoc (since we removed the button UI likely if we removed editor panel,
        # or we can just call the function directly to test logic).
        # The user request said "When you download the HTML... it will automatically connect... without you needing to touch the editor."
        # The auto-connect relies on stored config.

        # Let's verify the function logic directly first.
        page.evaluate("fetchLiveDoc('https://docs.google.com/document/d/e/TEST_ID/pub')")

        # Wait for update
        time.sleep(1)

        # Assertions
        # 1. The title should update if the update logic ran
        # The code does:
        # if (appState.config && appState.config.title) { document.getElementById('app-title').innerHTML = ... }
        # Our mock content has "@ Title : Downloaded Sync"

        # We need to ensure appState.config.title was updated by parseInput.
        # parseInput is global.

        # Check the displayed title
        title_el = page.locator("#app-title")
        expect(title_el).to_contain_text("Downloaded Sync")

        # Check Local Storage save
        saved_text = page.evaluate("localStorage.getItem('panchang_autosave_text')")
        assert "Downloaded Sync" in saved_text

        print("Verification passed: App updated without editor element.")

        browser.close()

if __name__ == "__main__":
    verify_live_sync_missing_editor()
