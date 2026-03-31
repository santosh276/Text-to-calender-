from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{os.path.abspath('ai tex to calnder.html')}")

    # The toggle uses a span in the UI, or we can just click the input directly via evaluate
    page.evaluate("window.toggleAppMode('sadhana')")
    page.wait_for_selector('#sadhana-ecosystem-wrapper:visible')

    # Mala counter
    initial_mala = page.locator('#mala-count-text').inner_text()
    print(f"Initial mala count: {initial_mala}")
    page.locator('button:has(#mala-count-text)').click()
    new_mala = page.locator('#mala-count-text').inner_text()
    print(f"New mala count: {new_mala}")
    assert initial_mala != new_mala, "Mala counter didn't increment"

    # Reading mode
    initial_reading = page.locator('#reading-sanskrit').inner_text()
    print(f"Initial reading: {initial_reading}")
    page.locator('text="Next Verse"').click()
    new_reading = page.locator('#reading-sanskrit').inner_text()
    print(f"New reading: {new_reading}")
    assert initial_reading != new_reading, "Reading mode didn't advance verse"

    # Quiz mode
    initial_quiz = page.locator('#quiz-question-text').inner_text()
    print(f"Initial quiz state: {initial_quiz}")
    page.locator('button:has-text("Play Now")').click()
    new_quiz = page.locator('#quiz-question-text').inner_text()
    print(f"New quiz state: {new_quiz}")
    assert initial_quiz != new_quiz, "Quiz didn't start"

    print("Tests passed!")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
