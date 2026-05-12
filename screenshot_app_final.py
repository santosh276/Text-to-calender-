from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    url = "file://" + os.path.abspath("ai tex to calnder.html").replace(" ", "%20")

    page.goto(url)

    # Mock Geolocation manually in localStorage so SunCalc can calculate astro times!
    page.evaluate('''() => {
        const config = {
            location: { lat: 28.6139, lng: 77.2090, name: "New Delhi" }
        };
        localStorage.setItem("panchangConfig", JSON.stringify(config));

        // Ensure Editor text causes a render
        const editor = document.getElementById('editor');
        if (editor) {
            editor.value = "::: config\\n@ Title : My Calendar\\n::: calendar\\n++ January 2026 ++\\n01 * New Year\\n";
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Hide editor and adjust view for mobile preview
        const editorPanel = document.getElementById('editor-panel');
        if (editorPanel) {
            editorPanel.style.display = 'none';
        }
        const previewContainer = document.getElementById('preview-container');
        if (previewContainer) {
            previewContainer.classList.remove('md:w-[65%]');
            previewContainer.style.width = '100%';
        }

        // Force rendering again if render exists globally
        if (window.render) { window.render(); }
    }''')

    page.wait_for_timeout(2000) # Give it a second to render

    # Scroll down to Panchang / Astro Timeline modern cards
    page.evaluate('''() => {
        const panchangList = document.getElementById('panchang-list');
        if (panchangList) {
            panchangList.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }''')

    page.wait_for_timeout(1000)

    page.screenshot(path="final_verification.png", full_page=True)
    browser.close()
