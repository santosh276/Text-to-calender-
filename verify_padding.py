from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("file:///app/ai%20tex%20to%20calnder.html")

    state_wrapper = page.locator("#location-state-select + div")
    city_wrapper = page.locator("#location-city-select + div")

    state_select = page.locator("#location-state-select")
    city_select = page.locator("#location-city-select")

    state_classes = state_wrapper.get_attribute("class")
    city_classes = city_wrapper.get_attribute("class")

    state_select_classes = state_select.get_attribute("class")
    city_select_classes = city_select.get_attribute("class")

    assert "pr-5" in state_classes
    assert "pr-5" in city_classes

    assert "pr-14" in state_select_classes
    assert "pr-14" in city_select_classes

    assert "pr-3" not in state_classes
    assert "pr-3" not in city_classes
    assert "pr-10" not in state_select_classes
    assert "pr-10" not in city_select_classes

    print("Verification passed! The classes were successfully updated.")

    browser.close()
