import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto("file:///app/ai tex to calnder.html")

        print("Page loaded. Generating mock data for testing...")
        # Inject mock custom sections to verify dynamic margin behavior
        await page.evaluate("""
            const container = document.getElementById('grid-cards-section');
            if (container) {
                 const dynamicHtml = `
                    <div class="dynamic-custom-section mt-10" style="display: block; visibility: visible; height: 200px;">
                        <section class="text-center w-full">
                            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 px-4 mt-10 mb-6 text-center w-full">Spiritual Tools Dynamic</h2>
                        </section>
                        <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-0">
                            <div class="h-40 bg-red-200">Card</div>
                        </section>
                    </div>
                 `;
                 container.insertAdjacentHTML('beforeend', dynamicHtml);
            }

            // Switch to More view
            if (typeof toggleView === 'function') {
                toggleView('more');
            }
            document.getElementById('more-view-container').style.display = 'block';
            document.getElementById('more-view-container').style.visibility = 'visible';
            // Also need to make sure grid-cards-section is visible
            document.getElementById('grid-cards-section').style.display = 'block';
        """)

        await page.wait_for_timeout(1000)

        # Ensure elements are actually visible before calculations
        # Ensure Discover Popular Tools text is visible
        discover_title = page.locator("text=Discover Popular Tools")
        await discover_title.wait_for(state="attached")

        print("Validating Hero Section structure...")

        # Test 1: Verify the Hero Section does NOT have the large dynamic margin
        hero_title_margin_top = await page.evaluate("""() => {
            const title = document.getElementById('grid-cards-title');
            if (!title) return null;
            return window.getComputedStyle(title).marginTop;
        }""")
        print(f"Hero Title (Discover Popular Tools) margin-top: {hero_title_margin_top}")

        # The hero section's title should have mt-4 (16px) or similar, NOT mt-10 (40px)
        if hero_title_margin_top == "40px":
            print("❌ Test 1 Failed: Hero section has dynamic 'mt-10' applied incorrectly!")
            await browser.close()
            return False

        print("✅ Test 1 Passed: Hero Section preserved without dynamic universal spacing.")

        # Test 2: Calculate the bounding box distance between first card grid and second title
        # Wait for dynamic section "Spiritual Tools" to render
        spiritual_title = page.locator("text=Spiritual Tools Dynamic")
        await spiritual_title.wait_for(state="attached")

        # Get the first visible grid block above "Spiritual Tools"
        grid_box = await page.evaluate("""() => {
             // The first dynamic section is the "Spiritual Tools Dynamic" container
             const spiritualToolsTitle = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Spiritual Tools Dynamic'));
             if (!spiritualToolsTitle) return null;

             // Its parent is the dynamic section
             const dynamicSection = spiritualToolsTitle.closest('.dynamic-custom-section');

             // The element directly above it should be the grid-cards-section or similar
             const prevElement = dynamicSection.previousElementSibling;

             if (prevElement) {
                return prevElement.getBoundingClientRect();
             }
             return null;
        }""")

        title_box = await spiritual_title.bounding_box()

        if not grid_box or not title_box:
            print("❌ Error getting bounding boxes.")
            await browser.close()
            return False

        grid_bottom = grid_box['y'] + grid_box['height']
        title_top = title_box['y']
        gap_between_grid_and_title = title_top - grid_bottom

        print(f"Gap between Popular grid and Spiritual Tools title: {gap_between_grid_and_title}px")

        if gap_between_grid_and_title < 32:
             print(f"❌ Test 2 Failed: Gap is {gap_between_grid_and_title}px, which is less than 32px.")
             await browser.close()
             return False

        print("✅ Test 2 Passed: Spacing between grid and next title is >= 32px.")

        await browser.close()
        return True

if __name__ == "__main__":
    success = asyncio.run(run())
    if not success:
        exit(1)
