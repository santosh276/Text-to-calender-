import re
from playwright.sync_api import sync_playwright

def test_solid_cards():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Inject mock localStorage before any script runs
        page.add_init_script("""
            window.localStorage.setItem('panchangConfig', JSON.stringify({
                location: { lat: 28.6139, lng: 77.2090, name: 'Delhi' }
            }));
        """)

        page.goto("file:///app/ai%20tex%20to%20calnder.html")

        # In this app, sometimes we need to open the Panchang view or month view first
        page.wait_for_selector("#panchang-list", timeout=10000)

        # Force a render cycle and explicitly switch to month view if needed
        page.evaluate("""() => {
            if (typeof render === 'function') {
                render();
            } else if (window.editor) {
                window.editor.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }""")

        # Debug: Check if the timeline exists
        html_content = page.locator("#panchang-list").inner_html()
        if "bg-amber-400" not in html_content:
            print("Panchang list HTML:", html_content)

        timeline_div = page.locator("#panchang-list .grid.grid-cols-1").first
        timeline_div.wait_for(state="visible", timeout=10000)

        # Grab the cards
        cards = timeline_div.locator("> .rounded-2xl.overflow-hidden.flex.w-full")

        assert cards.count() == 2, f"Expected 2 cards, found {cards.count()}"

        # Test Solar Card
        solar_card = cards.nth(0)
        solar_left = solar_card.locator("> div").nth(0)
        solar_right = solar_card.locator("> div").nth(1)

        solar_left_class = solar_left.get_attribute("class")
        solar_right_class = solar_right.get_attribute("class")

        assert "bg-amber-400" in solar_left_class, f"Expected bg-amber-400 in {solar_left_class}"
        assert "bg-orange-500" in solar_right_class, f"Expected bg-orange-500 in {solar_right_class}"
        assert "text-black" in solar_left_class, f"Expected text-black in {solar_left_class}"
        assert "text-white" in solar_right_class, f"Expected text-white in {solar_right_class}"

        # Test Lunar Card
        lunar_card = cards.nth(1)
        lunar_left = lunar_card.locator("> div").nth(0)
        lunar_right = lunar_card.locator("> div").nth(1)

        lunar_left_class = lunar_left.get_attribute("class")
        lunar_right_class = lunar_right.get_attribute("class")

        assert "bg-indigo-900" in lunar_left_class, f"Expected bg-indigo-900 in {lunar_left_class}"
        assert "bg-blue-600" in lunar_right_class, f"Expected bg-blue-600 in {lunar_right_class}"
        assert "text-white" in lunar_left_class, f"Expected text-white in {lunar_left_class}"
        assert "text-white" in lunar_right_class, f"Expected text-white in {lunar_right_class}"

        # Verify no blur classes are used in the cards
        for card_idx in range(2):
            card_class = cards.nth(card_idx).get_attribute("class")
            assert "blur" not in card_class, f"Card should not contain blur: {card_class}"
            assert "opacity" not in card_class, f"Card should not contain opacity on outer container: {card_class}"

        print("Pixel-perfect solid split Solar and Lunar cards verified")

        page.screenshot(path="solid_cards_verified.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    test_solid_cards()
