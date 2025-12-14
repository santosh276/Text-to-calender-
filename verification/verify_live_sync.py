from playwright.sync_api import sync_playwright, expect
import time

def verify_live_sync():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        page.goto("http://localhost:8083/ai%20tex%20to%20calnder.html")

        # Test 1: Manual Configuration
        page.evaluate(f"""
            window.fetch = async (url) => {{
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {{
                    return {{
                        ok: true,
                        text: async () => `<html><body><div id='contents'><p>::: config</p><p>@ Title : Synced Calendar</p><p>:::</p></div></body></html>`
                    }};
                }}
                return Promise.resolve({{ ok: true, text: async () => "" }});
            }};
            window.prompt = () => 'https://docs.google.com/document/d/e/TEST_ID/pub';
        """)

        page.get_by_role("button", name="Live Sync").click()
        expect(page.locator("#editor")).to_have_value("::: config\n@ Title : Synced Calendar\n:::")
        print("Manual sync passed.")

        # Test 2: Auto-Sync
        # We suspect the mock isn't persisting or applying correctly on reload.
        # Let's try navigating away and back? Or just rely on the fact that manual sync worked and verified the logic.
        # The prompt specifically asks: "Whenever you (or anyone else) opens that downloaded file, it will automatically connect..."
        # So I really should verify the auto-run logic.

        page.add_init_script(f"""
            window.fetch = async (url) => {{
                console.log('FETCH INTERCEPT: ' + url);
                if (url && typeof url === 'string' && url.includes('api.allorigins.win')) {{
                    return {{
                        ok: true,
                        text: async () => `<html><body><div id='contents'><p>::: config</p><p>@ Title : Synced Calendar</p><p>:::</p></div></body></html>`
                    }};
                }}
                // We need to return a valid promise for other fetches (e.g. fonts)
                return Promise.resolve({{ ok: true, text: async () => "" }});
            }};
        """)

        page.reload()
        time.sleep(2)

        # Check logs to see if "Found Live URL" was printed by the app
        # Check if FETCH INTERCEPT was printed

        current_val = page.locator("#editor").input_value()
        if "Synced Calendar" in current_val:
             print("Auto sync passed.")
        else:
             print("Auto sync failed.")

        browser.close()

if __name__ == "__main__":
    verify_live_sync()
