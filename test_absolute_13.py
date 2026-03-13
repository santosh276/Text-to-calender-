from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Maybe 360px viewport is why we see wrapping. Let's force it to standard mobile.
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Try relative padding + width changes
        # Max width 480 is fine, it's just padding-right inside the inner div that needs to avoid overlap with absolute
        # but the absolute positioning needs to be applied correctly.
        # The user's image shows a squished horizontal view.

        toast_html = """
    <!-- Location Prompt Toast Popup -->
    <div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[480px]" style="display: none;">
        <div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">
            <div class="rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: #ffedd5; width: 40px; height: 40px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0 pr-1">
                <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>
            </div>
            <button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center mr-6 sm:mr-8" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3);">
                Set Now
            </button>
            <button onclick="hideLocationPrompt()" class="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
    </div>
"""

        import re
        content = re.sub(
            r'<!-- Location Prompt Toast Popup -->.*?(?=<!-- Location Modal -->)',
            toast_html + '\n    ',
            content,
            flags=re.DOTALL
        )

        with open('/app/test_modified_13.html', 'w', encoding='utf-8') as f:
            f.write(content)

        page.goto('file:///app/test_modified_13.html')
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

        # let's just screenshot the area
        element = page.locator('#location-prompt-toast')
        element.screenshot(path='/app/toast_container_13.png')
        browser.close()

if __name__ == '__main__':
    run()
