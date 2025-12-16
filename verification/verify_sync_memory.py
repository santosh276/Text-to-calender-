from playwright.sync_api import sync_playwright
import urllib.parse
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    filename = "ai tex to calnder.html"
    encoded_filename = urllib.parse.quote(filename)
    url = f"http://localhost:8080/{encoded_filename}"
    print(f"Navigating to {url}")
    page.goto(url)

    # Define test URLs
    DOC_URL = "https://docs.google.com/document/d/e/2PACX-1vT_FAKE_ID/pub"
    GITHUB_URL = "https://raw.githubusercontent.com/user/repo/main/data.txt"

    # --- STEP 1: Set Docs URL ---
    print("Setting Docs URL...")

    # We need to handle the prompt dialog
    def handle_docs_dialog(dialog):
        print(f"Docs Dialog message: {dialog.message}")
        print(f"Docs Dialog default value: {dialog.default_value}")
        dialog.accept(DOC_URL)

    page.once("dialog", handle_docs_dialog)
    page.click("text=Live Sync Docs")

    # Wait a bit for processing
    time.sleep(1)

    # --- STEP 2: Set GitHub URL ---
    print("Setting GitHub URL...")

    def handle_github_dialog(dialog):
        print(f"GitHub Dialog message: {dialog.message}")
        print(f"GitHub Dialog default value: {dialog.default_value}")
        # Verify it didn't pick up the Docs URL
        if dialog.default_value == DOC_URL:
             print("ERROR: GitHub dialog showed Docs URL!")
        dialog.accept(GITHUB_URL)

    page.once("dialog", handle_github_dialog)
    page.click("text=Live Sync GitHub")

    time.sleep(1)

    # --- STEP 3: Verify Docs URL Memory ---
    print("Verifying Docs URL Memory...")

    docs_memory_correct = False

    def verify_docs_memory(dialog):
        nonlocal docs_memory_correct
        print(f"Docs Memory Dialog default value: {dialog.default_value}")
        if dialog.default_value == DOC_URL:
            print("SUCCESS: Docs URL was remembered correctly.")
            docs_memory_correct = True
        else:
            print(f"FAILURE: Expected {DOC_URL}, got {dialog.default_value}")
        dialog.dismiss() # Close without changing

    page.once("dialog", verify_docs_memory)
    page.click("text=Live Sync Docs")

    if not docs_memory_correct:
        print("Test Failed: Docs memory incorrect")
        browser.close()
        return

    # --- STEP 4: Verify GitHub URL Memory ---
    print("Verifying GitHub URL Memory...")

    github_memory_correct = False

    def verify_github_memory(dialog):
        nonlocal github_memory_correct
        print(f"GitHub Memory Dialog default value: {dialog.default_value}")
        if dialog.default_value == GITHUB_URL:
            print("SUCCESS: GitHub URL was remembered correctly.")
            github_memory_correct = True
        else:
             print(f"FAILURE: Expected {GITHUB_URL}, got {dialog.default_value}")
        dialog.dismiss()

    page.once("dialog", verify_github_memory)
    page.click("text=Live Sync GitHub")

    if not github_memory_correct:
        print("Test Failed: GitHub memory incorrect")
    else:
        print("ALL TESTS PASSED: Separate memory confirmed.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
