
from playwright.sync_api import sync_playwright

def verify_sync_prompt():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load App
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")
        page.wait_for_load_state("networkidle")

        # 1. Simulate setting up a sync, then turning it off
        # We inject state directly to save time
        page.evaluate("""() => {
            appState.config.syncDocsUrl = "https://docs.google.com/test-doc/pub";
            appState.config.liveUrl = undefined; // Toggled off
            saveConfigToStorage();
        }""")

        # 2. Trigger configureLiveSync and capture the prompt default
        # We override window.prompt to capture the value
        default_value = page.evaluate("""() => {
            let capturedDefault = null;
            window.prompt = (msg, def) => {
                capturedDefault = def;
                return null; // Cancel
            };
            configureLiveSync();
            return capturedDefault;
        }""")

        print(f"Captured Default Value for Docs: '{default_value}'")

        if default_value == "https://docs.google.com/test-doc/pub":
            print("PASS: Prompt defaulted to saved Docs URL.")
        else:
            print("FAIL: Prompt did not default to saved Docs URL.")

        # 3. Repeat for GitHub
        page.evaluate("""() => {
            appState.config.syncGitHubUrl = "https://github.com/user/repo/data.txt";
            appState.config.liveUrl = undefined;
        }""")

        github_default = page.evaluate("""() => {
            let capturedDefault = null;
            window.prompt = (msg, def) => {
                capturedDefault = def;
                return null;
            };
            configureGitHubSync();
            return capturedDefault;
        }""")

        print(f"Captured Default Value for GitHub: '{github_default}'")

        if github_default == "https://github.com/user/repo/data.txt":
            print("PASS: Prompt defaulted to saved GitHub URL.")
        else:
            print("FAIL: Prompt did not default to saved GitHub URL.")

        browser.close()

if __name__ == "__main__":
    verify_sync_prompt()
