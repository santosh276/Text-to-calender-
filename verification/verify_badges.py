from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Load the local HTML file
    file_path = os.path.abspath("ai tex to calnder.html")
    page.goto(f"file://{file_path}")

    # Wait for the app to initialize
    page.wait_for_timeout(1000)

    # Inject script to force open modal with Kshaya Ekadashi condition
    # Kshaya: curr=11 (Dwadashi), prev=9 (Dashami)
    script = """
    const originalCalc = calculateTithi;
    calculateTithi = function(date) {
        // Mock for specific test date: Year 2025, Month 0, Day 15
        if (date.getDate() === 15) return { index: 11, tithi: 'Dwadashi', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        if (date.getDate() === 14) return { index: 9, tithi: 'Dashami', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        if (date.getDate() === 16) return { index: 12, tithi: 'Trayodashi', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        return { index: 0, tithi: 'Test', paksha: 'Test', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
    };

    // Open modal for Day 15
    openDayModal(15, { month: 0, year: 2025, events: [] });
    """

    page.evaluate(script)

    # Wait for modal to appear
    page.wait_for_selector("#day-modal:not(.modal-hidden)")
    page.wait_for_timeout(500) # Wait for animation

    # Take screenshot
    page.screenshot(path="verification/verification_kshaya.png")

    # Close modal
    page.evaluate("closeDayModal()")
    page.wait_for_timeout(500)

    # Now Double Ekadashi
    # Double: curr=10, prev=10
    script_double = """
    calculateTithi = function(date) {
        if (date.getDate() === 20) return { index: 10, tithi: 'Ekadashi', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        if (date.getDate() === 19) return { index: 10, tithi: 'Ekadashi', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        if (date.getDate() === 21) return { index: 11, tithi: 'Dwadashi', paksha: 'Shukla', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
        return { index: 0, tithi: 'Test', paksha: 'Test', nakshatra: 'Test', yoga: 'Test', karana: 'Test' };
    };

    openDayModal(20, { month: 0, year: 2025, events: [] });
    """

    page.evaluate(script_double)
    page.wait_for_selector("#day-modal:not(.modal-hidden)")
    page.wait_for_timeout(500)

    page.screenshot(path="verification/verification_double.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
