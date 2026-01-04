from playwright.sync_api import sync_playwright

def verify_festival_search():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the file
        page.goto('http://localhost:8080/ai tex to calnder.html')

        # Wait for festivals section to load
        page.wait_for_selector('#sec-festivals')

        # Focus on search input to check styles (focus ring, icon color)
        search_input = page.locator('#festival-search')
        search_input.focus()

        # Type a query to check "Clear" button appearance
        search_input.fill('Sankranti')

        # Wait for highlighting
        page.wait_for_selector('.search-highlight')

        # Take screenshot of the festival section
        festival_section = page.locator('#sec-festivals')
        festival_section.screenshot(path='verification/festival_search.png')

        # Clear search and verify empty state or clear button behavior
        page.locator('#search-clear').click()

        # Type non-existent query to check empty state
        search_input.fill('NonExistentFestival123')

        # Wait for empty state
        page.wait_for_selector('.fa-calendar-xmark')

        # Take screenshot of empty state
        festival_section.screenshot(path='verification/festival_search_empty.png')

        browser.close()

if __name__ == "__main__":
    verify_festival_search()
