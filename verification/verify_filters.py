from playwright.sync_api import sync_playwright, expect
import time

def verify_filters():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))

        try:
            print("Navigating...")
            page.goto("http://localhost:8000/ai%20tex%20to%20calnder.html", timeout=10000)
            print("Page loaded.")

            # Wait for main container
            page.locator(".app-container").wait_for(timeout=10000)
            print("App container found.")

            # Check if editor exists (it should)
            if page.locator("#editor").count() > 0:
                print("Editor found.")
            else:
                print("Editor NOT found.")

            # Wait for festival section
            # The section might be hidden if toggle is off?
            # Default is on.

            print("Checking festival section visibility...")
            sec = page.locator("#sec-festivals")
            if sec.count() > 0:
                print("Festival section exists.")
                # Check display style
                visible = sec.is_visible()
                print(f"Festival section visible: {visible}")
            else:
                print("Festival section NOT found in DOM.")

            # The renderFestivals function clears innerHTML of sec-festivals.
            # Then it appends stuff.
            # If the script errors out before reaching renderFestivals, we might see empty or initial state.

            # Check if there are any errors in console (already handled by listener)

            # Try to force render by changing month?
            # Or just wait a bit longer.
            time.sleep(2)

            page.screenshot(path="verification/debug_full.png")

            # Look for ANY button in that section
            btns = sec.locator("button")
            print(f"Buttons in festival section: {btns.count()}")

            if btns.count() > 0:
                print("Found buttons, proceeding...")

                fest_btn = btns.filter(has_text="Festivals").first
                if fest_btn.count() > 0:
                    fest_btn.click()
                    time.sleep(0.5)
                    page.screenshot(path="verification/filters_active.png")
                    print("Clicked Festivals.")

                    # Verify
                    classes = fest_btn.get_attribute("class")
                    print(f"Classes: {classes}")

                    fest_btn.click()
                    time.sleep(0.5)
                    page.screenshot(path="verification/filters_reset.png")
                    print("Clicked Reset.")
                else:
                    print("Festivals button not found.")
            else:
                print("No buttons found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_filters()
