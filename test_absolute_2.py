from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        page = context.new_page()

        with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Target replacements

        # 1. Modify the container to make it relative so the close button can be absolutely positioned
        content = content.replace(
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border"',
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative"'
        )

        # 2. Add some right padding to the container itself so text doesn't hit the close button
        content = content.replace(
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">',
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 pr-10 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">'
        )

        # 3. Modify the close button to be absolutely positioned
        old_close = '<button onclick="hideLocationPrompt()" class="shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent; margin-left: -4px;">'
        new_close = '<button onclick="hideLocationPrompt()" class="absolute top-1/2 right-2 transform -translate-y-1/2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">'
        content = content.replace(old_close, new_close)

        # 4. Widen it slightly
        content = content.replace(
            'w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[450px]" style="display: none;">',
            'w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] max-w-[480px]" style="display: none;">'
        )

        with open('/app/test_modified_2.html', 'w', encoding='utf-8') as f:
            f.write(content)

        page.goto('file:///app/test_modified_2.html')
        page.evaluate('''
            localStorage.setItem("panchang_cached_state", JSON.stringify({"config": {"location": {"lat": null, "lng": null, "name": ""}}}));
        ''')
        page.reload()

        page.wait_for_selector('#location-prompt-toast', state='visible', timeout=5000)
        page.evaluate('''
            const prompt = document.getElementById("location-prompt-toast");
            prompt.style.display = "block";
            prompt.style.opacity = "1";
            prompt.style.transform = "none";
        ''')

        element = page.locator('#location-prompt-toast')
        element.screenshot(path='/app/toast_after_abs_3.png')
        browser.close()

if __name__ == '__main__':
    run()
