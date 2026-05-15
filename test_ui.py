from playwright.sync_api import sync_playwright
import os

def test_ritu_description_card():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        filepath = os.path.abspath('ai tex to calnder.html').replace(" ", "%20")
        page.goto(f'file://{filepath}')

        # Ensure we are in a mobile/small viewport or toggle to the calendar/home view where Ritu card is visible
        # First we might need to populate some mock state to show Ritu card
        # Or just checking if the template string is in the JS is sufficient for static checking,
        # but let's try to see if it renders if we set some mock data.

        page.evaluate("""
        window.appState = {
            config: { language: 'en' },
            details: {},
            recurringDetails: {}
        };
        const mockData = {
            month: 1,
            year: 2026,
            events: []
        };
        // It might need more to fully render, let's see what happens if we call render
        """)

        try:
            page.evaluate("render()")
        except:
            pass

        # Check if the Ritu content card is rendered with the new inline styles
        # Let's see what the innerHTML of ritu-content contains after rendering

        # if ritu is not rendered, we can test using regex on the source content

        browser.close()

test_ritu_description_card()
