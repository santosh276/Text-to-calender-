from playwright.sync_api import sync_playwright
import os

def verify_timings_adjustment():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport to match user screenshots and test mobile-specific layout
        context = browser.new_context(viewport={'width': 450, 'height': 800})
        page = context.new_page()

        # Load the local HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for the app to initialize (DOMContentLoade)
        page.wait_for_load_state("domcontentloaded")
        page.wait_for_timeout(2000)

        # Force render timing section for visualization
        page.evaluate("""
            () => {
                const sec = document.getElementById('sec-timings');
                if (sec) {
                    sec.classList.remove('hidden');
                    sec.style.display = 'block';
                    // Inject dummy content if empty to verify layout
                    if (!sec.innerHTML.trim() || sec.innerHTML.includes('No timings available')) {
                        sec.innerHTML = `
                            <div class="timeline-card bg-red-gradient">
                                <div class="relative w-full h-full overflow-hidden rounded-[20px]">
                                    <div class="card-content relative pt-6">
                                        <div class="card-text-area mt-1">
                                            <h2 class="card-title">Test Timing</h2>
                                            <p class="card-desc">Description here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }
            }
        """)

        screenshot_path = "verification/timings_section_adjusted_pt6.png"
        page.locator("#sec-timings").screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_timings_adjustment()
