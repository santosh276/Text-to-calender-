from playwright.sync_api import sync_playwright

def verify_app_mode():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile Viewport
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        # Load the page
        page.goto("http://localhost:8080/ai%20tex%20to%20calnder.html")

        # Wait for initialization
        page.wait_for_timeout(1000)

        # SIMULATE APP MODE (Equivalent to downloadCalendar logic)
        page.evaluate("""
            () => {
                // Remove Editor Components
                const panel = document.getElementById('editor-panel');
                if(panel) panel.remove();

                const nav = document.querySelector('nav');
                if(nav) nav.remove();

                const btn = document.getElementById('download-btn');
                if(btn) btn.remove();

                // Adjust Body
                document.body.classList.remove('h-screen', 'overflow-hidden');
                document.body.classList.add('min-h-screen', 'overflow-hidden');

                // Adjust Preview Container
                const preview = document.getElementById('preview-container');
                preview.classList.remove('md:w-[65%]', 'p-2', 'md:p-8');
                preview.classList.add('w-full', 'h-full', 'p-0');
                preview.style.overflow = 'hidden';

                // Adjust Main Wrapper
                const wrapper = document.querySelector('.flex.flex-col.md\\\\:flex-row');
                wrapper.classList.remove('h-full', 'overflow-hidden');
                wrapper.classList.add('h-screen', 'w-full');
            }
        """)

        # Wait for layout to settle
        page.wait_for_timeout(1000)

        # Take Screenshot
        page.screenshot(path="verification/app_mode_theme.png")

        browser.close()

if __name__ == "__main__":
    verify_app_mode()
