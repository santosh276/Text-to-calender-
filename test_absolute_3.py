from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport
        context = browser.new_context(viewport={'width': 360, 'height': 800})
        page = context.new_page()

        with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Let's change the layout completely to match the reference image closely

        toast_html = """
    <!-- Location Prompt Toast Popup -->
    <div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] max-w-[480px]" style="display: none;">
        <div class="bg-white rounded-[24px] border p-4 sm:p-5 flex items-center gap-3 sm:gap-4 w-full mx-auto box-border relative pr-10" style="box-shadow: 0 10px 40px rgba(0,0,0,0.15); border-color: rgba(255, 237, 213, 0.8);">

            <div class="rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: #ffedd5; width: 44px; height: 44px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-xl"></i>
            </div>

            <div class="flex-1 min-w-0 flex items-center justify-between gap-3">
                <p class="text-[15px] sm:text-[16px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>

                <button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-5 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center whitespace-nowrap" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 14px; height: 40px; line-height: normal; box-shadow: 0 4px 10px rgba(249,115,22,0.3);">
                    Set Now
                </button>
            </div>

            <button onclick="hideLocationPrompt()" class="absolute top-1/2 right-2 transform -translate-y-1/2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">
                <i class="fa-solid fa-xmark text-xl"></i>
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

        with open('/app/test_modified_3.html', 'w', encoding='utf-8') as f:
            f.write(content)

        page.goto('file:///app/test_modified_3.html')
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
        element.screenshot(path='/app/toast_after_abs_4.png')
        browser.close()

if __name__ == '__main__':
    run()
