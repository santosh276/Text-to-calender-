import re
from playwright.sync_api import Playwright, sync_playwright, expect

def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:8000/index.html")

    page.get_by_role("button", name="Fetch Data & Create Embeddings").click()

    # Wait for the status to show complete
    page.locator("#status").wait_for(state="visible")
    expect(page.locator("#status")).to_contain_text("Process Complete!", timeout=60000)

    print("Success: Process complete!")

    # Clean up
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
