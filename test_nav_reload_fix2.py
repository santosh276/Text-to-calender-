from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir="/tmp/playwright_user_data_fix2",
        viewport={'width': 375, 'height': 812}
    )

    page = context.new_page()
    page.goto("http://localhost:0/ai tex to calnder.html") # We'll start a server in bash first
