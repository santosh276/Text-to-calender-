from playwright.sync_api import sync_playwright

def verify_tithi_icons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Serve the file locally or open it directly
        page.goto('file:///app/ai tex to calnder.html')

        # Check for SVG elements within grid cells
        # We need to find cells that have Tithi icons.
        # Purnima (15th/30th depending on calculation)

        # We will screenshot the calendar grid.
        grid = page.locator('#calendar-grid')
        grid.screenshot(path='verification/calendar_grid_svgs.png')

        # Verify presence of specific SVGs in the grid
        # Purnima has amber color circle
        purnima_svg = grid.locator('svg.text-amber-400')
        if purnima_svg.count() > 0:
            print('Purnima SVG Found')
        else:
            print('Purnima SVG NOT Found')

        # Amavasya has black color circle
        amavasya_svg = grid.locator('svg.text-black')
        if amavasya_svg.count() > 0:
            print('Amavasya SVG Found')
        else:
            print('Amavasya SVG NOT Found')

        # Ekadashi has indigo moon
        ekadashi_svg = grid.locator('svg.text-indigo-400')
        if ekadashi_svg.count() > 0:
            print('Ekadashi SVG Found')
        else:
            print('Ekadashi SVG NOT Found')

        browser.close()

if __name__ == '__main__':
    verify_tithi_icons()
