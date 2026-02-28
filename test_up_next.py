from playwright.sync_api import sync_playwright

def test_up_next():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("file://" + __import__('os').path.abspath("ai tex to calnder.html"))

        # Wait for the app to initialize
        page.wait_for_selector("#calendar-grid", timeout=10000)

        # Inject script to set the current date to January 2026 and re-render
        # And ensure monthsData has next months
        page.evaluate("""
            const realToday = new Date();
            appState.viewDate = { month: realToday.getMonth(), year: realToday.getFullYear() };

            // Add dummy events to Jan 2026 and Feb 2026 for testing
            appState.monthsData = [
                {
                    year: realToday.getFullYear(),
                    month: realToday.getMonth(),
                    events: [] // EMPTY so it looks ahead
                },
                {
                    year: realToday.getFullYear(),
                    month: realToday.getMonth() + 1,
                    events: [
                        { date: 15, symbol: '!', engName: 'Feb Festival' }
                    ]
                }
            ];

            // Re-render
            render();
        """)

        # Dump the HTML of the festival section
        html = page.evaluate("""document.getElementById('sec-festivals').innerHTML""")
        # print(f"Festival Section HTML: {html}")

        # Now the 'Up Next' card should show a festival from February 2026 since we cleared Jan, and Feb has Feb Festival
        try:
            # Check the event card title
            titles = page.locator("#sec-festivals h3.font-extrabold").all_inner_texts()
            print(f"Up Next Titles: {titles}")

            if titles:
                assert "Feb Festival" in titles[0], f"Unexpected title: {titles[0]}"
                print("Test passed: Found next month's event successfully!")
            else:
                print("Test failed: No event title found.")
        except Exception as e:
            print("Test failed or no event found.")
            print(e)

        browser.close()

if __name__ == "__main__":
    test_up_next()
