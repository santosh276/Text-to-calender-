from playwright.sync_api import sync_playwright
import os

def test_language_routing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        filepath = os.path.abspath('ai tex to calnder.html')
        file_url = f'file://{filepath}?lang=hindi'
        print(f"Navigating to {file_url}")

        page.goto(file_url)
        page.wait_for_timeout(1000)

        # Test 1: Check language state from URL parameter
        # Since appState might not be globally exposed or config might not be initialized properly,
        # let's try to check the dropdown first and state if possible
        state_lang = page.evaluate("window.appState && window.appState.config ? window.appState.config.language : null")
        dropdown_lang = page.evaluate("document.getElementById('language-select') ? document.getElementById('language-select').value : null")

        if state_lang == 'hi' and dropdown_lang == 'hi':
            print('✅ URL parameter parsing on load works correctly (hindi -> hi).')
        elif dropdown_lang == 'hi':
            print('✅ URL parameter parsing on load works correctly (hindi -> hi), observed from dropdown.')
        else:
            print(f'❌ URL parameter parsing failed. Expected: hi, state: {state_lang}, dropdown: {dropdown_lang}')

        # Test 2: Check URL updates on language change
        page.evaluate("window.changeLanguage('or')")
        page.wait_for_timeout(500)

        current_url = page.evaluate("window.location.href")
        if 'lang=odia' in current_url:
            print('✅ changeLanguage updates the URL correctly (or -> odia).')
        else:
            print(f'❌ changeLanguage failed to update the URL correctly. Current URL: {current_url}')

        # Test 3: Test fallback for invalid URL parameter
        invalid_url = f'file://{filepath}?lang=invalid'
        page.goto(invalid_url)
        page.wait_for_timeout(1000)

        state_lang_fallback = page.evaluate("window.appState && window.appState.config ? window.appState.config.language : null")
        dropdown_lang_fallback = page.evaluate("document.getElementById('language-select') ? document.getElementById('language-select').value : null")

        if state_lang_fallback == 'en' or dropdown_lang_fallback == 'en':
            print('✅ Invalid URL parameter falls back correctly to default.')
        else:
            print(f'❌ Invalid URL parameter fallback failed. Expected: default (en or previously saved), state: {state_lang_fallback}')

        browser.close()

if __name__ == '__main__':
    test_language_routing()
