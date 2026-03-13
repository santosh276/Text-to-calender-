from playwright.sync_api import sync_playwright
def test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 667})
        page.goto('file:///app/ai%20tex%20to%20calnder.html')
        page.evaluate("""
            document.getElementById('location-modal').style.display = 'flex';
            document.getElementById('location-modal').classList.remove('modal-hidden');
            document.getElementById('location-prompt-toast').style.display = 'none';
        """)
        page.screenshot(path='modal.png')
        browser.close()
test()
