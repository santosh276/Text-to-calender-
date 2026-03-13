from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 375, "height": 812})

    with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    search_str = """<div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[450px]" style="display: none;">
        <div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8);">
            <div class="rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: #ffedd5; width: 40px; height: 40px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0 pr-1">
                <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>
            </div>
            <button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3);">
                Set Now
            </button>
            <button onclick="hideLocationPrompt()" class="shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent; margin-left: -4px;">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
    </div>"""

    replace_str = """<div id="location-prompt-toast" class="fixed bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 opacity-0 translate-y-10 pointer-events-none w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[480px]" style="display: none;">
        <div class="bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border relative" style="box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-color: rgba(255, 237, 213, 0.8); padding-right: 40px;">
            <div class="rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: #ffedd5; width: 40px; height: 40px;">
                <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-600 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0 pr-1">
                <p class="text-[14px] sm:text-[15px] text-gray-800 font-semibold m-0 leading-snug">Set your location to unlock your full experience.</p>
            </div>
            <button onclick="openLocationModal(); hideLocationPrompt();" class="shrink-0 text-white font-bold px-4 rounded-full transition-all cursor-pointer border-0 flex items-center justify-center" style="background: linear-gradient(to right, #f97316, #ea580c); font-size: 13px; height: 36px; line-height: normal; box-shadow: 0 2px 5px rgba(249,115,22,0.3);">
                Set Now
            </button>
            <button onclick="hideLocationPrompt()" class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer border-0 transition-colors" style="width: 32px; height: 32px; background: transparent;">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
    </div>"""

    html_content = html_content.replace(search_str, replace_str)

    # Ensure it is displayed
    html_content = html_content.replace('display: none;', 'display: block !important;')
    html_content = html_content.replace('opacity-0 translate-y-10 pointer-events-none', 'opacity-100 translate-y-0')

    file_url = f"file://{os.path.abspath('ai tex to calnder.html')}"
    page.route("**/*", lambda route: route.continue_())
    page.set_content(html_content)

    page.wait_for_timeout(1000)
    page.screenshot(path='full_22.png', full_page=True)
    browser.close()
