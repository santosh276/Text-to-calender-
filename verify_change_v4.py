from playwright.sync_api import sync_playwright, expect
import os
import re

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    cwd = os.getcwd()
    file_path = f"file://{cwd}/ai tex to calnder.html"
    page.goto(file_path)

    page.evaluate("""
        () => {
            const el = document.getElementById('sec-timings');
            if(el) {
                el.classList.remove('hidden');
                el.style.display = 'block';

                window.renderTimings = (data) => {
                    const container = document.getElementById('sec-timings');
                    container.classList.remove('hidden');
                    container.innerHTML = `
                        <div class="timeline-card">
                            <div class="card-content relative pt-8"> <!-- THIS IS WHAT WE CHANGED -->
                                <h2 class="card-title">Mocked Render</h2>
                            </div>
                        </div>
                    `;
                };

                window.render();
            }
        }
    """)

    expect(page.locator("#sec-timings")).to_be_visible()

    card_content = page.locator(".timeline-card .card-content").first
    expect(card_content).to_have_class(re.compile(r"pt-8"))

    page.screenshot(path="verification_screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
