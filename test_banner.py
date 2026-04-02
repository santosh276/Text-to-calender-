from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 400, 'height': 800})
    page.goto(f"file://{os.path.abspath('ai tex to calnder.html')}")

    html_to_inject = """
    <div id="hero-festival-banner" class="relative rounded-2xl overflow-hidden shadow-lg mb-6 cursor-pointer transform transition-transform active:scale-[0.98]" style="height: 10rem; min-height: 160px; background-image: url('https://raw.githubusercontent.com/manasc12/Odia-Vaidik-Calendar-1/main/Images/chaitra-purnima.jpg'); background-size: cover; background-position: center;">
      <!-- Overlay -->
      <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%);"></div>

      <!-- Content -->
      <div class="absolute inset-0 p-4 flex flex-col justify-between z-10">
        <!-- Top row: Label -->
        <div class="flex items-center space-x-2">
          <div class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
          <span class="font-bold text-white tracking-wider uppercase" style="font-size: 0.55rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">Next Upcoming Festival</span>
        </div>

        <!-- Middle: Title -->
        <div>
          <h1 class="text-2xl font-extrabold text-white leading-tight line-clamp-2" style="text-shadow: 0 2px 6px rgb(0 0 0 / 100%);">Chaitra Purnima</h1>
          <p class="text-white text-xs font-medium mt-1" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">April 3, 2026</p>
        </div>

        <!-- Bottom: Timer -->
        <div class="flex space-x-2 mt-2">
          <div class="bg-black/60 rounded-lg p-2 backdrop-blur-sm border border-white/20 min-w-[3.5rem] flex flex-col items-center justify-center">
            <span class="text-white font-bold text-lg leading-none">0</span>
            <span class="text-gray-300 text-[0.5rem] uppercase font-bold mt-1">Days</span>
          </div>
          <div class="bg-black/60 rounded-lg p-2 backdrop-blur-sm border border-white/20 min-w-[3.5rem] flex flex-col items-center justify-center">
            <span class="text-white font-bold text-lg leading-none">0</span>
            <span class="text-gray-300 text-[0.5rem] uppercase font-bold mt-1">Hours</span>
          </div>
          <div class="bg-black/60 rounded-lg p-2 backdrop-blur-sm border border-white/20 min-w-[3.5rem] flex flex-col items-center justify-center">
            <span class="text-white font-bold text-lg leading-none">0</span>
            <span class="text-gray-300 text-[0.5rem] uppercase font-bold mt-1">Mins</span>
          </div>
        </div>
      </div>
    </div>
    """
    page.evaluate(f"document.body.innerHTML = `{html_to_inject}`")

    # Take screenshot of the banner
    banner = page.locator("#hero-festival-banner")
    banner.screenshot(path="screenshot_final.png")

    browser.close()
