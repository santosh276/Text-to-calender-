from playwright.sync_api import sync_playwright
import os

def verify_recurring():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Inject the test content into the editor
        with open("verification/test_recurring_input.txt", "r") as f:
            content = f.read()

        page.evaluate(f"""
            const editor = document.getElementById('editor');
            editor.value = `{content}`;
            parseInput(editor.value);
        """)

        # Verify Jan 2025 has recurring event
        # 26 Jan should have Republic Day
        # Check if 26th cell has * dot or similar, or just check if it renders in list?
        # The list items (grid-cell) are generated.
        # But we can check the appState via console or check rendered HTML.

        # Let's check appState first
        is_recurring_stored = page.evaluate("appState.recurringEvents.length > 0")
        print(f"Recurring events stored: {is_recurring_stored}")

        # Verify it appears in Jan 2025 (current view)
        # We need to find the cell for 26th
        # In grid, it should have a blue dot (for *)

        # Now navigate to next year (2026)
        # Click "Next Year" button
        # Wait, I added buttons to #year-view-title, but that's for YEAR VIEW mode.
        # Infinite navigation works in Month view too via changeMonth.
        # Let's use changeYear(1) or click next month 12 times.

        page.evaluate("changeYear(1)")

        # Now we are in Jan 2026.
        # The recurring event "Republic Day" should be present on Jan 26, 2026.

        events_2026 = page.evaluate("""
            (() => {
                const data = getEffectiveMonthData(2026, 0);
                return data.events;
            })()
        """)

        found = False
        for ev in events_2026:
            if ev['date'] == 26 and ev['engName'] == "Republic Day":
                found = True
                break

        print(f"Republic Day found in Jan 2026: {found}")

        if not found:
            raise Exception("Recurring event failed to appear in future year")

        browser.close()

if __name__ == "__main__":
    verify_recurring()
