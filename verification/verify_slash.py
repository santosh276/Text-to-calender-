from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        filepath = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{filepath}")

        # Set input with Slash syntax
        input_text = """
::: calendar
++ January 2025 ++
23 ! Event A / Event B [LocA / LocB]
:::
"""
        page.evaluate(f"document.getElementById('editor').value = `{input_text}`")
        page.evaluate("document.getElementById('editor').dispatchEvent(new Event('input'))")

        # Check global state for events
        events = page.evaluate("appState.monthsData[0].events")
        print(f"Events count: {len(events)}")
        for i, ev in enumerate(events):
            print(f"Event {i}: {ev['engName']} ({ev['locName']})")

        # Open Modal
        # We need to find the cell for 23rd
        # The grid is rendered. We can just call openDayModal(23, appState.monthsData[0])
        page.evaluate("openDayModal(23, appState.monthsData[0])")

        # Check Modal Slides
        # We expect 2 slides.
        # But wait, my code generates slides based on 'details' OR 'events' if no details.
        # Here we have NO details block. So it should map events to slides.

        # Check nav buttons
        nav_exists = page.evaluate("!!document.querySelector('#modal-nav-container button')")
        print(f"Nav buttons exist: {nav_exists}")

        # Check title of first slide
        title = page.inner_text("#modal-main-title")
        print(f"Slide 1 Title: {title}")

        if nav_exists:
            page.click("#modal-nav-container button:last-child") # Next
            title2 = page.inner_text("#modal-main-title")
            print(f"Slide 2 Title: {title2}")

        browser.close()

if __name__ == "__main__":
    run()
