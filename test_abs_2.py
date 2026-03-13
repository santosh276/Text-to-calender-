from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        page = context.new_page()

        with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Modify the HTML to test absolute positioning of the close button
        content = content.replace(
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border"',
            '<div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative"'
        )

        old_button = '<button onclick="hideLocationPrompt()" class="shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent; margin-left: -4px;">'
        new_button = '<button onclick="hideLocationPrompt()" class="absolute top-1 right-1 sm:top-2 sm:right-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent; line-height: normal;">'
        content = content.replace(old_button, new_button)

        with open('/app/test_modified.html', 'w', encoding='utf-8') as f:
            f.write(content)

        page.goto('file:///app/test_modified.html')
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
        element.screenshot(path='/app/toast_after_abs_2.png')
        browser.close()

if __name__ == '__main__':
    run()