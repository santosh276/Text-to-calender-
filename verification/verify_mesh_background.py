from playwright.sync_api import sync_playwright
import os
import time

def verify_background():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the HTML file
        file_path = os.path.abspath("ai tex to calnder.html")
        page.goto(f"file://{file_path}")

        # Wait for animation to start (just a bit)
        time.sleep(2)

        # Take a screenshot
        screenshot_path = "verification/mesh_background_v2.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        # Verify CSS computed styles for body::before
        # Note: Accessing pseudo-elements in Playwright requires some JS evaluation
        before_style = page.evaluate("""() => {
            const body = document.querySelector('body');
            const style = window.getComputedStyle(body, '::before');
            return {
                content: style.content,
                position: style.position,
                zIndex: style.zIndex,
                backgroundImage: style.backgroundImage,
                animationName: style.animationName
            };
        }""")

        print("Computed Styles for body::before:")
        print(before_style)

        # Simple assertions
        if before_style['position'] == 'fixed':
            print("PASS: Position is fixed")
        else:
            print(f"FAIL: Position is {before_style['position']}")

        if before_style['zIndex'] == '-1':
            print("PASS: z-index is -1")
        else:
            print(f"FAIL: z-index is {before_style['zIndex']}")

        if "mesh-drift" in before_style['animationName']:
             print("PASS: Animation 'mesh-drift' is applied")
        else:
             print(f"FAIL: Animation is {before_style['animationName']}")

        browser.close()

if __name__ == "__main__":
    verify_background()
